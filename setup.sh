#!/bin/bash

echo "🚀 IMS Dashboard Setup Script"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

echo "✅ Prerequisites check passed!"

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp env.example .env.local
    echo "⚠️  Please edit .env.local and set your JWT_SECRET"
fi

# Check if user is logged in to Cloudflare
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  You need to login to Cloudflare. Please run:"
    echo "   wrangler login"
    echo ""
    echo "After logging in, run this script again."
    exit 1
fi

echo "✅ Cloudflare authentication verified!"

# Initialize database
echo "🗄️  Initializing database..."
npm run db:init

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local and set a secure JWT_SECRET"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000 to see your application"
echo "4. Test user registration at /register"
echo ""
echo "For deployment:"
echo "1. Run 'npm run deploy' to deploy to Cloudflare Workers"
echo "2. Check DEPLOYMENT.md for detailed instructions"
