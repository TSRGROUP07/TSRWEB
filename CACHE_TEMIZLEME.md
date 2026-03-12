# Cache Temizleme Rehberi

## Next.js Cache Temizleme (Terminal)

### PowerShell ile:
```powershell
# .next klasörünü sil
Remove-Item -Recurse -Force .next

# node_modules cache'i temizle (opsiyonel)
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# Dev sunucusunu yeniden başlat
npm run dev
```

### CMD ile:
```cmd
rmdir /s /q .next
rmdir /s /q node_modules\.cache
npm run dev
```

### Bash/Git Bash ile:
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

## Tarayıcı Cache Temizleme

### Chrome/Edge:
- `Ctrl + Shift + Delete` → "Önbelleğe alınan resimler ve dosyalar" → "Verileri temizle"
- Veya `Ctrl + Shift + R` (Hard Refresh)

### Firefox:
- `Ctrl + Shift + Delete` → Cache seç → "Şimdi temizle"
- Veya `Ctrl + F5` (Hard Refresh)

## Geliştirme Sunucusunu Yeniden Başlatma

1. Terminal'de `Ctrl + C` ile durdur
2. `npm run dev` ile yeniden başlat
