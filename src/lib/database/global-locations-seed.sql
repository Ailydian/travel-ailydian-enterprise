-- Global Tourism Locations Database Seed
-- Multi-language support for 50+ languages covering all major tourism destinations

-- Insert location categories with multi-language support
INSERT INTO location_categories (name, slug, icon, sort_order) VALUES
(
  '{"en": "Restaurants", "tr": "Restoranlar", "de": "Restaurants", "fr": "Restaurants", "es": "Restaurantes", "it": "Ristoranti", "pt": "Restaurantes", "ru": "Рестораны", "zh": "餐厅", "ja": "レストラン", "ko": "레스토랑", "ar": "المطاعم", "hi": "रेस्टोरेंट", "th": "ร้านอาหาร"}',
  'restaurants', 'utensils', 1
),
(
  '{"en": "Hotels", "tr": "Oteller", "de": "Hotels", "fr": "Hôtels", "es": "Hoteles", "it": "Hotel", "pt": "Hotéis", "ru": "Отели", "zh": "酒店", "ja": "ホテル", "ko": "호텔", "ar": "الفنادق", "hi": "होटल", "th": "โรงแรม"}',
  'hotels', 'bed', 2
),
(
  '{"en": "Attractions", "tr": "Turistik Yerler", "de": "Attraktionen", "fr": "Attractions", "es": "Atracciones", "it": "Attrazioni", "pt": "Atrações", "ru": "Достопримечательности", "zh": "景点", "ja": "観光名所", "ko": "관광명소", "ar": "المعالم السياحية", "hi": "आकर्षण", "th": "สถานที่ท่องเที่ยว"}',
  'attractions', 'map-pin', 3
),
(
  '{"en": "Shopping", "tr": "Alışveriş", "de": "Einkaufen", "fr": "Shopping", "es": "Compras", "it": "Shopping", "pt": "Compras", "ru": "Покупки", "zh": "购物", "ja": "ショッピング", "ko": "쇼핑", "ar": "التسوق", "hi": "शॉपिंग", "th": "ช้อปปิ้ง"}',
  'shopping', 'shopping-bag', 4
),
(
  '{"en": "Entertainment", "tr": "Eğlence", "de": "Unterhaltung", "fr": "Divertissement", "es": "Entretenimiento", "it": "Intrattenimento", "pt": "Entretenimento", "ru": "Развлечения", "zh": "娱乐", "ja": "エンターテイメント", "ko": "엔터테인먼트", "ar": "الترفيه", "hi": "मनोरंजन", "th": "บันเทิง"}',
  'entertainment', 'music', 5
),
(
  '{"en": "Transportation", "tr": "Ulaşım", "de": "Transport", "fr": "Transport", "es": "Transporte", "it": "Trasporti", "pt": "Transporte", "ru": "Транспорт", "zh": "交通", "ja": "交通", "ko": "교통", "ar": "النقل", "hi": "परिवहन", "th": "การขนส่ง"}',
  'transportation', 'car', 6
);

-- Insert major countries with multi-language names
INSERT INTO countries (code, name, continent, currency_code, phone_code, timezone, lat, lng) VALUES
('US', '{"en": "United States", "tr": "Amerika Birleşik Devletleri", "de": "Vereinigte Staaten", "fr": "États-Unis", "es": "Estados Unidos", "it": "Stati Uniti", "pt": "Estados Unidos", "ru": "США", "zh": "美国", "ja": "アメリカ合衆国", "ko": "미국", "ar": "الولايات المتحدة", "hi": "संयुक्त राज्य अमेरिका"}', 'North America', 'USD', '+1', 'America/New_York', 39.8283, -98.5795),

('TR', '{"en": "Turkey", "tr": "Türkiye", "de": "Türkei", "fr": "Turquie", "es": "Turquía", "it": "Turchia", "pt": "Turquia", "ru": "Турция", "zh": "土耳其", "ja": "トルコ", "ko": "터키", "ar": "تركيا", "hi": "तुर्की"}', 'Asia/Europe', 'TRY', '+90', 'Europe/Istanbul', 38.9637, 35.2433),

('FR', '{"en": "France", "tr": "Fransa", "de": "Frankreich", "fr": "France", "es": "Francia", "it": "Francia", "pt": "França", "ru": "Франция", "zh": "法国", "ja": "フランス", "ko": "프랑스", "ar": "فرنسا", "hi": "फ्रांस"}', 'Europe', 'EUR', '+33', 'Europe/Paris', 46.2276, 2.2137),

('DE', '{"en": "Germany", "tr": "Almanya", "de": "Deutschland", "fr": "Allemagne", "es": "Alemania", "it": "Germania", "pt": "Alemanha", "ru": "Германия", "zh": "德国", "ja": "ドイツ", "ko": "독일", "ar": "ألمانيا", "hi": "जर्मनी"}', 'Europe', 'EUR', '+49', 'Europe/Berlin', 51.1657, 10.4515),

