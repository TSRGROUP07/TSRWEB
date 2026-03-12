# Vercel Environment Variables Kurulumu

## 🚀 Hızlı Kurulum

### 1. Vercel Dashboard'a Gidin
- https://vercel.com/dashboard
- Projenizi seçin
- **Settings** → **Environment Variables**

### 2. Şu Değişkenleri Ekleyin:

#### Admin Giriş Bilgileri
```
ADMIN_EMAIL = admin@tsremlak.com
ADMIN_PASSWORD = güvenli-şifreniz-buraya
```

#### Firebase Service Account Key
```
FIREBASE_SERVICE_ACCOUNT_KEY = {"type":"service_account","project_id":"tsr-web-112e2","private_key_id":"d651f6bb910269cafe1dd3de08f97488b852c3a8","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmWtnwEo7lYYeq\nYWHLbmV0ADQnlzTVRTjqEGmZm5wpBY9bSgT5/rdM92nmkBOcMIP3872DcBR1Bvde\nQ9k8k52o9qqI2CxbvA1eq5AA66z3/qM7/Ec5iNjxB0EWp8rK2XTk31J8JZ58odh5\nNTPgoIr2ZrvLG2yVTjjk9jRJZZw3P27kcOCiGeuHM4S91f1CJaRX/BmW9LvSz/aD\nrmcPQz+h0wNDSl4UOxMd9RkSwfYk0S/DYi2K4m8ognZAcRHJXgtebWm8a57WFtN7\ndDKgsDIFu4mL8qSoJ8CutoiUhN+FJlLnKie2UMLItuNRX2xGjL3P859TgSWVOiBE\nqZBZ+JevAgMBAAECggEANjHZ1z7Mg8jywByKlhIohhJ86zr08Nfk00g2ht7tkGWp\nztU96s3DHJVr0Du2z8b0b0ZeQqA0Ye27j9+tuXDjx4RYiU1XoikQ9/sPZmVhC8fO\nmP+2mnVNK7SvzTgrtksCrH9eqWg+Ch9V3SLqfC8BJoXQfzo3dSqvGVRmM1Uhf9Op\nEwNLAI8hGdhPrOCT3IMsJHcwNALjLL5Vq5tRBn07OCEIxeVVs8h6CYBvUbLMS4NP\nEiXRPoldKZ4ylWmjgpN04M+30/vfa8lUNEWT3gVkh34afvuPUUhEvDuG4dtGRVKV\nAi5nM2mw85TgMWDTm8BoqFgXgW4Sw1SJeSCRZO8gmQKBgQDgvfDbOAa+oycA88X0\nUKf9dqMIEGJIylJjMT1HHBtzyiUCVb5Mh/gwXRRka0XZ7gryHWWliS+ZMraRHCvt\nX7kgXxSp4edR4cztBxadPIvEIpSaCAxdU85fuqdmyZqxRXnHNIZu9AVFD0fuiWP3\n6Td+OL9K8uOmKrSgsFCX1Rd+6QKBgQC9fgHbxg0i5CPOSgI2k9iE1odWUuwrwUSJ\n1RbDkQX5l+ZlOmFJKeoNKFY7M851xCOuPQGav9KBgycDan6yZNMRwlCL3fMaxdEr\nYsjJocgVv2Onpmg255Pfmfdp6PXxERloep8mGF5xiGs/dDxDNxbt/L3g87fIxKrW\nswxgS6ey1wKBgQC67mHbBTPe9zem/ByIBVplYXtjZrVJVDfI15jff8p5ugakdYsu\nft355EHk8LEN/ohOMBNu57eWlm7yLdt/umHyQgOe9g6Ate7MrFur90NNpXGy2MTo\nD6AVUdyRi1jG4EHVZqP2v7NuaLJs/wwOlYYZz7uU7IhbmyPYkC7Iy26amQKBgBkW\npt5XQYP+GrOEXvik6ITl9nM6dWRxqUZqfSIVgGoEb4+1hA3wy7lEPu6FtG8pMeQu\n1ZiMjy1wlOjB39Z0vPFb/dgW4coIqOIKqTTxA5HFjkczJBco4A45z2UpX+6z6d5I\nZevgTBjSDAkRtazcjV+jF+zBt/KP/2J/wEK7oY9vAoGBALx42x6f7aUZ73kJRnGF\n39L/6Roc2We6pnoOKFx618HoERdE8TMu+wDWZnYWKqv0TGUpGQNq5rycuNVGGY4I\nitkeX/rAALxWDpbMT0SUixrsMimxnu1/SzsgaFd0Gqv4xMY7/KgGLeUTg0iTq5n3\nW1afKHDvLFfSJ0DjJIW7GaLZ\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-fbsvc@tsr-web-112e2.iam.gserviceaccount.com","client_id":"101951592270339740690","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tsr-web-112e2.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

**ÖNEMLİ:** 
- Tüm JSON'u **tek satırda**, **tırnak işaretleri içinde** ekleyin
- Her environment için (Production, Preview, Development) ekleyin

### 3. Deploy'u Yeniden Yapın
- Vercel Dashboard → Deployments
- Son deployment'ın yanındaki "..." → **Redeploy**

## ✅ Test

1. `https://your-domain.com/admin/login` adresine gidin
2. Environment variable'larda belirlediğiniz email/password ile giriş yapın

## ⚠️ ÖNEMLİ NOT

Vercel'de dosya sistemi **read-only** olduğu için:
- JSON dosyalarına yazma **ÇALIŞMAZ**
- Tüm veriler **Firestore**'a kaydedilmeli
- Mevcut verileri Firestore'a migrate etmeniz gerekiyor

## 🔄 Sonraki Adımlar

1. ✅ Environment variables ekleyin (yukarıdaki adımlar)
2. ⏳ Mevcut verileri Firestore'a migrate edin
3. ⏳ API route'ları Firestore kullanacak şekilde güncelleyin
