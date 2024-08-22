using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Options;
using System.Reflection;
using System.Xml.Serialization;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Controllers;
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

    public DataController(IOptions<AppSettingsModel> options, IWebHostEnvironment env, AppCaches appCaches)
    {
        _options = options.Value;
        _env = env;
        _appCaches = appCaches;
    }

    public DataModel? GetData() => GetSetCacheItem(GetDataWorker, "ClientDrawerGetData", CACHE_MINS);

    public HeaderActionModel? GetHeaderActionData() => GetSetCacheItem(GetHeaderActionDataWorker, "ClientDrawerGetHeaderActionDataWorker", CACHE_MINS);

    private DataModel GetDataWorker()
    {
        string heading = _options.ClientName;
        string platformAssemblyName = _options.Platform?.AssemblyName ?? "";
        string platformAssemblyVersion = GetAssemblyVersion(platformAssemblyName);
        Uri currentUri = new(HttpContext?.Request.GetDisplayUrl() ?? throw new Exception("Unable to capture current request URL"));
        ChangeLogXml? changeLog = GetChangeLog(_options.ChangeLog);

        DataModel dataModel = new()
        {
            Heading = heading,
            PrimaryAssembly = new AssemblyModel(platformAssemblyName, platformAssemblyVersion),
            Environments = _options.Environments?.Select(x => new EnvironmentModel(x.Name,
                                                                                   new Uri(x.BaseUrl),
                                                                                   currentUri,
                                                                                   x.UmbracoPathOrUrl,
                                                                                   x.DisableUmbracoUrl,
                                                                                   x.AlternativeHostnames,
                                                                                   x.IconClass)).ToList(),
            SystemInformation = new()
            {
                Enabled = _options.SystemInformation.Enabled,
                Assemblies = _options.SystemInformation.Assemblies
                    .Select(x => new AssemblyModel(x.AssemblyName ?? "", GetAssemblyVersion(x.AssemblyName ?? "")))
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
        IconImageFilePath = _options.IconImageFilePath
    };

    private static string GetAssemblyVersion(string assemblyName)
    {
        try
        {
            if (string.IsNullOrEmpty(assemblyName)) return "";

            Assembly assembly = Assembly.Load(new AssemblyName(assemblyName));

            string? version = assembly.GetName().Version?.ToString();

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
