# Set the output directory for the nupkg files
$outputDir = (Get-Location).Path

# Change the current directory to the output directory
Set-Location -Path $outputDir

# List of projects and their respective versions
$projectVersions = @{
    "ClientDrawer.Belle" = "13.0.0"
    "ClientDrawer.Bellissima" = "14.0.1"
    "ClientDrawer.Core" = "1.1.0"
}

# Extract the version of ClientDrawer.Core
$CoreVersion = $projectVersions["ClientDrawer.Core"]
Write-Host "CoreVersion is set to $CoreVersion"

# Loop through each project
foreach ($project in $projectVersions.Keys) {
    $version = $projectVersions[$project]
    
    Write-Host "Building project $project with version $version"
    $projectPath = Join-Path -Path $outputDir -ChildPath "$project\$project.csproj"
    
    try {
        # Build the project in Release mode
        $buildResult = dotnet build $projectPath -c Release 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to build project $project"
            Write-Host "Build error details: $buildResult"
            exit $LASTEXITCODE
        }
        
        Write-Host "Packing project $project with version $version using configuration $configuration"
        # Pack the project with the specified version and configuration
        $packResult = dotnet pack $projectPath -c Release --output $outputDir /p:Version=$version /p:CoreVersion=$CoreVersion 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to pack project $project"
            Write-Host "Pack error details: $packResult"
            exit $LASTEXITCODE
        }
    } catch {
        Write-Error "Exception occurred while processing project $project"
        Write-Host "Exception details: $_"
        exit 1
    }
}

Write-Host "All projects have been built and packed successfully."
Pause
