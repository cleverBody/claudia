#!/bin/bash

# Script to install zustand dependency
# Run this if you need to re-enable the zustand stores

echo "Installing zustand dependency..."

# Try different package managers
if command -v bun &> /dev/null; then
    echo "Using bun..."
    bun add zustand
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    npm install zustand
elif command -v yarn &> /dev/null; then
    echo "Using yarn..."
    yarn add zustand
elif command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm add zustand
else
    echo "No package manager found. Please install zustand manually:"
    echo "  bun add zustand"
    echo "  # or"
    echo "  npm install zustand"
    exit 1
fi

echo "Zustand installed successfully!"
echo ""
echo "To re-enable the stores:"
echo "1. Uncomment the imports in src/stores/agentStore.ts"
echo "2. Uncomment the imports in src/stores/sessionStore.ts"
echo "3. Replace 'export const useAgentStore = null as any;' with the actual store"
echo "4. Replace 'export const useSessionStore = null as any;' with the actual store"