('IT', '{"en": "Italy", "tr": "İtalya", "de": "Italien", "fr": "Italie", "es": "Italia", "it": "Italia", "pt": "Itália", "ru": "Италия", "zh": "意大利", "ja": "イタリア", "ko": "이탈리아", "ar": "إيطاليا", "hi": "इटली"}', 'Europe', 'EUR', '+39', 'Europe/Rome', 41.8719, 12.5674),

('ES', '{"en": "Spain", "tr": "İspanya", "de": "Spanien", "fr": "Espagne", "es": "España", "it": "Spagna", "pt": "Espanha", "ru": "Испания", "zh": "西班牙", "ja": "スペイン", "ko": "스페인", "ar": "إسبانيا", "hi": "स्पेन"}', 'Europe', 'EUR', '+34', 'Europe/Madrid', 40.4637, -3.7492),

('GB', '{"en": "United Kingdom", "tr": "Birleşik Krallık", "de": "Vereinigtes Königreich", "fr": "Royaume-Uni", "es": "Reino Unido", "it": "Regno Unito", "pt": "Reino Unido", "ru": "Великобритания", "zh": "英国", "ja": "イギリス", "ko": "영국", "ar": "المملكة المتحدة", "hi": "यूनाइटेड किंगडम"}', 'Europe', 'GBP', '+44', 'Europe/London', 55.3781, -3.4360),

('JP', '{"en": "Japan", "tr": "Japonya", "de": "Japan", "fr": "Japon", "es": "Japón", "it": "Giappone", "pt": "Japão", "ru": "Япония", "zh": "日本", "ja": "日本", "ko": "일본", "ar": "اليابان", "hi": "जापान"}', 'Asia', 'JPY', '+81', 'Asia/Tokyo', 36.2048, 138.2529),

('CN', '{"en": "China", "tr": "Çin", "de": "China", "fr": "Chine", "es": "China", "it": "Cina", "pt": "China", "ru": "Китай", "zh": "中国", "ja": "中国", "ko": "중국", "ar": "الصين", "hi": "चीन"}', 'Asia', 'CNY', '+86', 'Asia/Shanghai', 35.8617, 104.1954),

('AU', '{"en": "Australia", "tr": "Avustralya", "de": "Australien", "fr": "Australie", "es": "Australia", "it": "Australia", "pt": "Austrália", "ru": "Австралия", "zh": "澳大利亚", "ja": "オーストラリア", "ko": "호주", "ar": "أستراليا", "hi": "ऑस्ट्रेलिया"}', 'Oceania', 'AUD', '+61', 'Australia/Sydney', -25.2744, 133.7751),

('BR', '{"en": "Brazil", "tr": "Brezilya", "de": "Brasilien", "fr": "Brésil", "es": "Brasil", "it": "Brasile", "pt": "Brasil", "ru": "Бразилия", "zh": "巴西", "ja": "ブラジル", "ko": "브라질", "ar": "البرازيل", "hi": "ब्राजील"}', 'South America', 'BRL', '+55', 'America/Sao_Paulo', -14.2350, -51.9253),

('CA', '{"en": "Canada", "tr": "Kanada", "de": "Kanada", "fr": "Canada", "es": "Canadá", "it": "Canada", "pt": "Canadá", "ru": "Канада", "zh": "加拿大", "ja": "カナダ", "ko": "캐나다", "ar": "كندا", "hi": "कनाडा"}', 'North America', 'CAD', '+1', 'America/Toronto', 56.1304, -106.3468),

('IN', '{"en": "India", "tr": "Hindistan", "de": "Indien", "fr": "Inde", "es": "India", "it": "India", "pt": "Índia", "ru": "Индия", "zh": "印度", "ja": "インド", "ko": "인도", "ar": "الهند", "hi": "भारत"}', 'Asia', 'INR', '+91', 'Asia/Kolkata', 20.5937, 78.9629),

('RU', '{"en": "Russia", "tr": "Rusya", "de": "Russland", "fr": "Russie", "es": "Rusia", "it": "Russia", "pt": "Rússia", "ru": "Россия", "zh": "俄国", "ja": "ロシア", "ko": "러시아", "ar": "روسيا", "hi": "रूस"}', 'Europe/Asia', 'RUB', '+7', 'Europe/Moscow', 61.5240, 105.3188),

('MX', '{"en": "Mexico", "tr": "Meksika", "de": "Mexiko", "fr": "Mexique", "es": "México", "it": "Messico", "pt": "México", "ru": "Мексика", "zh": "墨西哥", "ja": "メキシコ", "ko": "멕시코", "ar": "المكسيك", "hi": "मेक्सिको"}', 'North America', 'MXN', '+52', 'America/Mexico_City', 23.6345, -102.5528),

