/**
 * Otomatik Çeviri Servisi
 * İlan verilerini otomatik olarak 3 dile (TR, EN, RU) çevirir
 */

export type SupportedLanguage = 'tr' | 'en' | 'ru';

interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

/**
 * MyMemory Translation API kullanarak metni çevirir
 * Ücretsiz API - günlük limit: 10,000 karakter
 */
async function translateWithMyMemory(
  text: string,
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'tr'
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text;
  }

  // Aynı dil ise çeviri yapma
  if (sourceLang === targetLang) {
    return text;
  }

  try {
    const langMap: Record<SupportedLanguage, string> = {
      tr: 'tr',
      en: 'en',
      ru: 'ru',
    };

    const source = langMap[sourceLang];
    const target = langMap[targetLang];

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }

    // Hata durumunda orijinal metni döndür
    console.warn('Translation failed, returning original text:', data);
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    // Hata durumunda orijinal metni döndür
    return text;
  }
}

/**
 * Google Translate API kullanarak metni çevirir
 * Daha iyi kalite için Google Translate API kullanılabilir
 * GOOGLE_TRANSLATE_API_KEY environment variable gerekli
 */
async function translateWithGoogle(
  text: string,
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'tr'
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text;
  }

  // Aynı dil ise çeviri yapma
  if (sourceLang === targetLang) {
    return text;
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey) {
    console.warn('GOOGLE_TRANSLATE_API_KEY not set, falling back to MyMemory');
    return translateWithMyMemory(text, targetLang, sourceLang);
  }

  try {
    const langMap: Record<SupportedLanguage, string> = {
      tr: 'tr',
      en: 'en',
      ru: 'ru',
    };

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: langMap[sourceLang],
          target: langMap[targetLang],
          format: 'text',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.data?.translations?.[0]?.translatedText) {
      return data.data.translations[0].translatedText;
    }

    // Hata durumunda MyMemory'a fallback
    console.warn('Google Translate failed, falling back to MyMemory');
    return translateWithMyMemory(text, targetLang, sourceLang);
  } catch (error) {
    console.error('Google Translate error:', error);
    // Hata durumunda MyMemory'a fallback
    return translateWithMyMemory(text, targetLang, sourceLang);
  }
}

/**
 * Metni çevirir (Google Translate API varsa onu kullanır, yoksa MyMemory)
 */
export async function translateText(
  text: string,
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'tr'
): Promise<string> {
  // Google Translate API key varsa onu kullan
  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    return translateWithGoogle(text, targetLang, sourceLang);
  }

  // Yoksa MyMemory kullan
  return translateWithMyMemory(text, targetLang, sourceLang);
}

/**
 * Birden fazla metni aynı anda çevirir
 */
export async function translateMultiple(
  texts: string[],
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'tr'
): Promise<string[]> {
  // Paralel çeviri için Promise.all kullan
  return Promise.all(
    texts.map((text) => translateText(text, targetLang, sourceLang))
  );
}

/**
 * İlan verilerini otomatik olarak 3 dile çevirir
 * title, description, location, district, neighborhood gibi alanları çevirir
 */
export interface PropertyTranslationFields {
  title?: string;
  description?: string;
  location?: string;
  district?: string;
  neighborhood?: string;
  address?: string;
  features?: string[];
  notes?: string;
}

export interface TranslatedProperty {
  title_tr?: string;
  title_en?: string;
  title_ru?: string;
  description_tr?: string;
  description_en?: string;
  description_ru?: string;
  location_tr?: string;
  location_en?: string;
  location_ru?: string;
  district_tr?: string;
  district_en?: string;
  district_ru?: string;
  neighborhood_tr?: string;
  neighborhood_en?: string;
  neighborhood_ru?: string;
  address_tr?: string;
  address_en?: string;
  address_ru?: string;
  features_tr?: string[];
  features_en?: string[];
  features_ru?: string[];
  notes_tr?: string;
  notes_en?: string;
  notes_ru?: string;
}

/**
 * İlan verilerini otomatik olarak 3 dile çevirir
 */
