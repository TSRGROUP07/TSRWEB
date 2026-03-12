@echo off
echo Next.js cache temizleniyor...
if exist .next (
    rmdir /s /q .next
    echo .next klasoru silindi!
) else (
    echo .next klasoru bulunamadi
)
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo node_modules cache temizlendi!
)
echo.
echo Cache temizleme tamamlandi!
echo Dev sunucusunu yeniden baslatmak icin: npm run dev
pause
