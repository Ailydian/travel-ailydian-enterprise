# 🚀 QUICK START GUIDE - İlk 100 Sayfa İçin

## 1️⃣ Önkoşullar (2 dakika)

```bash
# OpenAI API key'inizi .env.local dosyasına ekleyin
echo "OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE" >> .env.local
```

## 2️⃣ Test Çalıştırın (1 dakika)

```bash
# Tek bir ürün ile test edin
npm run content:test
```

**Beklenen Çıktı:**
```
✅ Content Generated Successfully!
📄 GENERATED CONTENT:
   Title: Antalya Tekne Turu - Test | AILYDIAN Holiday
   Description: Akdeniz'in turkuaz sularında eşsiz bir gün...
   Keywords: antalya tekne turu, 3 adalar, tekne turu...
✅ SEO optimization working correctly
✅ i18n integration working correctly
🎉 ALL TESTS PASSED!
```

## 3️⃣ İlk 10 Sayfa Üretin (5 dakika)

```bash
# 10 ürün x 8 dil = 80 sayfa
npm run content:generate:test
```

**Beklenen Çıktı:**
```
📊 Products: 10
🌍 Languages: tr, en, de, ru, ar, fa, fr, el
📄 Total Pages: 80

[1/80] Processing: tour-001-tr
✅ [1/80] Completed: tour-001-tr
[2/80] Processing: tour-001-en
...

✅ Completed: 80
⏱️  Duration: 5m 23s
```

## 4️⃣ Üretilen İçeriği İnceleyin

```bash
# Generated content klasörünü açın
open generated-content/

# Örnek dosyayı görüntüleyin
cat generated-content/tour/antalya-boat-tour-001-tr.json | jq
```

## 5️⃣ İlk 100 Sayfa (45 dakika)

```bash
# 100 ürün x 8 dil = 800 sayfa
npm run content:generate
```

## 6️⃣ SEO Dosyalarını Deploy Edin

```bash
# Sitemaps ve robots.txt'yi public/ klasörüne kopyalayın
cp generated-content/seo/*.xml public/
cp generated-content/seo/robots.txt public/
```

## 7️⃣ Build ve Test

```bash
# Next.js build
npm run build

# Local test
npm run dev
```

## 8️⃣ Lighthouse Test

```bash
# Chrome DevTools > Lighthouse
# Test URL: http://localhost:3100/tours/antalya-boat-tour-001
```

**Hedef Skorlar:**
- Performance: >90
- SEO: >95
- Best Practices: >90
- Accessibility: >90

## ✅ Başarı Kriterleri

İlk 100 sayfa için:

- [x] Test passed (`npm run content:test`)
- [x] First batch generated (10 products)
- [x] Content quality verified
- [x] SEO files generated
- [x] Build successful
- [x] Lighthouse score >90

## 🎯 Sonraki Adımlar

1. **Content Review**: 10 sayfayı manuel olarak inceleyin
2. **SEO Validation**: Google Rich Results Test ile doğrulayın
3. **Translation Check**: Çevirileri native speaker ile kontrol edin
4. **Full Generation**: `npm run content:generate:full`

## 📞 Destek

Sorun yaşarsanız:
- 📧 Email: dev@ailydian.com
- 📚 Docs: `CONTENT-GENERATION.md`
- 📊 Report: `MEGA-PROJECT-REPORT.md`

## ⚡ Hızlı Komutlar

```bash
# Test
npm run content:test

# Interactive CLI (önerilen)
npm run content:cli

# 10 sayfa
npm run content:generate:test

# 100 sayfa
npm run content:generate

# Tüm sayfalar
npm run content:generate:full
```

---

**Tahmini Süre: İlk 100 sayfa için ~50 dakika**
**Maliyet: ~$16 USD (OpenAI API)**

🚀 Başarılar!
