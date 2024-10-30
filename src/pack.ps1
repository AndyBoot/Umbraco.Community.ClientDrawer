# Set the output directory for the nupkg files
$outputDir = (Get-Location).Path

# Change the current directory to the output directory
Set-Location -Path $outputDir

# List of projects to pack
$projects = @(
    "ClientDrawer.Belle",
    "ClientDrawer.Bellissima",
    "ClientDrawer.Core"
)

# Loop through each project to build and pack
foreach ($project in $projects) {
    Write-Host "Building project $project in Release mode"
    $projectPath = Join-Path -Path $outputDir -ChildPath "$project\$project.csproj"
    
    try {
        # Build the project in Release mode
        $buildResult = dotnet build $projectPath -c Release 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to build project $project"
            Write-Host "Build error details: $buildResult"
            exit $LASTEXITCODE
        }
        
        Write-Host "Packing project $project"
        # Pack the project
        $packResult = dotnet pack $projectPath -c Release --output $outputDir 2>&1
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
