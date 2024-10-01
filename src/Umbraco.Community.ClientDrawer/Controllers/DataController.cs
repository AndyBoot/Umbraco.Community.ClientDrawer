using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Microsoft.Extensions.Options;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Xml.Serialization;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Community.ClientDrawer.Enums;
using Umbraco.Community.ClientDrawer.Models;
using Umbraco.Extensions;
using static Umbraco.Community.ClientDrawer.Models.DataModel;

namespace Umbraco.Community.ClientDrawer.Controllers;

[PluginController("ClientDrawer")]
public class DataController : UmbracoAuthorizedJsonController
{
    private readonly AppSettingsModel _options;
    private readonly IWebHostEnvironment _env;
    private readonly AppCaches _appCaches;
    private const int CACHE_MINS = 1440; // 1 day
    private Uri _currentUri;
    private List<EnvironmentModel> _environmentModels;

    public DataController(IOptions<AppSettingsModel> options, IWebHostEnvironment env, AppCaches appCaches, IHttpContextAccessor httpContextAccessor)
    {
        _options = options.Value;
        _env = env;
        _appCaches = appCaches;

        _currentUri = new(httpContextAccessor.HttpContext?.Request.GetDisplayUrl() ?? throw new Exception("Unable to capture current request URL"));

        _environmentModels = _options.Environments?.Select(x => new EnvironmentModel(x.Name,
                                                                                   new Uri(x.BaseUrl),
                                                                                   _currentUri,
                                                                                   x.UmbracoPathOrUrl,
                                                                                   x.DisableUmbracoUrl,
                                                                                   x.AlternativeHostnames,
                                                                                   x.IconClass)).ToList()

                                                                                   ?? Enumerable.Empty<EnvironmentModel>().ToList();
    }

    public DataModel? GetData() => GetSetCacheItem(GetDataWorker, "ClientDrawerGetData", CACHE_MINS);

    public HeaderActionModel? GetHeaderActionData() => GetSetCacheItem(GetHeaderActionDataWorker, "ClientDrawerGetHeaderActionDataWorker", CACHE_MINS);

    private DataModel GetDataWorker()
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

    private HeaderActionModel GetHeaderActionDataWorker() => new()
    {
        ClientName = _options.ClientName,
        IconClass = _options.IconClass,
        IconImageFilePath = _options.IconImageFilePath,
        HeaderButtonMode = _options.HeaderButtonMode.ToString(),
        CurrentEnvironmentName = _environmentModels.FirstOrDefault(x => x.IsCurrent)?.Name ?? "Unknown Environment"
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

            if (!System.IO.File.Exists(xmlFilePath)) return null;

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

    private T? GetSetCacheItem<T>(Func<T> methodName, string cacheName, double expiryMins)
    {
        return _appCaches.RuntimeCache.GetCacheItem(cacheName, () =>
        {
            return methodName();
        }, TimeSpan.FromMinutes(expiryMins));
    }
}
