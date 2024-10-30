using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Manifest;

namespace ClientDrawer.Belle.Composers;

public class PackageManifestComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.ManifestFilters().Append<PackageManifestFilter>();
    }
}
public class PackageManifestFilter : IManifestFilter
{
    public void Filter(List<PackageManifest> manifests)
    {
        manifests.Add(new PackageManifest
        {
            PackageName = "Umbraco.Community.ClientDrawer",
            Version = "13.0.0",
            AllowPackageTelemetry = true,
            Scripts =
            [
                "/App_Plugins/ClientDrawer/drawer.service.js",
                "/App_Plugins/ClientDrawer/header-actions.js",
                "/App_Plugins/ClientDrawer/drawer.controller.js"
            ],
            Stylesheets =
            [
                "/App_Plugins/ClientDrawer/drawer.min.css"
            ]
        });
    }
}
