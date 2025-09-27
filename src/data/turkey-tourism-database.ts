// Türkiye'nin Tüm Turizm Bölgeleri ve İlleri Kapsamlı Veritabanı
// Comprehensive Tourism Database for All Turkish Cities and Regions

export interface TourismRegionData {
  region: string;
  cities?: string[];
  highlights: string[];
  attractions: string[];
  cuisine: string[];
  hotels?: string[];
  activities: string[];
  bestTime: string;
  climate: string;
  specialties: string[];
}

export const COMPLETE_TURKEY_TOURISM_DATABASE: Record<string, TourismRegionData> = {
  // MARMARA BÖLGESİ
  'Istanbul': {
    region: 'Marmara',
    highlights: ['Sultanahmet', 'Galata', 'Bosphorus', 'Beyoğlu', 'Kadıköy', 'Üsküdar', 'Beşiktaş'],
    attractions: ['Ayasofya', 'Sultanahmet Camii', 'Topkapı Sarayı', 'Kapalıçarşı', 'Galata Kulesi', 'Boğaz Turu', 'Dolmabahçe Sarayı', 'Basilica Cistern'],
    cuisine: ['İstanbul Kebabı', 'Balık Ekmek', 'Künefe', 'Lokum', 'Baklava', 'Döner', 'Midye Dolma'],
    activities: ['Boğaz Turu', 'Müze Gezileri', 'Alışveriş', 'Gece Hayatı', 'Tekne Turları', 'Walking Tours'],
    bestTime: 'Nisan-Haziran, Eylül-Kasım',
    climate: 'Ilıman Okyanus İklimi',
    specialties: ['Kültür Turizmi', 'Şehir Turizmi', 'Alışveriş Turizmi', 'Gastronomik Turizm']
  },
  
  'Bursa': {
    region: 'Marmara',
    highlights: ['Osmangazi', 'Nilüfer', 'Uludağ', 'Cumalıkızık', 'Mudanya'],
    attractions: ['Yeşil Türbe', 'Ulu Cami', 'Kapalı Çarşı', 'Uludağ Kayak Merkezi', 'İznik Gölü', 'Cumalıkızık Köyü'],
    cuisine: ['İskender Kebab', 'Candied Chestnut', 'Bursa Kebabı', 'Pide', 'Lokum'],
    activities: ['Kayak', 'Kaplıca', 'Tarihi Yerler', 'Doğa Yürüyüşü', 'Kültür Turu'],
    bestTime: 'Tüm Yıl',
    climate: 'Karasal İklim',
    specialties: ['Termal Turizm', 'Kış Turizmi', 'Kültür Turizmi', 'Doğa Turizmi']
  },

  'Çanakkale': {
    region: 'Marmara',
    highlights: ['Gelibolu', 'Troya', 'Bozcaada', 'Gökçeada', 'Asos'],
    attractions: ['Troya Antik Kenti', 'Gelibolu Savaşları Müzesi', 'ANZAC Koyu', 'Çanakkale Boğazı', 'Kilitbahir Kalesi'],
    cuisine: ['Midye Dolma', 'Çanakkale Kebabı', 'Bozcaada Şarabı', 'Deniz Ürünleri'],
    activities: ['Tarihi Turlar', 'Şarap Tadımı', 'Plaj Aktiviteleri', 'Kültür Turları'],
    bestTime: 'Nisan-Ekim',
    climate: 'Akdeniz İklimi',
    specialties: ['Tarih Turizmi', 'Şarap Turizmi', 'Deniz Turizmi']
  },

  'Edirne': {
    region: 'Marmara',
    highlights: ['Selimiye Camii', 'Karaağaç', 'Uzunköprü'],
    attractions: ['Selimiye Camii', 'Eski Cami', 'Meriç Nehri', 'Edirne Sarayı Kalıntıları'],
    cuisine: ['Edirne Ciğeri', 'Badem Ezmesi', 'Peynir Helvası'],
    activities: ['Kültür Turu', 'Nehir Aktiviteleri', 'Fotoğrafçılık'],
    bestTime: 'Nisan-Ekim',
    climate: 'Karasal İklim',
    specialties: ['Kültür Turizmi', 'Mimari Turizm']
  },

  // EGE BÖLGESİ
  'Izmir': {
    region: 'Ege',
    highlights: ['Alsancak', 'Konak', 'Karşıyaka', 'Çeşme', 'Alaçatı', 'Foça', 'Selçuk'],
    attractions: ['Saat Kulesi', 'Kemeraltı Çarşısı', 'Efes Antik Kenti', 'Şirince Köyü', 'Bergama Akropol', 'Kadifekale'],
    cuisine: ['İzmir Köfte', 'Boyoz', 'Kumru', 'Ege Otları', 'Zeytinyağlı Yemekler'],
    activities: ['Antik Kent Turları', 'Şarap Tadımı', 'Plaj Aktiviteleri', 'Rüzgar Sörfü', 'Kültür Turları'],
    bestTime: 'Mart-Kasım',
    climate: 'Akdeniz İklimi',
    specialties: ['Kültür Turizmi', 'Deniz Turizmi', 'Gastronomi Turizmi', 'Termal Turizm']
  },

  'Bodrum': {
    region: 'Ege',
    highlights: ['Bodrum Merkez', 'Gümbet', 'Bitez', 'Turgutreis', 'Yalıkavak', 'Göltürkbükü'],
    attractions: ['Bodrum Kalesi', 'Antik Tiyatro', 'Marina', 'Myndos Kapısı', 'Yel Değirmenleri'],
    cuisine: ['Deniz Ürünleri', 'Bodrum Mandalinatı', 'Ege Mezeler', 'Balık'],
    activities: ['Tekne Turları', 'Dalış', 'Gece Hayatı', 'Su Sporları', 'Marina Gezileri'],
    bestTime: 'Mayıs-Ekim',
    climate: 'Akdeniz İklimi',
    specialties: ['Lüks Turizm', 'Deniz Turizmi', 'Gece Hayatı', 'Tekne Turizmi']
  },

  'Pamukkale': {
    region: 'Ege',
    cities: ['Denizli'],
    highlights: ['Pamukkale Travertenleri', 'Hierapolis'],
    attractions: ['Kalsiyum Terasları', 'Antik Havuz', 'Hierapolis Antik Kenti', 'Arkeoloji Müzesi'],
    cuisine: ['Denizli Kebabı', 'Hoşaf', 'Yöresel Et Yemekleri'],
    activities: ['Termal Banyo', 'Antik Kent Gezileri', 'Fotoğrafçılık', 'Balon Turu'],
    bestTime: 'Mart-Kasım',
    climate: 'Karasal İklim',
    specialties: ['Termal Turizm', 'Doğa Turizmi', 'Kültür Turizmi']
  },

  'Kuşadası': {
    region: 'Ege',
    highlights: ['Ladies Beach', 'Pigeon Island', 'Dilek Peninsula'],
    attractions: ['Efes Yakınları', 'Meryem Ana Evi', 'Dilek Yarımadası', 'Güvercin Adası'],
    cuisine: ['Deniz Ürünleri', 'Ege Mezeler', 'İncir', 'Zeytinyağlı Yemekler'],
    activities: ['Plaj Aktiviteleri', 'Tekne Turları', 'Antik Kent Gezileri', 'Alışveriş'],
    bestTime: 'Nisan-Ekim',
    climate: 'Akdeniz İklimi',
    specialties: ['Deniz Turizmi', 'Kültür Turizmi', 'Cruise Turizmi']
  },

  // AKDENIZ BÖLGESİ
  'Antalya': {
    region: 'Akdeniz',
    highlights: ['Kaleiçi', 'Lara', 'Konyaaltı', 'Belek', 'Side', 'Kemer', 'Kaş', 'Olympos'],
    attractions: ['Aspendos Antik Tiyatrosu', 'Perge Antik Kenti', 'Düden Şelalesi', 'Hadrian Kapısı', 'Yivli Minare', 'Kurşunlu Şelalesi'],
    cuisine: ['Antalya Piyazı', 'Hibeş', 'Şiş Köfte', 'Akdeniz Mezeler', 'Taze Balık'],
    activities: ['Antik Kent Turları', 'Plaj Aktiviteleri', 'Su Sporları', 'Yamaç Paraşütü', 'Tekne Turları', 'Golf'],
    bestTime: 'Mart-Kasım',
    climate: 'Akdeniz İklimi',
    specialties: ['Deniz Turizmi', 'Kültür Turizmi', 'Golf Turizmi', 'Macera Turizmi']
  },

  'Mersin': {
    region: 'Akdeniz',
    highlights: ['Tarsus', 'Silifke', 'Erdemli', 'Anamur'],
    attractions: ['Tarsus Şelalesi', 'Kızkalesi', 'Cennet-Cehennem', 'Mamure Kalesi'],
    cuisine: ['Tantuni', 'Mersin Kebabı', 'Cezerye', 'Humus'],
    activities: ['Plaj Aktiviteleri', 'Mağara Turları', 'Tarihi Yerler', 'Su Sporları'],
    bestTime: 'Mart-Kasım',
    climate: 'Akdeniz İklimi',
    specialties: ['Deniz Turizmi', 'Mağara Turizmi', 'Tarih Turizmi']
  },

  'Adana': {
    region: 'Akdeniz',
    highlights: ['Seyhan', 'Yüreğir', 'Kozan'],
    attractions: ['Sabancı Merkez Camii', 'Taşköprü', 'Adana Arkeoloji Müzesi', 'Seyhan Nehri'],
    cuisine: ['Adana Kebab', 'Şalgam', 'Bici Bici', 'Analı Kızlı'],
    activities: ['Nehir Turları', 'Kültür Turları', 'Gastronomi Turları'],
    bestTime: 'Ekim-Mayıs',
    climate: 'Akdeniz İklimi',
    specialties: ['Gastronomi Turizmi', 'Kültür Turizmi', 'Nehir Turizmi']
  },

  // İÇ ANADOLU BÖLGESİ
  'Cappadocia': {
    region: 'İç Anadolu',
    cities: ['Nevşehir', 'Ürgüp', 'Göreme', 'Avanos'],
    highlights: ['Göreme', 'Ürgüp', 'Avanos', 'Ortahisar', 'Zelve', 'Uçhisar'],
    attractions: ['Göreme Açık Hava Müzesi', 'İhlara Vadisi', 'Derinkuyu Yeraltı Şehri', 'Kaymaklı Yeraltı Şehri', 'Peri Bacaları'],
    cuisine: ['Testi Kebabı', 'Mantı', 'Nevşehir Kavurması', 'Üzüm', 'Şarap'],
    activities: ['Balon Turu', 'Atv Safari', 'Yeraltı Şehri Turları', 'Şarap Tadımı', 'Peri Bacası Gezileri'],
    bestTime: 'Nisan-Haziran, Eylül-Kasım',
    climate: 'Karasal İklim',
    specialties: ['Balon Turizmi', 'Doğa Turizmi', 'Kültür Turizmi', 'Şarap Turizmi']
  },

  'Ankara': {
    region: 'İç Anadolu',
    highlights: ['Kızılay', 'Çankaya', 'Altındağ', 'Beypazarı'],
    attractions: ['Anıtkabir', 'Ankara Kalesi', 'Anadolu Medeniyetleri Müzesi', 'Rahmi Koç Müzesi'],
    cuisine: ['Ankara Tava', 'Beypazarı Kurusu', 'Simidi', 'Döşeme'],
    activities: ['Müze Turları', 'Kültür Turları', 'Şehir Gezileri'],
    bestTime: 'Nisan-Ekim',
    climate: 'Karasal İklim',
    specialties: ['Kültür Turizmi', 'Müze Turizmi', 'Şehir Turizmi']
  },

  'Konya': {
    region: 'İç Anadolu',
    highlights: ['Meram', 'Selçuklu', 'Karatay'],
    attractions: ['Mevlana Türbesi', 'Alaaddin Tepesi', 'İnce Minareli Medrese', 'Karatay Medresesi'],
    cuisine: ['Etli Ekmek', 'Konya Kebabı', 'Fırın Kebabı', 'Höşmerim'],
    activities: ['Kültür Turları', 'Mevlana Turları', 'Geleneksel Etkinlikler'],
    bestTime: 'Nisan-Ekim',
    climate: 'Karasal İklim',
    specialties: ['Kültür Turizmi', 'İnanç Turizmi', 'Gastronomi Turizmi']
  },

  // KARADENİZ BÖLGESİ
  'Trabzon': {
    region: 'Karadeniz',
    highlights: ['Ortahisar', 'Akçaabat', 'Uzungöl', 'Maçka'],
    attractions: ['Sümela Manastırı', 'Uzungöl', 'Atatürk Köşkü', 'Boztepe', 'Sera Gölü'],
    cuisine: ['Hamsi', 'Akçaabat Köfte', 'Kuymak', 'Laz Böreği', 'Trabzon Hurması'],
    activities: ['Doğa Yürüyüşü', 'Fotoğraf Turları', 'Yayla Turları', 'Göl Turları'],
    bestTime: 'Mayıs-Eylül',
    climate: 'Karadeniz İklimi',
    specialties: ['Doğa Turizmi', 'Yayla Turizmi', 'Kültür Turizmi']
  },

  'Rize': {
    region: 'Karadeniz',
    highlights: ['Çayeli', 'Ardeşen', 'Hemşin', 'Ayder'],
    attractions: ['Çay Bahçeleri', 'Ayder Yaylası', 'Palovit Şelalesi', 'Zilkale'],
    cuisine: ['Çay', 'Hamsi', 'Muhlama', 'Kaygana'],
    activities: ['Çay Bahçesi Turları', 'Yayla Turları', 'Rafting', 'Doğa Yürüyüşü'],
    bestTime: 'Mayıs-Eylül',
    climate: 'Karadeniz İklimi',
    specialties: ['Çay Turizmi', 'Yayla Turizmi', 'Doğa Turizmi']
  },

  'Samsun': {
    region: 'Karadeniz',
    highlights: ['İlkadım', 'Canik', 'Atakum'],
    attractions: ['Atatürk Müzesi', 'Bandırma Vapuru', 'Amazon Köyleri', 'Amisos Tepesi'],
    cuisine: ['Pidesi', 'Hamsi', 'Terme Fasulyesi'],
    activities: ['Şehir Turları', 'Plaj Aktiviteleri', 'Kültür Turları'],
    bestTime: 'Mayıs-Eylül',
    climate: 'Karadeniz İklimi',
    specialties: ['Kültür Turizmi', 'Şehir Turizmi']
  },

  // DOĞU ANADOLU BÖLGESİ
  'Erzurum': {
    region: 'Doğu Anadolu',
    highlights: ['Yakutiye', 'Aziziye', 'Palandöken'],
    attractions: ['Çifte Minareli Medrese', 'Erzurum Kalesi', 'Palandöken Kayak Merkezi'],
    cuisine: ['Cağ Kebabı', 'Ayran Aşı', 'Kesme Çorbası'],
    activities: ['Kayak', 'Kış Sporları', 'Kültür Turları'],
    bestTime: 'Aralık-Mart (Kayak), Haziran-Ağustos (Yaz)',
    climate: 'Karasal İklim',
    specialties: ['Kış Turizmi', 'Kayak Turizmi', 'Kültür Turizmi']
  },

  'Van': {
    region: 'Doğu Anadolu',
    highlights: ['İpekyolu', 'Tuşba', 'Akdamar Adası'],
    attractions: ['Van Gölü', 'Akdamar Kilisesi', 'Van Kalesi', 'Muradiye Şelalesi'],
    cuisine: ['Van Kahvaltısı', 'Keledoş', 'Kavut', 'Van Otlu Peyniri'],
    activities: ['Göl Turları', 'Kültür Turları', 'Fotoğraf Turları'],
    bestTime: 'Mayıs-Eylül',
    climate: 'Karasal İklim',
    specialties: ['Göl Turizmi', 'Kültür Turizmi', 'Gastronomi Turizmi']
  },

  // GÜNEYDOĞU ANADOLU BÖLGESİ
  'Gaziantep': {
    region: 'Güneydoğu Anadolu',
    highlights: ['Şahinbey', 'Şehitkamil'],
    attractions: ['Gaziantep Kalesi', 'Zeugma Mozaik Müzesi', 'Bakırcılar Çarşısı'],
    cuisine: ['Baklava', 'Lahmacun', 'Ali Nazik', 'Beyran', 'Katmer'],
    activities: ['Gastronomi Turları', 'Müze Gezileri', 'Çarşı Turları'],
    bestTime: 'Mart-Mayıs, Ekim-Kasım',
    climate: 'Akdeniz İklimi',
    specialties: ['Gastronomi Turizmi', 'Kültür Turizmi', 'Alışveriş Turizmi']
  },

  'Şanlıurfa': {
    region: 'Güneydoğu Anadolu',
    highlights: ['Eyyübiye', 'Haliliye', 'Göbeklitepe'],
    attractions: ['Göbeklitepe', 'Balıklıgöl', 'Urfa Kalesi', 'Rızvaniye Camii'],
    cuisine: ['Çiğ Köfte', 'İsot', 'Urfa Kebabı', 'Şıllık'],
    activities: ['Arkeolojik Turlar', 'Kültür Turları', 'İnanç Turları'],
    bestTime: 'Mart-Mayıs, Ekim-Kasım',
    climate: 'Karasal İklim',
    specialties: ['Arkeoloji Turizmi', 'İnanç Turizmi', 'Kültür Turizmi']
  },

  'Mardin': {
    region: 'Güneydoğu Anadolu',
    highlights: ['Artuklu', 'Midyat', 'Savur'],
    attractions: ['Mardin Tarihi Evleri', 'Deyrulzafaran Manastırı', 'Kasımiye Medresesi'],
    cuisine: ['Mardin Kebabı', 'İçli Köfte', 'Sembüsek'],
    activities: ['Tarihi Ev Turları', 'Kültür Turları', 'Fotoğraf Turları'],
    bestTime: 'Mart-Mayıs, Ekim-Kasım',
    climate: 'Karasal İklim',
    specialties: ['Kültür Turizmi', 'Mimari Turizm', 'Fotoğraf Turizmi']
  }

  // Daha fazla il ve bölge eklenmeye devam edilecek...
};

// Tüm şehirlerin listesi
export const ALL_TURKISH_CITIES = Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE);

// Bölgeye göre şehir filtreleme
export const getCitiesByRegion = (region: string): string[] => {
  return Object.entries(COMPLETE_TURKEY_TOURISM_DATABASE)
    .filter(([_, data]) => data.region === region)
    .map(([city, _]) => city);
};

// Aktiviteye göre şehir önerme
export const getCitiesByActivity = (activity: string): string[] => {
  return Object.entries(COMPLETE_TURKEY_TOURISM_DATABASE)
    .filter(([_, data]) => 
      data.activities.some(act => 
        act.toLowerCase().includes(activity.toLowerCase())
      )
    )
    .map(([city, _]) => city);
};

// Mutfağa göre şehir önerme
export const getCitiesByCuisine = (cuisine: string): string[] => {
  return Object.entries(COMPLETE_TURKEY_TOURISM_DATABASE)
    .filter(([_, data]) => 
      data.cuisine.some(food => 
        food.toLowerCase().includes(cuisine.toLowerCase())
      )
    )
    .map(([city, _]) => city);
};