@echo off
echo 🚀 IMS Dashboard Setup Script
echo ==============================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Check if wrangler is installed
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Wrangler CLI...
    npm install -g wrangler
)

echo ✅ Prerequisites check passed!

REM Install dependencies
echo 📦 Installing project dependencies...
npm install

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    copy env.example .env.local
    echo ⚠️  Please edit .env.local and set your JWT_SECRET
)

REM Check if user is logged in to Cloudflare
echo 🔐 Checking Cloudflare authentication...
wrangler whoami >nul 2>&1
if errorlevel 1 (
    echo ⚠️  You need to login to Cloudflare. Please run:
    echo    wrangler login
    echo.
    echo After logging in, run this script again.
    pause
    exit /b 1
)

echo ✅ Cloudflare authentication verified!

REM Initialize database
echo 🗄️  Initializing database...
npm run db:init

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit .env.local and set a secure JWT_SECRET
echo 2. Run 'npm run dev' to start development server
echo 3. Visit http://localhost:3000 to see your application
echo 4. Test user registration at /register
echo.
echo For deployment:
echo 1. Run 'npm run deploy' to deploy to Cloudflare Workers
echo 2. Check DEPLOYMENT.md for detailed instructions
pause
