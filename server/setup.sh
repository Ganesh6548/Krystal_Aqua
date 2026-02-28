#!/bin/bash
# Quick Setup Script for Krystal Aqua Backend

echo "🚀 Krystal Aqua Backend Setup"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from .env.example..."
  cp .env.example .env
  echo "✅ .env created. Update it with your MySQL password!"
  echo ""
  echo "Edit .env and set:"
  echo "  DB_PASSWORD=your_mysql_password"
  echo ""
else
  echo "✅ .env file exists"
  echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Initialize database
echo "💾 Initializing database tables..."
node init-db.js
