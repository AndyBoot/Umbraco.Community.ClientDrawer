﻿using ClientDrawer.Bellissima.Swagger;
using ClientDrawer.Core.Models;
using ClientDrawer.Core.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Extensions;

namespace ClientDrawer.Bellissima.Composers
{
    public class RegisterServices : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();

            builder.Services.AddUnique<IClientDrawerService, ClientDrawerService>();

            builder.Services.AddOptions<AppSettingsModel>()
                .Bind(builder.Config.GetSection(AppSettingsModel.SECTION_POSITION))
                .ValidateDataAnnotations()
                .ValidateOnStart();
        }
    }
}