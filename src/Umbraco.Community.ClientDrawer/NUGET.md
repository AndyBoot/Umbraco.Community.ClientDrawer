# Umbraco.Community.ClientDrawer
**Client Drawer** is a utility for both editors and developers which offers an easy to configure sidebar (drawer) tucked away within the Umbraco backoffice header bar. The clickable icon can be an icon class or any image/SVG of your choosing. On clicking, you are presented with: 

- The **name** of your website or platform
- The **main assembly version** (if your site is based on a shared assembly)
- A list of **environments** offering the following per item:
    - Customisable icons
    - Customisable name
    - Website URL
    - Umbraco CMS Url - assumes 'Website URL' + '/umbraco/' by default, but can be manually set if under a different URL. You can disable this all together should you wish.
    - Ability to set additional hostnames
    - If the current URL hostname matches the hostname of your Website URL, Umbraco CMS URL or additional hostnames then it will be flagged as 'Current' to clearly identify which environment an editor is on.
- A client friendly **change log** to share recent developments on the website or platform.
    - Based on your own XML file held within the file system, or as a resource item within an assembly of your choice. 
    - Each change is grouped per date.
    - Shows the last 3 dates
    - A 'View all' button to reveal a detailed view showing all changes.
- **System information** section to show the versions of any assembly.

