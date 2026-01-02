/**
 * i18n Translation Generator
 * Generates translation files for next-i18next from generated content
 */

import { GeneratedContent, Language } from './types';
import fs from 'fs/promises';
import path from 'path';

export class I18nGenerator {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  /**
   * Generate translation files for all languages
   */
  async generateTranslations(allContent: GeneratedContent[]): Promise<void> {
    // Group by language
    const byLanguage = new Map<Language, GeneratedContent[]>();
    for (const content of allContent) {
      if (!byLanguage.has(content.locale)) {
        byLanguage.set(content.locale, []);
      }
      byLanguage.get(content.locale)!.push(content);
    }

    // Generate translation file for each language
    for (const [locale, contents] of byLanguage) {
      await this.generateLanguageTranslations(locale, contents);
    }

    console.log(`\n✅ Generated translations for ${byLanguage.size} languages`);
  }

  /**
   * Generate translations for a specific language
   */
  private async generateLanguageTranslations(
    locale: Language,
    contents: GeneratedContent[]
  ): Promise<void> {
    const localeDir = path.join(this.outputDir, 'public', 'locales', locale);
    await fs.mkdir(localeDir, { recursive: true });

    // Group by category
    const byCategory = new Map<string, GeneratedContent[]>();
    for (const content of contents) {
      const category = this.getCategoryFromProductId(content.productId);
      if (!byCategory.has(category)) {
        byCategory.set(category, []);
      }
      byCategory.get(category)!.push(content);
    }

    // Generate translation file for each category
    for (const [category, categoryContents] of byCategory) {
      const translations = this.buildTranslationObject(categoryContents);
      const filePath = path.join(localeDir, `${category}.json`);
      await fs.writeFile(filePath, JSON.stringify(translations, null, 2));
    }

    // Generate common translations
    const commonTranslations = this.getCommonTranslations(locale);
    const commonPath = path.join(localeDir, 'common.json');
    await fs.writeFile(commonPath, JSON.stringify(commonTranslations, null, 2));
  }

  /**
   * Build translation object from contents
   */
  private buildTranslationObject(contents: GeneratedContent[]): Record<string, any> {
    const translations: Record<string, any> = {};

    for (const content of contents) {
      const key = this.getTranslationKey(content.productId);

      translations[key] = {
        title: content.title,
        description: content.description,
        longDescription: content.longDescription,
        highlights: content.highlights,
        included: content.included || [],
        excluded: content.excluded || [],
        seo: {
          metaTitle: content.seo.metaTitle,
          metaDescription: content.seo.metaDescription,
          keywords: content.seo.keywords
        }
      };

      // Add itinerary if exists
      if (content.itinerary && content.itinerary.length > 0) {
        translations[key].itinerary = content.itinerary;
      }

      // Add reviews if exists
      if (content.reviews && content.reviews.length > 0) {
        translations[key].reviews = content.reviews.map(r => ({
          author: r.author,
          rating: r.rating,
          date: r.date,
          title: r.title,
          text: r.text
        }));
      }
    }

    return translations;
  }