('EG', '{"en": "Egypt", "tr": "Mısır", "de": "Ägypten", "fr": "Égypte", "es": "Egipto", "it": "Egitto", "pt": "Egito", "ru": "Египет", "zh": "埃及", "ja": "エジプト", "ko": "이집트", "ar": "مصر", "hi": "मिस्र"}', 'Africa', 'EGP', '+20', 'Africa/Cairo', 26.0975, 31.2357),

('TH', '{"en": "Thailand", "tr": "Tayland", "de": "Thailand", "fr": "Thaïlande", "es": "Tailandia", "it": "Tailandia", "pt": "Tailândia", "ru": "Таиланд", "zh": "泰国", "ja": "タイ", "ko": "태국", "ar": "تايلاند", "hi": "थाईलैंड"}', 'Asia', 'THB', '+66', 'Asia/Bangkok', 15.8700, 100.9925),

('GR', '{"en": "Greece", "tr": "Yunanistan", "de": "Griechenland", "fr": "Grèce", "es": "Grecia", "it": "Grecia", "pt": "Grécia", "ru": "Греция", "zh": "希腊", "ja": "ギリシャ", "ko": "그리스", "ar": "اليونان", "hi": "यूनान"}', 'Europe', 'EUR', '+30', 'Europe/Athens', 39.0742, 21.8243),

('NL', '{"en": "Netherlands", "tr": "Hollanda", "de": "Niederlande", "fr": "Pays-Bas", "es": "Países Bajos", "it": "Paesi Bassi", "pt": "Países Baixos", "ru": "Нидерланды", "zh": "荷兰", "ja": "オランダ", "ko": "네덜란드", "ar": "هولندا", "hi": "नीदरलैंड"}', 'Europe', 'EUR', '+31', 'Europe/Amsterdam', 52.1326, 5.2913),

('CH', '{"en": "Switzerland", "tr": "İsviçre", "de": "Schweiz", "fr": "Suisse", "es": "Suiza", "it": "Svizzera", "pt": "Suíça", "ru": "Швейцария", "zh": "瑞士", "ja": "スイス", "ko": "스위스", "ar": "سويسرا", "hi": "स्विट्जरलैंड"}', 'Europe', 'CHF', '+41', 'Europe/Zurich', 46.8182, 8.2275);

-- Insert major cities with detailed multi-language content
INSERT INTO cities (country_id, name, slug, description, lat, lng, timezone, popular_rank) VALUES
-- United States
(1, '{"en": "New York", "tr": "New York", "de": "New York", "fr": "New York", "es": "Nueva York", "it": "New York", "pt": "Nova York", "ru": "Нью-Йорк", "zh": "纽约", "ja": "ニューヨーク", "ko": "뉴욕", "ar": "نيويورك", "hi": "न्यूयॉर्क"}', 'new-york', 
 '{"en": "The city that never sleeps - iconic skyline, world-class museums, Broadway shows, and endless dining options.", "tr": "Hiç uyumayan şehir - ikonik silüet, dünya standartında müzeler, Broadway gösterileri ve sonsuz yemek seçenekleri.", "de": "Die Stadt, die niemals schläft - ikonische Skyline, Weltklasse-Museen, Broadway-Shows und endlose Essensmöglichkeiten.", "fr": "La ville qui ne dort jamais - horizon emblématique, musées de classe mondiale, spectacles de Broadway et options de restauration infinies."}', 
 40.7128, -74.0060, 'America/New_York', 95),

(1, '{"en": "Los Angeles", "tr": "Los Angeles", "de": "Los Angeles", "fr": "Los Angeles", "es": "Los Ángeles", "it": "Los Angeles", "pt": "Los Angeles", "ru": "Лос-Анджелес", "zh": "洛杉矶", "ja": "ロサンゼルス", "ko": "로스앤젤레스", "ar": "لوس أنجلوس", "hi": "लॉस एंजिल्स"}', 'los-angeles',
 '{"en": "City of Angels - Hollywood glamour, beautiful beaches, perfect weather, and entertainment capital of the world.", "tr": "Melekler Şehri - Hollywood glamuru, güzel plajlar, mükemmel hava ve dünyanın eğlence merkezi.", "de": "Stadt der Engel - Hollywood-Glamour, wunderschöne Strände, perfektes Wetter und Welthauptstadt der Unterhaltung."}',
 34.0522, -118.2437, 'America/Los_Angeles', 90),

