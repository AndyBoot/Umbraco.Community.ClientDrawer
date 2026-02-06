using ClientDrawer.Bellissima.Swagger;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Api.Management.OpenApi;
using ClientDrawer.Core.Models;
using ClientDrawer.Core.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Extensions;

namespace ClientDrawer.Bellissima.Composers
{
    public class RegisterServices : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            // Register custom Swagger document for clientdrawer API
            builder.Services.Configure<SwaggerGenOptions>(opt =>
            {
                opt.SwaggerDoc("clientdrawer", new OpenApiInfo
                {
                    Title = "Client Drawer Api",
                    Version = "1.0",
                });

                opt.OperationFilter<ClientDrawerOperationSecurityFilter>();
            });

            builder.Services.TryAddSingleton<IClientDrawerService, ClientDrawerService>();

            builder.Services.AddOptions<AppSettingsModel>()
                .Bind(builder.Config.GetSection(AppSettingsModel.SECTION_POSITION))
                .ValidateDataAnnotations()
                .ValidateOnStart();
        }

        public class ClientDrawerOperationSecurityFilter : BackOfficeSecurityRequirementsOperationFilterBase
        {
            protected override string ApiName => "clientdrawer";
        }
    }
}
