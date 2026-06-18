Set-Location -LiteralPath $PSScriptRoot
"Starting SASRA Next.js server at $(Get-Date)" | Set-Content -LiteralPath "server-3050.log"
& "$PSScriptRoot\node_modules\.bin\next.cmd" dev -H 127.0.0.1 -p 3050 *>> "$PSScriptRoot\server-3050.log"
