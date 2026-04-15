# Push BobbyWebsite to GitHub — run on YOUR PC (double-click push-github.bat or: powershell -File push-github.ps1)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$repo = "https://github.com/broiscodingtpc/bobbywebsite.git"

# --- Option A: Personal Access Token in env (https://github.com/settings/tokens — scope: repo) ---
$token = $env:GITHUB_TOKEN
if (-not $token) { $token = $env:GH_TOKEN }

if ($token) {
    # PAT as password; x-access-token is accepted by GitHub for HTTPS Git operations
    $authed = "https://x-access-token:${token}@github.com/broiscodingtpc/bobbywebsite.git"
    Write-Host "Pushing using GITHUB_TOKEN / GH_TOKEN..."
    git push -u $authed main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: code is on GitHub (main)."
        exit 0
    }
    Write-Host "Push failed. Check token has 'repo' scope."
    exit 1
}

# --- Option B: GitHub CLI (browser login) ---
if (Get-Command gh -ErrorAction SilentlyContinue) {
    gh auth status 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Not logged in. Starting GitHub login (browser)..."
        gh auth login -h github.com -p https -w
    }
    gh auth setup-git
    git remote set-url origin $repo
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: code is on GitHub (main)."
        exit 0
    }
}

# --- Fallback ---
Write-Host ""
Write-Host "To fix push, pick ONE:"
Write-Host "  1) winget install GitHub.cli"
Write-Host "     gh auth login"
Write-Host "     git push -u origin main"
Write-Host ""
Write-Host "  2) Create a token: https://github.com/settings/tokens (classic: repo)"
Write-Host "     In PowerShell:"
Write-Host '     $env:GITHUB_TOKEN="ghp_YOUR_TOKEN_HERE"'
Write-Host "     .\push-github.ps1"
Write-Host ""
exit 1
