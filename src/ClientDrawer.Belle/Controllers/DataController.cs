using ClientDrawer.Core.Models;
using ClientDrawer.Core.Services;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Extensions;

namespace ClientDrawer.Belle.Controllers;

[PluginController("ClientDrawer")]
public class DataController : UmbracoAuthorizedJsonController
{
    private readonly AppCaches _appCaches;
    private const int CACHE_MINS = 1440; // 1 day
    private readonly IClientDrawerService _clientDrawerService;

    public DataController(AppCaches appCaches, IClientDrawerService clientDrawerService)
    {
        _appCaches = appCaches;
        _clientDrawerService = clientDrawerService;
    }

    public DataModel? GetData() => GetSetCacheItem(_clientDrawerService.GetDataWorker, "ClientDrawerGetData", CACHE_MINS);

    public HeaderActionModel? GetHeaderActionData() => GetSetCacheItem(_clientDrawerService.GetHeaderActionDataWorker, "ClientDrawerGetHeaderActionDataWorker", CACHE_MINS);

    private T? GetSetCacheItem<T>(Func<T> methodName, string cacheName, double expiryMins)
    {
        return _appCaches.RuntimeCache.GetCacheItem(cacheName, () =>
        {
            return methodName();
        }, TimeSpan.FromMinutes(expiryMins));
    }
}
