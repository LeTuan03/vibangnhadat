@echo off
echo ========================================
echo   Building Production Version
echo ========================================
echo.
echo Building optimized production files...
echo Output will be in: dist/
echo.

npm run build

echo.
echo ========================================
echo Build complete!
echo Files are in the 'dist' folder
echo ========================================
pause
