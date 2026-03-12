@echo off
echo ========================================
echo TAM CACHE TEMIZLIK
echo ========================================
echo.

echo 1. Node process'leri durduruluyor...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo 2. .next klasoru siliniyor...
if exist .next (
    rmdir /s /q .next
    echo    ✓ .next silindi
) else (
    echo    ⚠ .next bulunamadi
)

echo 3. node_modules cache temizleniyor...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo    ✓ node_modules cache temizlendi
)

echo.
echo ========================================
echo Cache temizleme TAMAMLANDI!
echo ========================================
echo.
echo Simdi YENIDEN_BASLAT.bat dosyasini calistirin
echo veya terminal'de: npm run dev
echo.
pause
