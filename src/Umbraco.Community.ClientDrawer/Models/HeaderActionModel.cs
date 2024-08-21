namespace Umbraco.Community.ClientDrawer.Models
{
    public class HeaderActionModel
    {
        public required string ClientName { get; set; }
        public string IconClass { get; set; } = "icon-sunny";
        public string? IconImageFilePath { get; set; }
    }
}
