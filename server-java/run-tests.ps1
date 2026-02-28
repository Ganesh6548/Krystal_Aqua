# Run Maven tests for the server-java module (Windows PowerShell)
Set-Location -Path "$PSScriptRoot"
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Error "Maven (mvn) not found on PATH. Install Maven or add mvn to PATH."
    exit 1
}
mvn test
