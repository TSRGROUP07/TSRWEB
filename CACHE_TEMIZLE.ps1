# Next.js Cache Temizleme - Basit Versiyon
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next.js Cache Temizleme" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mevcut dizini kontrol et
$currentDir = Get-Location
Write-Host "Mevcut dizin: $currentDir" -ForegroundColor Gray

# .next klasörünü sil
if (Test-Path ".next") {
    Write-Host ".next klasoru bulundu, siliniyor..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "✓ .next klasoru silindi!" -ForegroundColor Green
} else {
    Write-Host "⚠ .next klasoru bulunamadi (zaten temiz)" -ForegroundColor Yellow
}

# node_modules cache'i temizle
if (Test-Path "node_modules\.cache") {
    Write-Host "node_modules cache bulundu, temizleniyor..." -ForegroundColor Yellow
    Remove-Item -Path "node_modules\.cache" -Recurse -Force
    Write-Host "✓ node_modules cache temizlendi!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cache temizleme tamamlandi!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Simdi dev sunucusunu yeniden baslatin:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Read-Host "Devam etmek icin Enter'a basin"
