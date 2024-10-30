using Asp.Versioning;
using ClientDrawer.Core.Models;
using ClientDrawer.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Extensions;

namespace ClientDrawer.Bellissima.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [MapToApi("clientdrawer")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [JsonOptionsName(Constants.JsonOptionsNames.BackOffice)]
    [BackOfficeRoute("clientdrawer/api/v{version:apiVersion}")]
    public class ClientDrawerController
    {
        private readonly IClientDrawerService _clientDrawerService;
        private readonly AppCaches _appCaches;
        private const int CACHE_MINS = 1440; // 1 day


        public ClientDrawerController(IClientDrawerService clientDrawerService, AppCaches appCaches)
        {
            _clientDrawerService = clientDrawerService;
            _appCaches = appCaches;
        }

        [HttpGet("getdata")]
        [ProducesResponseType(typeof(DataModel), 200)]
        public DataModel? GetData() => GetSetCacheItem(_clientDrawerService.GetDataWorker, "ClientDrawerGetData", CACHE_MINS);


        [HttpGet("getheaderactiondata")]
        [ProducesResponseType(typeof(HeaderActionModel), 200)]
        public HeaderActionModel? GetHeaderActionData() => GetSetCacheItem(_clientDrawerService.GetHeaderActionDataWorker, "ClientDrawerGetHeaderActionDataWorker", CACHE_MINS);

        private T? GetSetCacheItem<T>(Func<T> methodName, string cacheName, double expiryMins)
        {
            return _appCaches.RuntimeCache.GetCacheItem(cacheName, () =>
            {
                return methodName();
            }, TimeSpan.FromMinutes(expiryMins));
        }
    }
}
