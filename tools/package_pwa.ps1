$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$appRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$workspaceRoot = [IO.Path]::GetFullPath((Join-Path $appRoot '..'))
$archivePath = Join-Path $workspaceRoot 'CNC_ANASS_App.zip'
$temporaryPath = Join-Path $workspaceRoot 'CNC_ANASS_App.audit-new.zip'
$files = @('index.html','analytics.js','app.js','app.css','sw.js','version.json','manifest.webmanifest','pdfs.js','favicon.ico','privacy-policy.html','LISEZ-MOI.md','local-server.js','build_single.js','build_single.py')
$directories = @('data','vendor','icons','assets','cours-pdf','concours-commun','tools')
$zip = [IO.Compression.ZipFile]::Open($temporaryPath, [IO.Compression.ZipArchiveMode]::Create)
try {
    $included = @($files | ForEach-Object { Get-Item -LiteralPath (Join-Path $appRoot $_) })
    foreach ($directory in $directories) {
        $included += Get-ChildItem -LiteralPath (Join-Path $appRoot $directory) -File -Recurse | Where-Object { $_.Name -notmatch '\.bak(?:_|$)' -and $_.Name -notmatch '^\.' }
    }
    foreach ($file in $included) {
        $entry = $file.FullName.Substring($appRoot.Length + 1).Replace('\','/')
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $entry, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
} finally { $zip.Dispose() }
Move-Item -LiteralPath $temporaryPath -Destination $archivePath -Force
Get-Item -LiteralPath $archivePath | Select-Object FullName,Length
