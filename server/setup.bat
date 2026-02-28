@echo off
REM Quick Setup Script for Krystal Aqua Backend (Windows)

echo.
echo 🚀 Krystal Aqua Backend Setup
echo ==============================
echo.

REM Check if .env exists
if not exist .env (
  echo 📝 Creating .env file from .env.example...
  copy .env.example .env
  echo ✅ .env created. Update it with your MySQL password!
  echo.
  echo Edit .env and set:
  echo   DB_PASSWORD=your_mysql_password
  echo.
) else (
  echo ✅ .env file exists
  echo.
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
echo ✅ Dependencies installed
echo.

REM Initialize database
echo 💾 Initializing database tables...
call node init-db.js
