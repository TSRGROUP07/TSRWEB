@echo off
echo ========================================
echo Next.js Dev Sunucusu Yeniden Baslatiliyor
echo ========================================
echo.

echo 1. Mevcut Node process'leri durduruluyor...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo 2. Cache temizleniyor...
if exist .next (
    rmdir /s /q .next
    echo    .next klasoru silindi
)

echo 3. Dev sunucusu baslatiliyor...
echo.
echo ========================================
echo Sunucu baslatildi! Tarayicida acin:
echo http://localhost:3002
echo ========================================
echo.
echo NOT: Tarayicida Ctrl+Shift+R yaparak
echo      hard refresh yapin!
echo.

npm run dev