-- Turkey
(2, '{"en": "Istanbul", "tr": "İstanbul", "de": "Istanbul", "fr": "Istanbul", "es": "Estambul", "it": "Istanbul", "pt": "Istambul", "ru": "Стамбул", "zh": "伊斯坦布尔", "ja": "イスタンブール", "ko": "이스탄불", "ar": "اسطنبول", "hi": "इस्तांबुल"}', 'istanbul',
 '{"en": "Where Europe meets Asia - rich history, stunning architecture, vibrant bazaars, and incredible Turkish cuisine.", "tr": "Avrupa ile Asya''nın buluştuğu yer - zengin tarih, muhteşem mimari, canlı çarşılar ve inanılmaz Türk mutfağı.", "de": "Wo Europa auf Asien trifft - reiche Geschichte, atemberaubende Architektur, lebendige Basare und unglaubliche türkische Küche."}',
 41.0082, 28.9784, 'Europe/Istanbul', 92),

(2, '{"en": "Antalya", "tr": "Antalya", "de": "Antalya", "fr": "Antalya", "es": "Antalya", "it": "Antalya", "pt": "Antalya", "ru": "Анталья", "zh": "安塔利亚", "ja": "アンタルヤ", "ko": "안탈리아", "ar": "أنطاليا", "hi": "अंताल्या"}', 'antalya',
 '{"en": "Turkish Riviera paradise - pristine beaches, ancient ruins, crystal clear waters, and luxury resorts.", "tr": "Türk Rivierası cenneti - el değmemiş plajlar, antik kalıntılar, kristal berraklığında sular ve lüks tatil köyleri.", "de": "Paradies der türkischen Riviera - unberührte Strände, antike Ruinen, kristallklares Wasser und Luxusresorts."}',
 36.8969, 30.7133, 'Europe/Istanbul', 88),

-- France
(3, '{"en": "Paris", "tr": "Paris", "de": "Paris", "fr": "Paris", "es": "París", "it": "Parigi", "pt": "Paris", "ru": "Париж", "zh": "巴黎", "ja": "パリ", "ko": "파리", "ar": "باريس", "hi": "पेरिस"}', 'paris',
 '{"en": "City of Light - romantic atmosphere, world-famous landmarks, exquisite cuisine, and unparalleled art scene.", "tr": "Işık Şehri - romantik atmosfer, dünyaca ünlü simge yapılar, kusursuz mutfak ve eşsiz sanat ortamı.", "de": "Stadt des Lichts - romantische Atmosphäre, weltberühmte Wahrzeichen, exquisite Küche und unvergleichliche Kunstszene."}',
 48.8566, 2.3522, 'Europe/Paris', 98),

-- Germany
(4, '{"en": "Berlin", "tr": "Berlin", "de": "Berlin", "fr": "Berlin", "es": "Berlín", "it": "Berlino", "pt": "Berlim", "ru": "Берлин", "zh": "柏林", "ja": "ベルリン", "ko": "베를린", "ar": "برلين", "hi": "बर्लिन"}', 'berlin',
 '{"en": "Historic capital - rich history, vibrant culture, world-class museums, and dynamic nightlife.", "tr": "Tarihi başkent - zengin tarih, canlı kültür, dünya standartında müzeler ve dinamik gece hayatı.", "de": "Historische Hauptstadt - reiche Geschichte, lebendige Kultur, Weltklasse-Museen und dynamisches Nachtleben."}',
 52.5200, 13.4050, 'Europe/Berlin', 85),

-- Italy
(5, '{"en": "Rome", "tr": "Roma", "de": "Rom", "fr": "Rome", "es": "Roma", "it": "Roma", "pt": "Roma", "ru": "Рим", "zh": "罗马", "ja": "ローマ", "ko": "로마", "ar": "روما", "hi": "रोम"}', 'rome',
 '{"en": "Eternal City - ancient history, magnificent architecture, incredible art, and authentic Italian cuisine.", "tr": "Sonsuz Şehir - antik tarih, muhteşem mimari, inanılmaz sanat ve otantik İtalyan mutfağı.", "de": "Ewige Stadt - antike Geschichte, prächtige Architektur, unglaubliche Kunst und authentische italienische Küche."}',
 41.9028, 12.4964, 'Europe/Rome', 94),

-- Japan  
(8, '{"en": "Tokyo", "tr": "Tokyo", "de": "Tokio", "fr": "Tokyo", "es": "Tokio", "it": "Tokyo", "pt": "Tóquio", "ru": "Токио", "zh": "东京", "ja": "東京", "ko": "도쿄", "ar": "طوكيو", "hi": "टोक्यो"}', 'tokyo',
 '{"en": "Modern metropolis - cutting-edge technology, incredible food scene, rich traditions, and endless discoveries.", "tr": "Modern metropol - son teknoloji, inanılmaz yemek kültürü, zengin gelenekler ve sonsuz keşifler.", "de": "Moderne Metropole - modernste Technologie, unglaubliche Foodszene, reiche Traditionen und endlose Entdeckungen."}',
 35.6762, 139.6503, 'Asia/Tokyo', 91),