  /**
   * Get common translations for each language
   */
  private getCommonTranslations(locale: Language): Record<string, any> {
    const translations: Record<Language, Record<string, any>> = {
      tr: {
        navigation: {
          home: 'Ana Sayfa',
          tours: 'Turlar',
          hotels: 'Oteller',
          carRentals: 'Araç Kiralama',
          transfers: 'Transferler',
          rentals: 'Kiralık Evler',
          about: 'Hakkımızda',
          contact: 'İletişim'
        },
        common: {
          book: 'Rezervasyon Yap',
          viewDetails: 'Detayları Gör',
          addToCart: 'Sepete Ekle',
          from: 'den itibaren',
          perPerson: 'kişi başı',
          perDay: 'günlük',
          duration: 'Süre',
          rating: 'Puan',
          reviews: 'Değerlendirme',
          instantConfirmation: 'Anında Onay',
          freeCancellation: 'Ücretsiz İptal'
        },
        booking: {
          selectDate: 'Tarih Seçin',
          selectGuests: 'Misafir Sayısı',
          totalPrice: 'Toplam Fiyat',
          bookNow: 'Hemen Rezervasyon Yap',
          checkAvailability: 'Müsaitlik Kontrolü'
        },
        product: {
          included: 'Dahil Olanlar',
          excluded: 'Dahil Olmayanlar',
          highlights: 'Öne Çıkanlar',
          itinerary: 'Program',
          meetingPoint: 'Buluşma Noktası',
          cancellationPolicy: 'İptal Politikası',
          importantInfo: 'Önemli Bilgiler'
        }
      },
      en: {
        navigation: {
          home: 'Home',
          tours: 'Tours',
          hotels: 'Hotels',
          carRentals: 'Car Rentals',
          transfers: 'Transfers',
          rentals: 'Holiday Rentals',
          about: 'About',
          contact: 'Contact'
        },
        common: {
          book: 'Book Now',
          viewDetails: 'View Details',
          addToCart: 'Add to Cart',
          from: 'from',
          perPerson: 'per person',
          perDay: 'per day',
          duration: 'Duration',
          rating: 'Rating',
          reviews: 'Reviews',
          instantConfirmation: 'Instant Confirmation',
          freeCancellation: 'Free Cancellation'
        },
        booking: {
          selectDate: 'Select Date',
          selectGuests: 'Number of Guests',
          totalPrice: 'Total Price',
          bookNow: 'Book Now',
          checkAvailability: 'Check Availability'
        },
        product: {
          included: "What's Included",
          excluded: "What's Not Included",
          highlights: 'Highlights',
          itinerary: 'Itinerary',
          meetingPoint: 'Meeting Point',
          cancellationPolicy: 'Cancellation Policy',
          importantInfo: 'Important Information'
        }
      },
      de: {
        navigation: {
          home: 'Startseite',
          tours: 'Touren',
          hotels: 'Hotels',
          carRentals: 'Mietwagen',
          transfers: 'Transfers',
          rentals: 'Ferienwohnungen',
          about: 'Über uns',
          contact: 'Kontakt'
        },
        common: {
          book: 'Jetzt buchen',
          viewDetails: 'Details anzeigen',
          addToCart: 'In den Warenkorb',
          from: 'ab',
          perPerson: 'pro Person',
          perDay: 'pro Tag',
          duration: 'Dauer',
          rating: 'Bewertung',
          reviews: 'Bewertungen',
          instantConfirmation: 'Sofortige Bestätigung',
          freeCancellation: 'Kostenlose Stornierung'
        },
        booking: {
          selectDate: 'Datum wählen',
          selectGuests: 'Anzahl der Gäste',
          totalPrice: 'Gesamtpreis',
          bookNow: 'Jetzt buchen',
          checkAvailability: 'Verfügbarkeit prüfen'
        },
        product: {
          included: 'Inbegriffen',
          excluded: 'Nicht inbegriffen',
          highlights: 'Highlights',
          itinerary: 'Reiseverlauf',
          meetingPoint: 'Treffpunkt',
          cancellationPolicy: 'Stornierungsbedingungen',
          importantInfo: 'Wichtige Informationen'
        }
      },
      ru: {
        navigation: {
          home: 'Главная',
          tours: 'Туры',
          hotels: 'Отели',
          carRentals: 'Аренда авто',
          transfers: 'Трансферы',
          rentals: 'Аренда жилья',
          about: 'О нас',
          contact: 'Контакты'
        },
        common: {
          book: 'Забронировать',
          viewDetails: 'Подробнее',
          addToCart: 'В корзину',
          from: 'от',
          perPerson: 'с человека',
          perDay: 'в день',
          duration: 'Продолжительность',
          rating: 'Рейтинг',
          reviews: 'Отзывы',
          instantConfirmation: 'Мгновенное подтверждение',
          freeCancellation: 'Бесплатная отмена'
        },
        booking: {
          selectDate: 'Выберите дату',
          selectGuests: 'Количество гостей',
          totalPrice: 'Общая стоимость',
          bookNow: 'Забронировать сейчас',
          checkAvailability: 'Проверить наличие'
        },
        product: {
          included: 'Включено',
          excluded: 'Не включено',
          highlights: 'Особенности',
          itinerary: 'Маршрут',
          meetingPoint: 'Место встречи',
          cancellationPolicy: 'Политика отмены',
          importantInfo: 'Важная информация'
        }
      },
      ar: {
        navigation: {
          home: 'الرئيسية',
          tours: 'الجولات',
          hotels: 'الفنادق',
          carRentals: 'تأجير السيارات',
          transfers: 'النقل',
          rentals: 'الإيجارات',
          about: 'من نحن',
          contact: 'اتصل بنا'
        },
        common: {
          book: 'احجز الآن',
          viewDetails: 'عرض التفاصيل',
          addToCart: 'أضف إلى السلة',
          from: 'من',
          perPerson: 'لكل شخص',
          perDay: 'لكل يوم',
          duration: 'المدة',
          rating: 'التقييم',
          reviews: 'المراجعات',
          instantConfirmation: 'تأكيد فوري',
          freeCancellation: 'إلغاء مجاني'
        },
        booking: {
          selectDate: 'حدد التاريخ',
          selectGuests: 'عدد الضيوف',
          totalPrice: 'السعر الإجمالي',
          bookNow: 'احجز الآن',
          checkAvailability: 'تحقق من التوفر'
        },
        product: {
          included: 'ما يشمله',
          excluded: 'ما لا يشمله',
          highlights: 'أبرز الأحداث',
          itinerary: 'برنامج الرحلة',
          meetingPoint: 'نقطة اللقاء',
          cancellationPolicy: 'سياسة الإلغاء',
          importantInfo: 'معلومات مهمة'
        }
      },
      fa: {
        navigation: {
          home: 'خانه',
          tours: 'تورها',
          hotels: 'هتل‌ها',
          carRentals: 'اجاره خودرو',
          transfers: 'انتقالات',
          rentals: 'اجاره مسکن',
          about: 'درباره ما',
          contact: 'تماس با ما'
        },
        common: {
          book: 'رزرو کنید',
          viewDetails: 'جزئیات',
          addToCart: 'افزودن به سبد',
          from: 'از',
          perPerson: 'به ازای هر نفر',
          perDay: 'در روز',
          duration: 'مدت زمان',
          rating: 'امتیاز',
          reviews: 'نظرات',
          instantConfirmation: 'تایید فوری',
          freeCancellation: 'لغو رایگان'
        },
        booking: {
          selectDate: 'تاریخ را انتخاب کنید',
          selectGuests: 'تعداد مهمانان',
          totalPrice: 'قیمت کل',
          bookNow: 'همین الان رزرو کنید',
          checkAvailability: 'بررسی موجودی'
        },
        product: {
          included: 'شامل می‌شود',
          excluded: 'شامل نمی‌شود',
          highlights: 'نکات برجسته',
          itinerary: 'برنامه سفر',
          meetingPoint: 'نقطه ملاقات',
          cancellationPolicy: 'سیاست لغو',
          importantInfo: 'اطلاعات مهم'
        }
      },
      fr: {
        navigation: {
          home: 'Accueil',
          tours: 'Excursions',
          hotels: 'Hôtels',
          carRentals: 'Location de voiture',
          transfers: 'Transferts',
          rentals: 'Locations',
          about: 'À propos',
          contact: 'Contact'
        },
        common: {
          book: 'Réserver',
          viewDetails: 'Voir les détails',
          addToCart: 'Ajouter au panier',
          from: 'à partir de',
          perPerson: 'par personne',
          perDay: 'par jour',
          duration: 'Durée',
          rating: 'Note',
          reviews: 'Avis',
          instantConfirmation: 'Confirmation instantanée',
          freeCancellation: 'Annulation gratuite'
        },
        booking: {
          selectDate: 'Sélectionner la date',
          selectGuests: 'Nombre de personnes',
          totalPrice: 'Prix total',
          bookNow: 'Réserver maintenant',
          checkAvailability: 'Vérifier la disponibilité'
        },
        product: {
          included: 'Inclus',
          excluded: 'Non inclus',
          highlights: 'Points forts',
          itinerary: 'Itinéraire',
          meetingPoint: 'Point de rencontre',
          cancellationPolicy: 'Politique d\'annulation',
          importantInfo: 'Informations importantes'
        }
      },
      el: {
        navigation: {
          home: 'Αρχική',
          tours: 'Εκδρομές',
          hotels: 'Ξενοδοχεία',
          carRentals: 'Ενοικίαση αυτοκινήτων',
          transfers: 'Μεταφορές',
          rentals: 'Ενοικιάσεις',
          about: 'Σχετικά',
          contact: 'Επικοινωνία'
        },
        common: {
          book: 'Κράτηση',
          viewDetails: 'Προβολή λεπτομερειών',
          addToCart: 'Προσθήκη στο καλάθι',
          from: 'από',
          perPerson: 'ανά άτομο',
          perDay: 'ανά ημέρα',
          duration: 'Διάρκεια',
          rating: 'Βαθμολογία',
          reviews: 'Κριτικές',
          instantConfirmation: 'Άμεση επιβεβαίωση',
          freeCancellation: 'Δωρεάν ακύρωση'
        },
        booking: {
          selectDate: 'Επιλέξτε ημερομηνία',
          selectGuests: 'Αριθμός επισκεπτών',
          totalPrice: 'Συνολική τιμή',
          bookNow: 'Κάντε κράτηση τώρα',
          checkAvailability: 'Έλεγχος διαθεσιμότητας'
        },
        product: {
          included: 'Περιλαμβάνεται',
          excluded: 'Δεν περιλαμβάνεται',
          highlights: 'Κορυφαία σημεία',
          itinerary: 'Πρόγραμμα',
          meetingPoint: 'Σημείο συνάντησης',
          cancellationPolicy: 'Πολιτική ακύρωσης',
          importantInfo: 'Σημαντικές πληροφορίες'
        }
      }
    };

    return translations[locale] || translations.en;
  }

  /**
   * Helper methods
   */
  private getCategoryFromProductId(productId: string): string {
    const prefix = productId.split('-')[0];
    const categoryMap: Record<string, string> = {
      'tour': 'tours',
      'hotel': 'hotels',
      'car': 'car-rentals',
      'transfer': 'transfers',
      'rental': 'rentals'
    };
    return categoryMap[prefix] || 'products';
  }

  private getTranslationKey(productId: string): string {
    return productId.replace(/-/g, '_');
  }
}
