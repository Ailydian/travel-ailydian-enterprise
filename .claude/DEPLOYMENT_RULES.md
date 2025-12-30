# 🚨 DEPLOYMENT RULES - travel.ailydian.com
# ═══════════════════════════════════════════════════════════════
# CRITICAL: Bu dosya deployment yapısını tanımlar
# ═══════════════════════════════════════════════════════════════

## VERSION: 1.0.0
## STATUS: PERMANENT & IMMUTABLE
## SCOPE: travel.ailydian.com PROJECT
## CREATED: 2025-12-30

---

## 🎯 BU PROJE: STANDALONE DEPLOYMENT SİSTEMİ

### ✅ travel.ailydian.com STANDALONE SİSTEMDİR

```
travel.ailydian.com/
  ├── Role: STANDALONE frontend & backend system
  ├── Deploy: ✅ VERCEL PRODUCTION
  ├── Domain: https://travel.ailydian.com
  ├── Git: Kendi repository
  ├── Dependencies: Kendi package.json
  └── Location: ~/Desktop/projeler/travel.ailydian.com
```

### 📦 Bağımsız Sistem Özellikleri

1. **Kendi Package Management**
   - ✅ Kendi `package.json`
   - ✅ Kendi `node_modules`
   - ✅ Kendi `package-lock.json`

2. **Kendi Build System**
   - ✅ Kendi `next.config.js`
   - ✅ Kendi `.next` build output
   - ✅ Kendi webpack config

3. **Kendi Deployment**
   - ✅ Vercel project: `travel-ailydian-enterprise`
   - ✅ Production domain: `travel.ailydian.com`
   - ✅ Kendi environment variables
   - ✅ Kendi `.vercel` config

4. **Kendi Git Repository**
   - ✅ Ayrı git repository
   - ✅ Kendi commit history
   - ✅ Ayrı branch management

### 🚫 AILYDIAN-AGENT-ORCHESTRATOR İLE İLİŞKİ

```
❌ YANLIŞ ANLAMA:
"Bu proje AILYDIAN-AGENT-ORCHESTRATOR'ın alt projesi"
"Dashboard'dan kod import ediyoruz"
"AILYDIAN-AGENT-ORCHESTRATOR ile birlikte deploy edilir"

✅ DOĞRU ANLAMA:
"Bu proje TAMAMEN BAĞIMSIZ"
"AILYDIAN-AGENT-ORCHESTRATOR sadece backend logic reference"
"Deploy edilecek tek sistem: travel.ailydian.com"
```

### 🔧 Claude'un Deployment Davranışı

```bash
✅ DOĞRU:
"travel.ailydian.com'u deploy edelim"
"Bu standalone sistemi Vercel'e pushlayalım"
"travel.ailydian.com production'a hazır"
"git push origin main → Vercel otomatik deploy"

❌ YANLIŞ:
"AILYDIAN-AGENT-ORCHESTRATOR'ı deploy edelim"
"Dashboard ile birlikte deploy edelim"
"İki projeyi sync'leyelim"
```

### 📋 Deployment Checklist

Her deployment öncesi:

1. ✅ Working directory: `~/Desktop/projeler/travel.ailydian.com`
2. ✅ Git status clean
3. ✅ Build successful: `npm run build`
4. ✅ Tests pass (opsiyonel)
5. ✅ Commit & push: `git push origin main`
6. ✅ Vercel otomatik deploy başlar
7. ✅ Domain: https://travel.ailydian.com güncellenir

### 🌐 Production Endpoints

```
Primary: https://travel.ailydian.com
WWW: https://www.travel.ailydian.com
Vercel: https://travel-ailydian-enterprise-*.vercel.app
```

### 📊 Current Status

```
Project: travel-lydian-enterprise
Version: 2.0.0
Node: 20.x
Next.js: 15.5.9
React: 19.2.1
Status: ✅ Production Active
Pages: 1,338 static
```

---

## 🎯 ÖZET: BİR CÜMLEDE

**travel.ailydian.com TAM BAĞIMSIZ bir production sistemdir ve SADECE bu proje deploy edilir!**