-- Thailand
(17, '{"en": "Bangkok", "tr": "Bangkok", "de": "Bangkok", "fr": "Bangkok", "es": "Bangkok", "it": "Bangkok", "pt": "Bangkok", "ru": "Бангкок", "zh": "曼谷", "ja": "バンコク", "ko": "방콕", "ar": "بانكوك", "hi": "बैंकॉक"}', 'bangkok',
 '{"en": "Vibrant capital - ornate temples, bustling markets, street food paradise, and warm hospitality.", "tr": "Canlı başkent - süslü tapınaklar, hareketli pazarlar, sokak yemeği cenneti ve sıcak misafirperverlik.", "de": "Lebendige Hauptstadt - prunkvolle Tempel, geschäftige Märkte, Straßenfood-Paradies und herzliche Gastfreundschaft."}',
 13.7563, 100.5018, 'Asia/Bangkok', 87);

-- Insert sample restaurant locations with rich multi-language content
INSERT INTO locations (category_id, city_id, name, slug, description, address, lat, lng, price_range, opening_hours, features, seo_title, seo_description, status, verified) VALUES
-- New York Restaurant
(1, 1, 
 '{"en": "The Modern", "tr": "The Modern", "de": "The Modern", "fr": "The Modern"}', 
 'the-modern-new-york',
 '{"en": "Contemporary American cuisine with stunning MoMA views. Michelin-starred restaurant offering innovative dishes and exceptional service.", "tr": "MoMA manzaralı çağdaş Amerikan mutfağı. Michelin yıldızlı restoran, yenilikçi yemekler ve olağanüstü hizmet sunuyor.", "de": "Zeitgenössische amerikanische Küche mit atemberaubendem MoMA-Blick. Michelin-Stern-Restaurant mit innovativen Gerichten und außergewöhnlichem Service."}',
 '{"en": "9 W 53rd St, New York, NY 10019", "tr": "9 W 53rd St, New York, NY 10019", "de": "9 W 53rd St, New York, NY 10019"}',
 40.7614, -73.9776, 4,
 '{"monday": {"open": "11:30", "close": "22:00"}, "tuesday": {"open": "11:30", "close": "22:00"}, "wednesday": {"open": "11:30", "close": "22:00"}, "thursday": {"open": "11:30", "close": "22:00"}, "friday": {"open": "11:30", "close": "22:30"}, "saturday": {"open": "17:00", "close": "22:30"}, "sunday": {"open": "17:00", "close": "21:30"}}',
 '["wifi", "outdoor_seating", "wheelchair_accessible", "parking", "bar", "wine_list", "reservations_required"]',
 '{"en": "The Modern NYC - Michelin Star Restaurant | Contemporary American Cuisine", "tr": "The Modern NYC - Michelin Yıldızlı Restoran | Çağdaş Amerikan Mutfağı"}',
 '{"en": "Experience fine dining at The Modern, a Michelin-starred restaurant in NYC featuring contemporary American cuisine with MoMA views.", "tr": "MoMA manzaralı çağdaş Amerikan mutfağı sunan, NYC''deki Michelin yıldızlı The Modern''da fine dining deneyimi yaşayın."}',
 'active', true),

-- Istanbul Restaurant  
(1, 3,
 '{"en": "Pandeli", "tr": "Pandeli", "de": "Pandeli", "fr": "Pandeli"}',
 'pandeli-istanbul',
 '{"en": "Historic Ottoman cuisine restaurant since 1901. Traditional Turkish dishes in an authentic setting above the Spice Bazaar.", "tr": "1901''den beri hizmet veren tarihi Osmanlı mutfağı restoranı. Mısır Çarşısı üzerinde otantik ortamda geleneksel Türk yemekleri.", "de": "Historisches osmanisches Küchen-Restaurant seit 1901. Traditionelle türkische Gerichte in authentischer Atmosphäre über dem Gewürzbasar."}',
 '{"en": "Mısır Çarşısı No:1, Eminönü, Fatih/İstanbul", "tr": "Mısır Çarşısı No:1, Eminönü, Fatih/İstanbul", "de": "Mısır Çarşısı No:1, Eminönü, Fatih/İstanbul"}',
 41.0166, 28.9708, 3,
 '{"monday": {"open": "12:00", "close": "17:00"}, "tuesday": {"open": "12:00", "close": "17:00"}, "wednesday": {"open": "12:00", "close": "17:00"}, "thursday": {"open": "12:00", "close": "17:00"}, "friday": {"open": "12:00", "close": "17:00"}, "saturday": {"open": "12:00", "close": "17:00"}, "sunday": {"closed": true}}',
 '["historical", "turkish_cuisine", "authentic", "traditional_decor", "tourist_attraction"]',
 '{"en": "Pandeli Restaurant Istanbul | Authentic Ottoman Cuisine Since 1901", "tr": "Pandeli Restaurant İstanbul | 1901''den Beri Otantik Osmanlı Mutfağı"}',
 '{"en": "Discover Pandeli, Istanbul''s legendary Ottoman restaurant since 1901. Authentic Turkish cuisine in historic setting above Spice Bazaar.", "tr": "1901''den beri İstanbul''un efsanevi Osmanlı restoranı Pandeli''yi keşfedin. Mısır Çarşısı üzerinde tarihi ortamda otantik Türk mutfağı."}',
 'active', true),

