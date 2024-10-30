using ClientDrawer.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace ClientDrawer.Core.Models
{
    public class AppSettingsModel
    {
        public const string SECTION_POSITION = "ClientDrawer";

        [Required]
        public required string ClientName { get; set; }
        public string IconClass { get; set; } = "icon-sunny";
        public string? IconImageFilePath { get; set; }
        public HeaderActionMode HeaderButtonMode { get; set; } = HeaderActionMode.Icon;
        public AssemblyModel? Platform { get; set; }
        public EnvironmentModel[]? Environments { get; set; }
        public SystemInformationModel SystemInformation { get; set; } = new();
        public ChangeLogModel ChangeLog { get; set; } = new();

        public record AssemblyModel(string? AssemblyName, AssemblyVersionEnum VersionSource = AssemblyVersionEnum.Version, string? VersionRegEx = null);
        public record EnvironmentModel
        {
            public required string Name { get; set; }
            public required string BaseUrl { get; set; }
            public string UmbracoPathOrUrl { get; set; } = "/umbraco/";
            public bool DisableUmbracoUrl { get; set; } = false;
            public string[]? AlternativeHostnames { get; set; }
            public string IconClass { get; set; } = "icon-globe";
        }
        public record SystemInformationModel
        {
            public bool Enabled { get; set; } = true;
            public AssemblyModel[] Assemblies { get; set; } = [];
        }
        public record ChangeLogModel
        {
            public string FilePath { get; set; } = "changelog.xml";
            public string? AssemblyName { get; set; }
        }
    }
}
