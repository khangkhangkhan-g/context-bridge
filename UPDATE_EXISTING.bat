@echo off
setlocal
chcp 65001 >nul

echo ========================================
echo ContextBridge V1.1.1 - Update Existing
echo ========================================
echo.
echo Paste the folder path currently loaded in chrome://extensions.
echo Example: C:\Users\You\Downloads\ContextBridge_V1_0_2
set /p TARGET=Current ContextBridge folder: 

if "%TARGET%"=="" goto :bad
if not exist "%TARGET%\manifest.json" (
  echo.
  echo ERROR: manifest.json was not found in that folder.
  goto :bad
)

for %%F in (content.js background.js zip.js pdf.js api.js normalize.js hook-main.js hook-iso.js manifest.json README.md START_HERE.txt LICENSE CHANGELOG.md) do (
  if exist "%~dp0%%F" copy /Y "%~dp0%%F" "%TARGET%\%%F" >nul
)
if exist "%~dp0docs" xcopy /E /I /Y "%~dp0docs" "%TARGET%\docs" >nul

echo.
echo Update complete.
echo 1. Open chrome://extensions
echo 2. Click Reload on ContextBridge
echo 3. IMPORTANT: refresh ChatGPT with Ctrl+Shift+R so the auth hook starts at page load
echo 4. Wait for the conversation to finish loading
echo 5. Click Scan chat again
echo.
pause
exit /b 0

:bad
echo.
echo Update was not applied.
pause
exit /b 1
