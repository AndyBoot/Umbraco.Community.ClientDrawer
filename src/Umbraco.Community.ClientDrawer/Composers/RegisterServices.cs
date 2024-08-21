using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Community.ClientDrawer.Models;

namespace Umbraco.Community.ClientDrawer.Composers
{
    internal class RegisterServices : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddOptions<AppSettingsModel>().Bind(builder.Config.GetSection(AppSettingsModel.SECTION_POSITION));
        }
    }
}