## Screenshots
[![Screenshot 1](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot1.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot1.png) [![Screenshot 2](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot2.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot2.png) [![Screenshot 3](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot3.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot3.png) [![Screenshot 4](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot4.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot4.png) [![Screenshot 5](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot5.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot5.png) [![Screenshot 6](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot6.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot6.png)


## Requirements
So far this package is only compatible with Umbraco 13. Can be installed on any on-premises or Umbraco Cloud installation.

## Installation

### Visual Studio
Simply search for the `Umbraco.Community.ClientDrawer` NuGet package and add it to your project.

### CLI
`dotnet add package Umbraco.Community.ClientDrawer`

## Configuration
### `appsettings*.json` example
```json
{
  "ClientDrawer": {
    "ClientName": "Sample Website, Shared Platform",
    "IconImageFilePath": "/sample.svg",
    "HeaderButtonMode": "IconAndEnvironmentName",
    "Platform": {
      "AssemblyName": "Sample.Platform.Shared",
      "VersionSource": "InformationalVersion",
      "VersionRegEx": "^[^+]+"
    },
    "Environments": [
      {
        "Name": "Preview",
        "BaseUrl": "https://preview.samplewebsite.com",
        "AlternativeHostnames": [ "samplewebsite-preview.azurewebsites.net" ],
        "IconClass": "icon-mindmap"
      },
      {
        "Name": "Staging",
        "BaseUrl": "https://staging.samplewebsite.com",
        "UmbracoPathOrUrl": "https://samplewebsite-staging.azurewebsites.net/umbraco/",
        "IconClass": "icon-presentation"
      },
      {
        "Name": "Authoring",
        "BaseUrl": "https://authoring.samplewebsite.com",
        "UmbracoPathOrUrl": "https://samplewebsite-authoring.azurewebsites.net/umbraco/",
        "IconClass": "icon-keyboard"
      },
      {
        "Name": "Production",
        "BaseUrl": "https://www.samplewebsite.com",
        "AlternativeHostnames": [ "samplewebsite.azurewebsites.net" ],
        "DisableUmbracoUrl": true,
        "IconClass": "icon-globe"
      }
    ],
    "SystemInformation": {
      "Assemblies": [
        { "AssemblyName": "Umbraco.Core" }
      ]
    },
    "ChangeLog": {
      "AssemblyName": "Sample.Platform.Shared"
    }
  }
}
```

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	| Since Version 	|
|---------------	|--------	|---------------	|---------------	|---------------	|
| ClientName       	| `string` 	| `null` (required)  	| `"Sample Website, Shared Platform"`                  | 1.0.0 |
| IconClass        	| `string` 	| `"icon-sunny"`   	| `"icon-globe"`    | 1.0.0 |
| IconImageFilePath	| `string` 	| `null`   	        | `"sample-logo.svg"` or `"sample-logo.png"`                  | 1.0.0 |
| HeaderButtonMode	| `string` 	| `Icon`   	        | `"EnvironmentName"` or `"IconAndEnvironmentName"`                  | 1.1.0 |
| Platform        	| `Assembly` 	|    	|     | 1.0.0 |
| Environments        	| `Environment[]` 	|    	|     | 1.0.0 |
| ChangeLog        	| `ChangeLog` 	|    	|     | 1.0.0 |
| SystemInformation        	| `SystemInformation` 	|    	|     | 1.0.0 |

### `Assembly`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	| Since Version 	|
|---------------	|--------	|---------------	|---------------	|---------------	|
| AssemblyName    	| `string` 	| `null`  	| `"Sample.Platform.Shared"` or `"Umbraco.Core"`                  | 1.0.0 |
| VersionSource    	| `string` 	| `Version`  	| `"FileVersion"` or `"InformationalVersion"`                  | 1.1.0 |
| VersionRegEx    	| `string` 	| `null`  	| `^[^+]+` (This removes everything after the + symbol)                 | 1.1.0 |

### `Environment`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	| Since Version 	|
|---------------	|--------	|---------------	|---------------	|---------------	|
| Name          	| `string` 	| `null`  	| `"Staging"` or `"Production"`                  | 1.0.0 |
| BaseUrl          	| `string` 	| `null`  	| `"https://staging.samplewebsite.com"` or `"https://www.samplewebsite.com"`                  | 1.0.0 |
| UmbracoPathOrUrl          	| `string` 	| `"/umbraco/"`  	| `"https://samplewebsite.azurewebsites.net/umbraco/"`  | 1.0.0 |
| DisableUmbracoUrl          	| `bool` 	| `false`  	| | 1.0.0 |
| AlternativeHostnames          	| `string[]` 	| `null`  	| `["test.samplewebsite.com", "nocache.samplewebsite.com"]` | 1.0.0 |
| IconClass          	| `string` 	| `"icon-globe"`  	| `"icon-mindmap"` | 1.0.0 |

### `ChangeLog`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	| Since Version 	|
|---------------	|--------	|---------------	|---------------	|---------------	|
| FilePath         	| `string` 	| `"changelog.xml"`  	| `"/path/to/changelog.xml"`                  | 1.0.0 |
| AssemblyName     	| `string` 	| `null`  	| `Sample.Platform.Shared`                  | 1.0.0 |

### `SystemInformation`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	| Since Version 	|
|---------------	|--------	|---------------	|---------------	|---------------	|
| Enabled         	| `bool` 	| `true`  	| `false`                  | 1.0.0 |
| Assemblies     	| `Assembly[]` 	| `[]`  	| `[{ "AssemblyName": "Umbraco.Core" }, { "AssemblyName": "Umbraco.Forms" }]`                  | 1.0.0 |

## Change Log XML
Simply create an XML file within your website project or other referenced project/assembly. For ease, create it in the root and name it `changelog.xml`.

### Format
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ChangeLog>
	<Entry Date="2022-01-20">
		<Change Link="https://trello.com">Updated feature A.</Change>
	</Entry>
	<Entry Date="2023-01-20">
		<Change>Updated feature B.</Change>
	</Entry>
	<Entry Date="2023-08-20">
		<Change>Updated feature C.</Change>
	</Entry>
	<Entry Date="2024-08-01">
		<Change>Added new feature X.</Change>
		<Change>Fixed bug Y.</Change>
	</Entry>
	<Entry Date="2024-08-02">
		<Change>Updated feature Z.</Change>
	</Entry>
</ChangeLog>
```

### Notes
If you're creating this within your website project, use the `ClientDrawer:ChangeLog:FilePath` setting. 

If you're embedding this file as a resource within a DLL, also use the `ClientDrawer:ChangeLog:AssemblyName` setting. To add a file as an embedded resource, you must ensure you have the following within your csproj file:
```
<ItemGroup>
	<None Remove="changelog.xml" />
	<EmbeddedResource Include="changelog.xml" />
</ItemGroup>
```


## Change Log

|Version    |Change Type            |Description            |
|-----------|---------------        |---------------        |
|1.1.1      |Fix                |Fixed a bug which caused the header button to duplicate on lock screen timeout.           |
|1.1.0      |Feature                |Header Modes! You now have 'Icon', 'Environment Name', or 'Icon + Environment Name' as the button in the header.           |
|1.1.0      |Enhancement            |Assemblies now support different version sources & regular expressions for cleaning up the displayed version (see sample projects)|
|1.1.0      |Enhancement            |Change log entries now support links to kanban or ticketing systems (i.e. Trello, Jira, etc)               |
|1.0.1      |Security               |Fixes                  |
|1.0.0      |n/a                       |Initial                |

## Troubleshooting
Coming soon

## Contributions
You're more than welcome to fork and do a pull request. Just drop me a message first and discuss before you devote your time into your idea.

## Issues
Please report them on the issues tab of this repository.

## Accreditations
- Logo - [Drawer icons created by Design Circle - Flaticon](https://www.flaticon.com/free-icons/drawer)