using Microsoft.AspNetCore.Hosting;
using ClientDrawer.Core.Models;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Xml.Serialization;
using static ClientDrawer.Core.Models.DataModel;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using ClientDrawer.Core.Enums;
using Umbraco.Extensions;
using Umbraco.Cms.Core.Cache;
using Microsoft.AspNetCore.Mvc;

namespace ClientDrawer.Core.Services
{
    public interface IClientDrawerService
    {
        DataModel GetDataWorker();
        HeaderActionModel GetHeaderActionDataWorker();
    }

    public class ClientDrawerService : IClientDrawerService
    {
        private readonly AppSettingsModel _options;
        private readonly IWebHostEnvironment _env;
        private Uri _currentUri;
        private List<EnvironmentModel> _environmentModels;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ClientDrawerService(IOptions<AppSettingsModel> options, IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            _options = options.Value;
            _env = env;
            _currentUri = new(httpContextAccessor.HttpContext?.Request.GetDisplayUrl() ?? throw new Exception("Unable to capture current request URL"));
            _environmentModels = _options.Environments?.Select(x => new EnvironmentModel(x.Name,
                                                                                       new Uri(x.BaseUrl),
                                                                                       _currentUri,
                                                                                       x.UmbracoPathOrUrl,
                                                                                       x.DisableUmbracoUrl,
                                                                                       x.AlternativeHostnames,
                                                                                       x.IconClass)).ToList()

                                                                                       ?? Enumerable.Empty<EnvironmentModel>().ToList();
            _webHostEnvironment = webHostEnvironment;
        }

        public DataModel GetDataWorker()
        {
            string heading = _options.ClientName;
            string platformAssemblyName = _options.Platform?.AssemblyName ?? "";
            string platformAssemblyVersion = GetAssemblyVersion(platformAssemblyName, _options.Platform?.VersionSource, _options.Platform?.VersionRegEx);
            ChangeLogXml? changeLog = GetChangeLog(_options.ChangeLog);

            DataModel dataModel = new()
            {
                Heading = heading,
                PrimaryAssembly = new AssemblyModel(platformAssemblyName, platformAssemblyVersion),
                Environments = _environmentModels,
                SystemInformation = new()
                {
                    Enabled = _options.SystemInformation.Enabled,
                    Assemblies = _options.SystemInformation.Assemblies
                        .Select(x => new AssemblyModel(x.AssemblyName ?? "", GetAssemblyVersion(x.AssemblyName ?? "", x.VersionSource, x.VersionRegEx)))
                        .ToArray()
                },
                ChangeLog = changeLog?.Entries?.OrderByDescending(x => x.Date).ToList() ?? Enumerable.Empty<ChangeLogXml.LogEntry>().ToList(),
            };
            return dataModel;
        }

        public HeaderActionModel GetHeaderActionDataWorker() => new()
        {
            ClientName = _options.ClientName,
            IconClass = _options.IconClass,
            IconImageFilePath = _options.IconImageFilePath,
            HeaderButtonMode = _options.HeaderButtonMode.ToString(),
            CurrentEnvironmentName = _environmentModels.FirstOrDefault(x => x.IsCurrent)?.Name ?? "Unknown Environment",
            IconSVG = ReadSvgFile(_options.IconImageFilePath)
        };

        private static string GetAssemblyVersion(string assemblyName, AssemblyVersionEnum? versionSource, string? versionRegEx = null)
        {
            try
            {
                if (string.IsNullOrEmpty(assemblyName)) return "";

                Assembly assembly = Assembly.Load(new AssemblyName(assemblyName));

                string? version = "";

                switch (versionSource)
                {
                    case AssemblyVersionEnum.InformationalVersion:
                        version = assembly.CustomAttributes.FirstOrDefault(x => x.AttributeType.Name.InvariantEquals(nameof(AssemblyInformationalVersionAttribute)))?.ConstructorArguments[0].Value?.ToString();
                        break;
                    case AssemblyVersionEnum.FileVersion:
                        version = assembly.CustomAttributes.FirstOrDefault(x => x.AttributeType.Name.InvariantEquals(nameof(AssemblyFileVersionAttribute)))?.ConstructorArguments[0].Value?.ToString();
                        break;
                    default:
                        version = assembly.GetName().Version?.ToString();
                        break;
                }

                if (version.IsNullOrWhiteSpace() == false && versionRegEx.IsNullOrWhiteSpace() == false)
                {
                    var match = Regex.Match(version, versionRegEx);
                    if (match.Success)
                    {
                        version = match.Value;
                    }
                }

                return version ?? "";
            }
            catch (Exception ex)
            {
                return $"Error loading assembly: {ex.Message}";
            }
        }

        private ChangeLogXml? GetChangeLog(AppSettingsModel.ChangeLogModel changeLogModel)
        {
            if (changeLogModel.AssemblyName.IsNullOrWhiteSpace())
            {
                var xmlFilePath = Path.Combine(_env.ContentRootPath, changeLogModel.FilePath);

                if (!File.Exists(xmlFilePath)) return null;

                XmlSerializer serializer = new(typeof(ChangeLogXml));

                using FileStream fs = new(xmlFilePath, FileMode.Open);

                return serializer.Deserialize(fs) as ChangeLogXml;
            }
            else
            {
                try
                {
                    var _assembly = Assembly.Load(changeLogModel.AssemblyName);
                    var resourceNames = _assembly.GetManifestResourceNames();

                    var resourceNameSuffix = changeLogModel.FilePath.Replace("/", ".").Replace(@"\", ".");

                    var resourceName = resourceNames.FirstOrDefault(r => r.InvariantEndsWith(resourceNameSuffix));

                    if (resourceName == null) return null;

                    using (Stream? stream = _assembly.GetManifestResourceStream(resourceName))
                    {
                        if (stream == null) return null;

                        XmlSerializer serializer = new(typeof(ChangeLogXml));
                        return serializer.Deserialize(stream) as ChangeLogXml;
                    }
                }
                catch
                {
                    return null;
                }
            }
        }

        private string ReadSvgFile(string? relativePath)
        {
            try
            {
                if (relativePath?.InvariantEndsWith(".svg") == false) return string.Empty;

                relativePath = relativePath!.Replace("/", @"\");
                if (relativePath.StartsWith('\\') == false) relativePath = string.Concat(@"\", relativePath);

                var absolutePath = string.Concat(_webHostEnvironment.WebRootPath, relativePath!); // Path.Combine didn't seem to work :(

                if (!File.Exists(absolutePath))
                {
                    return string.Empty;
                }

                var content = File.ReadAllText(absolutePath);

                return content;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}
