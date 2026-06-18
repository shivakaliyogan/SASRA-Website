@echo off
cd /d "%~dp0"
echo Starting SASRA Next.js server at %date% %time% > dev-server.log
echo Logs are written to dev-server.log and dev-server.err.log >> dev-server.log
call node_modules\.bin\next.cmd dev -H 127.0.0.1 -p 3050 >> dev-server.log 2>> dev-server.err.log