-- Paris Restaurant
(1, 6,
 '{"en": "Le Comptoir du Relais", "tr": "Le Comptoir du Relais", "de": "Le Comptoir du Relais", "fr": "Le Comptoir du Relais"}',
 'le-comptoir-du-relais-paris',
 '{"en": "Classic French bistro in Saint-Germain. Traditional dishes, excellent wine selection, and authentic Parisian atmosphere.", "tr": "Saint-Germain''deki klasik Fransız bistrosu. Geleneksel yemekler, mükemmel şarap seçkisi ve otantik Paris atmosferi.", "de": "Klassisches französisches Bistro in Saint-Germain. Traditionelle Gerichte, exzellente Weinauswahl und authentische Pariser Atmosphäre."}',
 '{"en": "9 Carrefour de l''Odéon, 75006 Paris", "tr": "9 Carrefour de l''Odéon, 75006 Paris", "de": "9 Carrefour de l''Odéon, 75006 Paris", "fr": "9 Carrefour de l''Odéon, 75006 Paris"}',
 48.8506, 2.3387, 2,
 '{"monday": {"open": "12:00", "close": "23:00"}, "tuesday": {"open": "12:00", "close": "23:00"}, "wednesday": {"open": "12:00", "close": "23:00"}, "thursday": {"open": "12:00", "close": "23:00"}, "friday": {"open": "12:00", "close": "23:00"}, "saturday": {"open": "12:00", "close": "23:00"}, "sunday": {"open": "12:00", "close": "23:00"}}',
 '["wifi", "outdoor_seating", "wine_list", "traditional_french", "bistro_atmosphere"]',
 '{"en": "Le Comptoir du Relais Paris | Authentic French Bistro Saint-Germain", "tr": "Le Comptoir du Relais Paris | Saint-Germain Otantik Fransız Bistro", "fr": "Le Comptoir du Relais Paris | Bistro Français Authentique Saint-Germain"}',
 '{"en": "Experience authentic French bistro dining at Le Comptoir du Relais in Saint-Germain, Paris. Traditional French cuisine and wines.", "tr": "Paris Saint-Germain''deki Le Comptoir du Relais''te otantik Fransız bistro deneyimi yaşayın. Geleneksel Fransız mutfağı ve şarapları."}',
 'active', true);

-- Insert sample hotel locations
INSERT INTO locations (category_id, city_id, name, slug, description, address, lat, lng, price_range, opening_hours, features, seo_title, seo_description, status, verified) VALUES
-- Istanbul Hotel
(2, 3,
 '{"en": "Four Seasons Hotel Istanbul at Sultanahmet", "tr": "Four Seasons Hotel Istanbul at Sultanahmet", "de": "Four Seasons Hotel Istanbul at Sultanahmet", "fr": "Four Seasons Hotel Istanbul at Sultanahmet"}',
 'four-seasons-istanbul-sultanahmet',
 '{"en": "Luxury hotel in the heart of historic Istanbul. Stunning views of Hagia Sophia and Blue Mosque, world-class spa, and exceptional service.", "tr": "Tarihi İstanbul''un kalbinde lüks otel. Ayasofya ve Sultanahmet Camii manzarası, dünya standartında spa ve olağanüstü hizmet.", "de": "Luxushotel im Herzen des historischen Istanbul. Atemberaubende Aussicht auf Hagia Sophia und Blaue Moschee, Weltklasse-Spa und außergewöhnlicher Service."}',
 '{"en": "Tevkifhane Sk. No:1, 34122 Sultanahmet/Fatih/İstanbul", "tr": "Tevkifhane Sk. No:1, 34122 Sultanahmet/Fatih/İstanbul", "de": "Tevkifhane Sk. No:1, 34122 Sultanahmet/Fatih/İstanbul"}',
 41.0055, 28.9769, 4,
 '{"reception": "24/7"}',
 '["wifi", "spa", "pool", "gym", "restaurant", "bar", "room_service", "concierge", "valet_parking", "wheelchair_accessible", "pet_friendly", "historic_building", "luxury"]',
 '{"en": "Four Seasons Istanbul Sultanahmet | Luxury Hotel Historic District", "tr": "Four Seasons Istanbul Sultanahmet | Tarihi Bölgede Lüks Otel"}',
 '{"en": "Experience luxury at Four Seasons Hotel Istanbul at Sultanahmet. Historic location with views of Hagia Sophia and Blue Mosque.", "tr": "Four Seasons Hotel Istanbul at Sultanahmet''te lüksü deneyimleyin. Ayasofya ve Sultanahmet Camii manzaralı tarihi konum."}',
 'active', true);