export async function translateProperty(
  property: PropertyTranslationFields,
  sourceLang: SupportedLanguage = 'tr'
): Promise<TranslatedProperty> {
  const translated: TranslatedProperty = {};

  // Title çevirisi
  if (property.title) {
    const [titleEn, titleRu] = await Promise.all([
      translateText(property.title, 'en', sourceLang),
      translateText(property.title, 'ru', sourceLang),
    ]);
    translated.title_tr = sourceLang === 'tr' ? property.title : undefined;
    translated.title_en = titleEn;
    translated.title_ru = titleRu;
  }

  // Description çevirisi
  if (property.description) {
    const [descEn, descRu] = await Promise.all([
      translateText(property.description, 'en', sourceLang),
      translateText(property.description, 'ru', sourceLang),
    ]);
    translated.description_tr = sourceLang === 'tr' ? property.description : undefined;
    translated.description_en = descEn;
    translated.description_ru = descRu;
  }

  // Location çevirisi
  if (property.location) {
    const [locEn, locRu] = await Promise.all([
      translateText(property.location, 'en', sourceLang),
      translateText(property.location, 'ru', sourceLang),
    ]);
    translated.location_tr = sourceLang === 'tr' ? property.location : undefined;
    translated.location_en = locEn;
    translated.location_ru = locRu;
  }

  // District çevirisi
  if (property.district) {
    const [distEn, distRu] = await Promise.all([
      translateText(property.district, 'en', sourceLang),
      translateText(property.district, 'ru', sourceLang),
    ]);
    translated.district_tr = sourceLang === 'tr' ? property.district : undefined;
    translated.district_en = distEn;
    translated.district_ru = distRu;
  }

  // Neighborhood çevirisi
  if (property.neighborhood) {
    const [neighEn, neighRu] = await Promise.all([
      translateText(property.neighborhood, 'en', sourceLang),
      translateText(property.neighborhood, 'ru', sourceLang),
    ]);
    translated.neighborhood_tr = sourceLang === 'tr' ? property.neighborhood : undefined;
    translated.neighborhood_en = neighEn;
    translated.neighborhood_ru = neighRu;
  }

  // Address çevirisi
  if (property.address) {
    const [addrEn, addrRu] = await Promise.all([
      translateText(property.address, 'en', sourceLang),
      translateText(property.address, 'ru', sourceLang),
    ]);
    translated.address_tr = sourceLang === 'tr' ? property.address : undefined;
    translated.address_en = addrEn;
    translated.address_ru = addrRu;
  }

  // Features çevirisi (array)
  if (property.features && property.features.length > 0) {
    const [featuresEn, featuresRu] = await Promise.all([
      translateMultiple(property.features, 'en', sourceLang),
      translateMultiple(property.features, 'ru', sourceLang),
    ]);
    translated.features_tr = sourceLang === 'tr' ? property.features : undefined;
    translated.features_en = featuresEn;
    translated.features_ru = featuresRu;
  }

  // Notes çevirisi
  if (property.notes) {
    const [notesEn, notesRu] = await Promise.all([
      translateText(property.notes, 'en', sourceLang),
      translateText(property.notes, 'ru', sourceLang),
    ]);
    translated.notes_tr = sourceLang === 'tr' ? property.notes : undefined;
    translated.notes_en = notesEn;
    translated.notes_ru = notesRu;
  }

  return translated;
}

/**
 * Dil seçimine göre doğru çeviriyi döndürür
 */
export function getTranslatedField<T extends string | string[] | undefined>(
  field: T,
  translations: {
    [key: string]: T;
  },
  locale: SupportedLanguage
): T {
  // Önce çevrilmiş versiyonu kontrol et
  const translatedKey = `${field}_${locale}` as keyof typeof translations;
  if (translations[translatedKey]) {
    return translations[translatedKey];
  }

  // Çeviri yoksa orijinal metni döndür
  return field;
}


/**
 * İlan verisinden dil seçimine göre title'ı döndürür (English Fallback ile)
 */
export function getTranslatedTitle(
  property: any,
  locale: SupportedLanguage
): string {
  if (!property) return '';

  // 1. Current Locale
  const snakeKey = `title_${locale}`;
  const camelKey = `title${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  const current = property[snakeKey] || property[camelKey];
  if (current) return current;

  // 2. English (if not current)
  if (locale !== 'en' && locale !== 'tr') {
    const en = property.title_en || property.titleEn;
    if (en) return en;
  }

  // 3. Default
  return property.title_tr || property.titleTr || property.title || '';
}

/**
 * İlan verisinden dil seçimine göre description'ı döndürür (English Fallback ile)
 */
export function getTranslatedDescription(
  property: any,
  locale: SupportedLanguage
): string {
  if (!property) return '';

  // 1. Current Locale
  const snakeKey = `description_${locale}`;
  const camelKey = `description${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  const current = property[snakeKey] || property[camelKey];
  if (current) return current;

  // 2. English (if not current)
  if (locale !== 'en' && locale !== 'tr') {
    const en = property.description_en || property.descriptionEn;
    if (en) return en;
  }

  // 3. Default
  return property.description_tr || property.descriptionTr || property.description || '';
}

/**
 * İlan verisinden dil seçimine göre location'ı döndürür (English Fallback ile)
 */
export function getTranslatedLocation(
  property: any,
  locale: SupportedLanguage
): string {
  if (!property) return '';

  // 1. Current Locale
  const snakeKey = `location_${locale}`;
  const camelKey = `location${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  const current = property[snakeKey] || property[camelKey];
  if (current) return current;

  // 2. English (if not current)
  if (locale !== 'en' && locale !== 'tr') {
    const en = property.location_en || property.locationEn;
    if (en) return en;
  }

  // 3. Default
  return property.location_tr || property.locationTr || property.location || '';
}
