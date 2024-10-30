using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ClientDrawer.Bellissima.Swagger
{
    internal class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
                "clientdrawer",
                new OpenApiInfo
                {
                    Title = "Client Drawer Api",
                    Version = "1.0",
                });

            options.OperationFilter<BackOfficeSecurityRequirementsOperationFilter>();
        }
    }
}