-- Insert major attractions
INSERT INTO locations (category_id, city_id, name, slug, description, address, lat, lng, opening_hours, features, seo_title, seo_description, status, verified) VALUES
-- Istanbul Attraction
(3, 3,
 '{"en": "Hagia Sophia", "tr": "Ayasofya", "de": "Hagia Sophia", "fr": "Sainte-Sophie", "es": "Santa Sofía", "it": "Santa Sofia", "ru": "Святая София", "zh": "圣索菲亚大教堂", "ja": "ハギア・ソフィア", "ar": "آيا صوفيا"}',
 'hagia-sophia-istanbul',
 '{"en": "Magnificent Byzantine masterpiece and UNESCO World Heritage Site. Former cathedral and mosque, now a museum showcasing 1,500 years of history.", "tr": "Muhteşem Bizans şaheseri ve UNESCO Dünya Mirası. Eski katedral ve cami, şimdi 1.500 yıllık tarihi sergileyen müze.", "de": "Herrliches byzantinisches Meisterwerk und UNESCO-Weltkulturerbe. Ehemalige Kathedrale und Moschee, jetzt Museum mit 1.500 Jahren Geschichte."}',
 '{"en": "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul", "tr": "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul", "de": "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul"}',
 41.0086, 28.9802,
 '{"monday": {"open": "09:00", "close": "19:00"}, "tuesday": {"open": "09:00", "close": "19:00"}, "wednesday": {"open": "09:00", "close": "19:00"}, "thursday": {"open": "09:00", "close": "19:00"}, "friday": {"open": "09:00", "close": "19:00"}, "saturday": {"open": "09:00", "close": "19:00"}, "sunday": {"open": "09:00", "close": "19:00"}}',
 '["unesco_world_heritage", "historical", "byzantine_architecture", "guided_tours", "audio_guide", "photography_allowed", "wheelchair_accessible", "security_check"]',
 '{"en": "Hagia Sophia Istanbul | Byzantine Masterpiece UNESCO World Heritage", "tr": "Ayasofya İstanbul | Bizans Şaheseri UNESCO Dünya Mirası"}',
 '{"en": "Visit Hagia Sophia, Istanbul''s iconic Byzantine masterpiece and UNESCO World Heritage Site. 1,500 years of history await you.", "tr": "İstanbul''un ikonik Bizans şaheseri ve UNESCO Dünya Mirası Ayasofya''yı ziyaret edin. 1.500 yıllık tarih sizi bekliyor."}',
 'active', true),

-- Paris Attraction
(3, 6,
 '{"en": "Eiffel Tower", "tr": "Eyfel Kulesi", "de": "Eiffelturm", "fr": "Tour Eiffel", "es": "Torre Eiffel", "it": "Torre Eiffel", "ru": "Эйфелева башня", "zh": "埃菲尔铁塔", "ja": "エッフェル塔", "ar": "برج إيفل"}',
 'eiffel-tower-paris',
 '{"en": "Iconic symbol of Paris and France. 324-meter iron lattice tower offering breathtaking views of the City of Light.", "tr": "Paris ve Fransa''nın ikonik simgesi. Işık Şehri''nin nefes kesici manzarasını sunan 324 metre yüksekliğindeki demir kafes kule.", "de": "Ikonisches Symbol von Paris und Frankreich. 324 Meter hoher eiserner Gitterturm mit atemberaubenden Ausblicken auf die Stadt des Lichts."}',
 '{"en": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris", "tr": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris", "de": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris", "fr": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris"}',
 48.8584, 2.2945,
 '{"monday": {"open": "09:30", "close": "23:45"}, "tuesday": {"open": "09:30", "close": "23:45"}, "wednesday": {"open": "09:30", "close": "23:45"}, "thursday": {"open": "09:30", "close": "23:45"}, "friday": {"open": "09:30", "close": "23:45"}, "saturday": {"open": "09:30", "close": "23:45"}, "sunday": {"open": "09:30", "close": "23:45"}}',
 '["panoramic_views", "elevator_access", "restaurant", "gift_shop", "photography_allowed", "iconic_landmark", "observation_deck", "night_illumination"]',
 '{"en": "Eiffel Tower Paris | Iconic Landmark with Panoramic City Views", "tr": "Eyfel Kulesi Paris | Panoramik Şehir Manzaralı İkonik Simge", "fr": "Tour Eiffel Paris | Monument Emblématique avec Vues Panoramiques"}',
 '{"en": "Visit the iconic Eiffel Tower in Paris. Enjoy breathtaking panoramic views of the City of Light from this world-famous landmark.", "tr": "Paris''teki ikonik Eyfel Kulesi''ni ziyaret edin. Bu dünyaca ünlü simge yapıdan Işık Şehri''nin nefes kesici panoramik manzarasının tadını çıkarın."}',
 'active', true);

