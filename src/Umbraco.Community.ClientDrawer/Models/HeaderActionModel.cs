using System.Runtime.Serialization;

namespace Umbraco.Community.ClientDrawer.Models
{
    [DataContract]
    public class HeaderActionModel
    {
        [DataMember(Name = "clientName")]
        public required string ClientName { get; set; }

        [DataMember(Name = "iconClass")]
        public string IconClass { get; set; } = "icon-sunny";

        [DataMember(Name = "iconImageFilePath")]
        public string? IconImageFilePath { get; set; }
    }
}
