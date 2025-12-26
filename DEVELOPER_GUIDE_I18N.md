# Developer Quick Reference Guide
## Multi-Language System - travel.lydian.com

---

## 🚀 Quick Start

### Using Translations in Components

```typescript
import { useTranslation } from 'next-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('navigation.hotels')}</h1>
      <button>{t('booking.bookNow')}</button>
      <p>{t('seo.description')}</p>
    </div>
  );
}
```

### Adding getStaticProps to Pages

```typescript
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
};
```

### For Dynamic Routes

```typescript
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
};
```

---

## 📝 Adding New Translations

### 1. Add to ALL language files

Edit these files:
- `/public/locales/tr/common.json`
- `/public/locales/en/common.json`
- `/public/locales/de/common.json`
- `/public/locales/ru/common.json`
- `/public/locales/ar/common.json`
- `/public/locales/fa/common.json`
- `/public/locales/fr/common.json`

### 2. Example: Adding a new key

```json
{
  "yourSection": {
    "newKey": "Your Translation Here"
  }
}
```

### 3. Use in component

```typescript
const { t } = useTranslation('common');
<span>{t('yourSection.newKey')}</span>
```

---

## 🌍 Language Codes

| Code | Language | RTL |
|------|----------|-----|
| `tr` | Turkish | No |
| `en` | English | No |
| `de` | German | No |
| `ru` | Russian | No |
| `ar` | Arabic | Yes |
| `fa` | Persian | Yes |
| `fr` | French | No |

---

## 🔗 Routing Examples

### Link to localized pages

```typescript
import Link from 'next/link';

// Automatic locale routing
<Link href="/tours">
  <a>{t('navigation.tours')}</a>
</Link>

// Results in:
// /tr/tours (Turkish)
// /en/tours (English)
// etc.
```

### Programmatic navigation

```typescript
import { useRouter } from 'next/router';

const router = useRouter();
router.push('/hotels'); // Automatically uses current locale
```

### Change language programmatically

```typescript
const router = useRouter();
const { pathname, asPath, query } = router;

// Change to English
router.push({ pathname, query }, asPath, { locale: 'en' });
```

---

## 🎨 RTL Styling

### Automatic RTL Classes

For Arabic and Persian, these classes automatically adjust:

```css
/* LTR → RTL automatically */
.ml-4   → margin-right: 1rem
.mr-4   → margin-left: 1rem
.text-left → text-align: right
.text-right → text-align: left
```

### Manual RTL Control

```tsx
import { useRouter } from 'next/router';

function Component() {
  const router = useRouter();
  const isRTL = ['ar', 'fa'].includes(router.locale || 'tr');
  
  return (
    <div className={isRTL ? 'rtl-specific-class' : 'ltr-class'}>
      Content
    </div>
  );
}
```

---

## 🧪 Testing Languages Locally

```bash
# Start dev server
npm run dev

# Visit different languages:
http://localhost:3100/tr/tours   # Turkish
http://localhost:3100/en/tours   # English
http://localhost:3100/ar/tours   # Arabic (RTL)
http://localhost:3100/fa/tours   # Persian (RTL)
```

---

## 🔧 Common Tasks

### Get current language

```typescript
import { useRouter } from 'next/router';

const router = useRouter();
const currentLang = router.locale; // 'tr', 'en', 'de', etc.
```

### Get all available languages

```typescript
import { useRouter } from 'next/router';

const router = useRouter();
const languages = router.locales; // ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr']
```

### Check if RTL

```typescript
const isRTL = ['ar', 'fa'].includes(router.locale || 'tr');
```

### Translation with variables

```typescript
// In translation file:
{
  "welcome": "Welcome, {{name}}!"
}

// In component:
{t('welcome', { name: 'John' })}
// Result: "Welcome, John!"
```

### Pluralization

```typescript
// In translation file:
{
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}

// In component:
{t('items', { count: 1 })}  // "1 item"
{t('items', { count: 5 })}  // "5 items"
```

---

## 📊 Translation Keys Reference

### Navigation
```
navigation.home
navigation.hotels
navigation.tours
navigation.carRentals
navigation.transfers
navigation.rentals
navigation.favorites
navigation.cart
navigation.profile
navigation.help
```

### Booking
```
booking.bookNow
booking.checkAvailability
booking.reserve
booking.cancel
booking.confirmBooking
booking.totalPrice
booking.perNight
booking.perPerson
```

### Common
```
common.yes
common.no
common.ok
common.cancel
common.save
common.delete
common.edit
common.loading
common.error
common.success
```

### Search
```
search.placeholder
search.destination
search.checkIn
search.checkOut
search.guests
search.search
search.filters
```

---

## 🚨 Common Issues & Solutions

### Issue: Translation not showing

**Check:**
1. Key exists in translation file
2. Component has `useTranslation` hook
3. Page has `getStaticProps` with translations

### Issue: Language not switching

**Solution:**
```typescript
// Make sure LanguageSwitcher is imported and used
import LanguageSwitcher from '@/components/LanguageSwitcher';
```

### Issue: RTL not working

**Check:**
1. RTLWrapper is in _app.tsx
2. RTL CSS is loaded
3. Language is 'ar' or 'fa'

---

## 📦 Files to Know

### Configuration
- `/next-i18next.config.js` - Main config
- `/next.config.js` - Next.js config

### Components
- `/src/components/LanguageSwitcher.tsx` - Language selector
- `/src/components/RTLWrapper.tsx` - RTL handler
- `/src/components/layout/BookingHeader.tsx` - Header with switcher

### Translations
- `/public/locales/{lang}/common.json` - All translations

### Styles
- `/src/styles/globals.css` - RTL CSS rules

---

## 🎯 Best Practices

1. **Always use translation keys**, never hardcode text
2. **Add translations to ALL language files** when adding new keys
3. **Use semantic key names** (e.g., `booking.confirmButton` not `button1`)
4. **Group related translations** in sections
5. **Test RTL layouts** when adding new UI
6. **Keep translations short** for better mobile UX
7. **Use variables** for dynamic content
8. **Document custom translations** in code comments

---

## 📱 Mobile Considerations

- Language switcher is responsive
- RTL works on mobile
- Font sizes adjust automatically
- Touch targets are appropriate

---

## 🔐 SEO Considerations

Each page automatically gets:
- Hreflang tags for all languages
- Language-specific meta tags
- RTL meta tags for AR/FA
- Proper canonical URLs

---

## 🆘 Getting Help

1. Check `/I18N_IMPLEMENTATION_GUIDE.md`
2. Check `/TRANSLATION_STATUS.md`
3. Review next-i18next docs: https://github.com/i18next/next-i18next
4. Review i18next docs: https://www.i18next.com/

---

**Quick Command Reference:**

```bash
# Build project
npm run build

# Start dev server
npm run dev

# Check translation files
ls -la public/locales/*/common.json

# Count translation keys
cat public/locales/en/common.json | grep '"' | wc -l
```

---

**Happy Translating! 🌍**
