#!/bin/bash
cd "$(dirname "$0")"

# Title
echo "=========================================="
echo "   📲 Dynamic QR App Launcher"
echo "=========================================="
echo ""

# Try to source user profiles to find node if possible
source ~/.zshrc 2>/dev/null
source ~/.bash_profile 2>/dev/null
source ~/.profile 2>/dev/null

# Function to check for Node
check_node() {
    if command -v node >/dev/null 2>&1; then
        echo "✅ Node.js found: $(node -v)"
        return 0
    else
        # Check common paths manually
        if [ -f "/opt/homebrew/bin/node" ]; then
            export PATH="/opt/homebrew/bin:$PATH"
            echo "✅ Node.js found in Homebrew."
            return 0
        elif [ -f "/usr/local/bin/node" ]; then
            export PATH="/usr/local/bin:$PATH"
            echo "✅ Node.js found in /usr/local/bin."
            return 0
        fi
    fi
    return 1
}

# Run Check
if check_node; then
    echo "🚀 Starting installation..."
    echo "PLEASE WAIT... This may take a minute."
    npm install
    
    echo ""
    echo "🎉 Launching App..."
    echo "You should see the website open shortly."
    echo "Press Ctrl+C here to stop the server."
    echo ""
    # Open browser after a slight delay
    (sleep 5 && open http://localhost:3000) &
    npm run dev
else
    echo "❌ CRITICAL ERROR: Node.js is NOT installed."
    echo ""
    echo "This app requires 'Node.js' to run."
    echo "I will open the download page for you now."
    echo "1. Download the 'LTS' version."
    echo "2. Install it."
    echo "3. Come back here and run this file again."
    echo ""
    read -p "Press Enter to open download page..."
    open "https://nodejs.org/"
fi
