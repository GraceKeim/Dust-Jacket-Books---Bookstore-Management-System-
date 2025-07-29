@echo off
echo Starting Dust Jacket Books Development Environment...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm is not available. Please reinstall Node.js.
    pause
    exit /b 1
)

echo Node.js and npm are available.
echo.

REM Check if package.json exists
if not exist package.json (
    echo package.json not found in current directory.
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Failed to install dependencies.
        pause
        exit /b 1
    )
    echo.
)

echo Choose an option:
echo 1. Start Frontend Only (HTTP Server)
echo 2. Start Backend Server (Node.js + Frontend)
echo 3. Install Dependencies Only
echo.
set /p choice=Enter your choice (1-3): 

if "%choice%"=="1" (
    echo Starting frontend development server...
    echo Open http://localhost:3000 in your browser
    npx http-server . -p 3000 -c-1 -o
) else if "%choice%"=="2" (
    echo Starting full development server...
    echo Frontend: http://localhost:3000
    echo API: http://localhost:3000/api/health
    node server.js
) else if "%choice%"=="3" (
    echo Installing/updating dependencies...
    npm install
    echo Dependencies installed successfully.
    pause
) else (
    echo Invalid choice. Please run the script again.
    pause
)

echo.
echo Thanks for using Dust Jacket Books!
pause