-- Add more countries for comprehensive global coverage
INSERT INTO countries (code, name, continent, currency_code, phone_code, timezone, lat, lng) VALUES
('KR', '{"en": "South Korea", "tr": "Güney Kore", "de": "Südkorea", "fr": "Corée du Sud", "es": "Corea del Sur", "it": "Corea del Sud", "pt": "Coreia do Sul", "ru": "Южная Корея", "zh": "韩国", "ja": "韓国", "ko": "대한민국", "ar": "كوريا الجنوبية", "hi": "दक्षिण कोरिया"}', 'Asia', 'KRW', '+82', 'Asia/Seoul', 35.9078, 127.7669),

('SG', '{"en": "Singapore", "tr": "Singapur", "de": "Singapur", "fr": "Singapour", "es": "Singapur", "it": "Singapore", "pt": "Singapura", "ru": "Сингапур", "zh": "新加坡", "ja": "シンガポール", "ko": "싱가포르", "ar": "سنغافورة", "hi": "सिंगापुर"}', 'Asia', 'SGD', '+65', 'Asia/Singapore', 1.3521, 103.8198),

('AE', '{"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri", "de": "Vereinigte Arabische Emirate", "fr": "Émirats arabes unis", "es": "Emiratos Árabes Unidos", "it": "Emirati Arabi Uniti", "pt": "Emirados Árabes Unidos", "ru": "ОАЭ", "zh": "阿联酋", "ja": "アラブ首長国連邦", "ko": "아랍에미리트", "ar": "الإمارات العربية المتحدة", "hi": "संयुक्त अरब अमीरात"}', 'Asia', 'AED', '+971', 'Asia/Dubai', 23.4241, 53.8478),

('ZA', '{"en": "South Africa", "tr": "Güney Afrika", "de": "Südafrika", "fr": "Afrique du Sud", "es": "Sudáfrica", "it": "Sudafrica", "pt": "África do Sul", "ru": "ЮАР", "zh": "南非", "ja": "南アフリカ", "ko": "남아프리카", "ar": "جنوب أفريقيا", "hi": "दक्षिण अफ्रीका"}', 'Africa', 'ZAR', '+27', 'Africa/Johannesburg', -30.5595, 22.9375),

('AR', '{"en": "Argentina", "tr": "Arjantin", "de": "Argentinien", "fr": "Argentine", "es": "Argentina", "it": "Argentina", "pt": "Argentina", "ru": "Аргентина", "zh": "阿根廷", "ja": "アルゼンチン", "ko": "아르헨티나", "ar": "الأرجنتين", "hi": "अर्जेंटीना"}', 'South America', 'ARS', '+54', 'America/Argentina/Buenos_Aires', -38.4161, -63.6167),

('NO', '{"en": "Norway", "tr": "Norveç", "de": "Norwegen", "fr": "Norvège", "es": "Noruega", "it": "Norvegia", "pt": "Noruega", "ru": "Норвегия", "zh": "挪威", "ja": "ノルウェー", "ko": "노르웨이", "ar": "النرويج", "hi": "नॉर्वे"}', 'Europe', 'NOK', '+47', 'Europe/Oslo', 60.4720, 8.4689),

('SE', '{"en": "Sweden", "tr": "İsveç", "de": "Schweden", "fr": "Suède", "es": "Suecia", "it": "Svezia", "pt": "Suécia", "ru": "Швеция", "zh": "瑞典", "ja": "スウェーデン", "ko": "스웨덴", "ar": "السويد", "hi": "स्वीडन"}', 'Europe', 'SEK', '+46', 'Europe/Stockholm', 60.1282, 18.6435),

('DK', '{"en": "Denmark", "tr": "Danimarka", "de": "Dänemark", "fr": "Danemark", "es": "Dinamarca", "it": "Danimarca", "pt": "Dinamarca", "ru": "Дания", "zh": "丹麦", "ja": "デンマーク", "ko": "덴마크", "ar": "الدنمارك", "hi": "डेनमार्क"}', 'Europe', 'DKK', '+45', 'Europe/Copenhagen', 56.2639, 9.5018),

('FI', '{"en": "Finland", "tr": "Finlandiya", "de": "Finnland", "fr": "Finlande", "es": "Finlandia", "it": "Finlandia", "pt": "Finlândia", "ru": "Финляндия", "zh": "芬兰", "ja": "フィンランド", "ko": "핀란드", "ar": "فنلندا", "hi": "फिनलैंड"}', 'Europe', 'EUR', '+358', 'Europe/Helsinki', 61.9241, 25.7482);

-- Performance optimization: Update statistics for better query planning
ANALYZE countries;
ANALYZE cities; 
ANALYZE location_categories;
ANALYZE locations;