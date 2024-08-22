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
[![Screenshot 1](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot1.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot1.png) [![Screenshot 2](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot2.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot2.png) [![Screenshot 3](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot3.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot3.png) [![Screenshot 4](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/thumb_screenshot4.png)](https://raw.githubusercontent.com/AndyBoot/Umbraco.Community.ClientDrawer/main/images/screenshot4.png)


## Requirements
So far this package is only compatible with Umbraco 13. Can be installed on any on-premises or Umbraco Cloud installation.

## Installation

### Visual Studio
Simply search for the `Umbraco.Community.ClientDrawer` NuGet package and add it to your project.

### CLI
`dotnet add package Umbraco.Community.ClientDrawer`

## Configuration
### `appsettings*.json` example
```
{
  "ClientDrawer": {
    "ClientName": "Sample Website, Shared Platform",
    "IconImageFilePath": "/sample.svg",
    "Platform": {
      "AssemblyName": "Sample.Platform.Shared"
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

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	|
|---------------	|--------	|---------------	|---------------	|
| ClientName       	| `string` 	| `null` (required)  	| `"Sample Website, Shared Platform"`                  |
| IconClass        	| `string` 	| `"icon-sunny"`   	| `"icon-globe"`    |
| IconImageFilePath	| `string` 	| `null`   	        | `"sample-logo.svg"` or `"sample-logo.png"`                  |
| Platform        	| `Assembly` 	|    	|     |
| Environments        	| `Environment[]` 	|    	|     |
| ChangeLog        	| `ChangeLog` 	|    	|     |
| SystemInformation        	| `SystemInformation` 	|    	|     |

### `Assembly`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	|
|---------------	|--------	|---------------	|---------------	|
| AssemblyName    	| `string` 	| `null`  	| `"Sample.Platform.Shared"` or `"Umbraco.Core"`                  |

### `Environment`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	|
|---------------	|--------	|---------------	|---------------	|
| Name          	| `string` 	| `null`  	| `"Staging"` or `"Production"`                  |
| BaseUrl          	| `string` 	| `null`  	| `"https://staging.samplewebsite.com"` or `"https://www.samplewebsite.com"`                  |
| UmbracoPathOrUrl          	| `string` 	| `"/umbraco/"`  	| `"https://samplewebsite.azurewebsites.net/umbraco/"`  |
| DisableUmbracoUrl          	| `bool` 	| `false`  	| |
| AlternativeHostnames          	| `string[]` 	| `null`  	| `["test.samplewebsite.com", "nocache.samplewebsite.com"]` |
| IconClass          	| `string` 	| `"icon-globe"`  	| `"icon-mindmap"` |

### `ChangeLog`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	|
|---------------	|--------	|---------------	|---------------	|
| FilePath         	| `string` 	| `"changelog.xml"`  	| `"/path/to/changelog.xml"`                  |
| AssemblyName     	| `string` 	| `null`  	| `Sample.Platform.Shared`                  |

### `SystemInformation`

| Property Name 	| Type   	| Default Value 	| Example Value(s) 	|
|---------------	|--------	|---------------	|---------------	|
| Enabled         	| `bool` 	| `true`  	| `false`                  |
| Assemblies     	| `Assembly[]` 	| `[]`  	| `[{ "AssemblyName": "Umbraco.Core" }, { "AssemblyName": "Umbraco.Forms" }]`                  |

## Change Log XML
Simply create an XML file within your website project or other referenced project/assembly. For ease, create it in the root and name it `changelog.xml`.

### Format
```
<?xml version="1.0" encoding="utf-8" ?>
<ChangeLog>
	<Entry Date="2022-01-20">
		<Change>Updated feature A.</Change>
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

|Version    |Description            |
|-----------|---------------        |
|1.0.1      |Security Fixes         |
|1.0.0      |Initial                |

## Troubleshooting
Coming soon

## Contributions
You're more than welcome to fork and do a pull request.

## Issues
Please report them on the issues tab of this repository.

## Accreditations
- Logo - [Drawer icons created by Design Circle - Flaticon](https://www.flaticon.com/free-icons/drawer)