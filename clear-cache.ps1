# Next.js Cache Temizleme Scripti
Write-Host "Next.js cache temizleniyor..." -ForegroundColor Yellow

# .next klasörünü sil
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✓ .next klasörü silindi" -ForegroundColor Green
} else {
    Write-Host "⚠ .next klasörü bulunamadı" -ForegroundColor Yellow
}

# node_modules cache'i temizle
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "✓ node_modules cache temizlendi" -ForegroundColor Green
} else {
    Write-Host "⚠ node_modules cache bulunamadı" -ForegroundColor Yellow
}

Write-Host "`nCache temizleme tamamlandı!" -ForegroundColor Green
Write-Host "Geliştirme sunucusunu yeniden başlatmak için: npm run dev" -ForegroundColor Cyan
