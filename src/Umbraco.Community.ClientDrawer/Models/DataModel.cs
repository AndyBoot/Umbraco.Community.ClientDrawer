using System.Xml.Serialization;
using Umbraco.Extensions;
using static Umbraco.Community.ClientDrawer.Models.DataModel.ChangeLogXml;

namespace Umbraco.Community.ClientDrawer.Models
{
    public class DataModel
    {
        public string Heading { get; set; } = "";
        public AssemblyModel? PrimaryAssembly { get; set; }
        public List<EnvironmentModel>? Environments { get; set; }
        public List<LogEntry> ChangeLog { get; set; } = [];
        public SystemInformationModel SystemInformation { get; set; } = new();
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

            public string Name { get; set; }
            public string PrimaryUrl { get; set; }
            public string UmbracoUrl { get; set; }
            public bool DisableUmbracoUrl { get; set; }
            public bool IsCurrent { get; set; }
            public string IconClass { get; set; }
        }

        public class SystemInformationModel
        {
            public bool Enabled { get; set; } = true;
            public AssemblyModel[] Assemblies { get; set; } = [];
        }

        public record AssemblyModel(string Name, string Version);

        [XmlRoot("ChangeLog")]
        public class ChangeLogXml
        {
            [XmlElement("Entry")]
            public List<LogEntry>? Entries { get; set; }

            public record LogEntry
            {
                [XmlAttribute("Date")]
                public DateTime Date { get; set; }

                [XmlElement("Change")]
                public List<string>? Changes { get; set; }

                public string FormattedDate { get { return Date.ToString("yyyy-MM-dd"); } }
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
        }



    }


}