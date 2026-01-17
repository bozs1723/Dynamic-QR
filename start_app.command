#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting Dynamic QR App..."
echo "📂 Directory: $(pwd)"

if ! command -v npm &> /dev/null; then
    echo "❌ Error: Node.js (npm) is not installed or not found."
    echo "👉 Please install Node.js from https://nodejs.org/"
    read -p "Press Enter to close..."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "✨ Starting Development Server..."
npm run dev
