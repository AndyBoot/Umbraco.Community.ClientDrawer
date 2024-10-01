using System.Runtime.Serialization;
using System.Xml.Serialization;
using Umbraco.Extensions;
using static Umbraco.Community.ClientDrawer.Models.DataModel.ChangeLogXml;

namespace Umbraco.Community.ClientDrawer.Models
{
    [DataContract]
    public class DataModel
    {
        [DataMember(Name = "heading")]
        public string Heading { get; set; } = "";
        [DataMember(Name = "primaryAssembly")]
        public AssemblyModel? PrimaryAssembly { get; set; }
        [DataMember(Name = "environments")]
        public List<EnvironmentModel>? Environments { get; set; }
        [DataMember(Name = "changeLog")]
        public List<LogEntry> ChangeLog { get; set; } = [];
        [DataMember(Name = "systemInformation")]
        public SystemInformationModel SystemInformation { get; set; } = new();

        [DataContract]
        public class EnvironmentModel
        {
            public EnvironmentModel(string Name, Uri BaseUri, Uri CurrentUri, string UmbracoPathOrUrl, bool DisableUmbracoUrl, string[]? AlternativeHostNames, string IconClass)
            {
                var hostNames = new List<string>() { BaseUri.Host };
                if (AlternativeHostNames?.Length > 0)
                {
                    hostNames.AddRange(AlternativeHostNames);
                }
                var currentHostname = CurrentUri.Host;

                this.UmbracoUrl = UmbracoPathOrUrl.InvariantStartsWith("http") ? UmbracoPathOrUrl : new UriBuilder(BaseUri.Scheme, BaseUri.Host, BaseUri.Port, UmbracoPathOrUrl).Uri.AbsoluteUri;
                this.Name = Name;
                this.PrimaryUrl = BaseUri.AbsoluteUri;
                this.IsCurrent = hostNames.InvariantContains(currentHostname);
                this.IconClass = IconClass;
                this.DisableUmbracoUrl = DisableUmbracoUrl || this.IsCurrent;
            }

            [DataMember(Name = "name")]
            public string Name { get; set; }
            [DataMember(Name = "primaryUrl")]
            public string PrimaryUrl { get; set; }
            [DataMember(Name = "umbracoUrl")]
            public string UmbracoUrl { get; set; }
            [DataMember(Name = "disableUmbracoUrl")]
            public bool DisableUmbracoUrl { get; set; }
            [DataMember(Name = "isCurrent")]
            public bool IsCurrent { get; set; }
            [DataMember(Name = "iconClass")]
            public string IconClass { get; set; }
        }

        [DataContract]
        public class SystemInformationModel
        {
            [DataMember(Name = "enabled")]
            public bool Enabled { get; set; } = true;
            [DataMember(Name = "assemblies")]
            public AssemblyModel[] Assemblies { get; set; } = [];
        }

        [DataContract]
        public record AssemblyModel
        {
            public AssemblyModel(string? name, string? version)
            {
                Name = name;
                Version = version;
            }

            [DataMember(Name = "name")]
            public string? Name { get; set; }
            [DataMember(Name = "version")]
            public string? Version { get; set; }
        }

        [XmlRoot("ChangeLog")]
        public class ChangeLogXml
        {
            [XmlElement("Entry")]
            public List<LogEntry>? Entries { get; set; }

            [DataContract]
            public record LogEntry
            {
                [XmlAttribute("Date")]
                [DataMember(Name = "date")]
                public DateTime Date { get; set; }

                [XmlElement("Change")]
                [DataMember(Name = "changes")]
                public List<Change>? Changes { get; set; }

                [DataMember(Name = "formattedDate")]
                public string FormattedDate { get { return Date.ToString("yyyy-MM-dd"); } }
                [DataMember(Name = "friendlyDatePeriod")]
                public string FriendlyDatePeriod
                {
                    get
                    {
                        var timespan = DateTime.Now - Date;

                        if (timespan.TotalDays < 1)
                            return "Today";
                        if (timespan.TotalDays < 2)
                            return "Yesterday";
                        if (timespan.TotalDays < 7)
                            return $"{(int)timespan.TotalDays} days ago";
                        if (timespan.TotalDays < 30)
                            return $"{(int)(timespan.TotalDays / 7)} week{(timespan.TotalDays >= 14 ? "s" : "")} ago";
                        if (timespan.TotalDays < 365)
                            return $"{(int)(timespan.TotalDays / 30)} month{(timespan.TotalDays >= 60 ? "s" : "")} ago";

                        return $"{(int)(timespan.TotalDays / 365)} year{(timespan.TotalDays >= 730 ? "s" : "")} ago";
                    }
                }
            }

            [DataContract]
            public record Change
            {
                [XmlText]
                [DataMember(Name = "text")]
                public required string Text { get; set; }

                [XmlAttribute("Link")]
                [DataMember(Name = "link")]
                public string? Link { get; set; }
            }
        }



    }


}