/**
 * İlan çevirileri için React Hook
 * Dil seçimine göre doğru çeviriyi döndürür
 */

import { useLocale } from 'next-intl';
import { SupportedLanguage } from './translation';

/**
 * İlan verisinden dil seçimine göre çevrilmiş alanları döndüren hook
 */
export function usePropertyTranslation(property: any) {
  const locale = useLocale() as SupportedLanguage;

  if (!property) {
    return {
      title: '',
      description: '',
      location: '',
      district: '',
      neighborhood: '',
      address: '',
      features: [],
      notes: '',
    };
  }

  // Helper to get translated field with robust fallback
  // Logic: Current Locale -> English -> Default (Turkish/Original)
  const getField = (key: string, isArray = false) => {
    // 1. Try Current Locale
    const snakeKey = `${key}_${locale}`;
    const camelKey = `${key}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
    const currentVal = property[snakeKey] || property[camelKey];

    if (currentVal && (!isArray || currentVal.length > 0)) return currentVal;

    // 2. Try English (if current is not English and not Turkish)
    if (locale !== 'en' && locale !== 'tr') {
      const enSnake = `${key}_en`;
      const enCamel = `${key}En`;
      const enVal = property[enSnake] || property[enCamel];
      if (enVal && (!isArray || enVal.length > 0)) return enVal;
    }

    // 3. Fallback to Default (usually Turkish in 'key') or explicit 'tr'
    const trSnake = `${key}_tr`;
    const trCamel = `${key}Tr`;

    return property[trSnake] || property[trCamel] || property[key] || (isArray ? [] : '');
  };

  return {
    title: getField('title'),
    description: getField('description'),
    location: getField('location'),
    district: getField('district'),
    neighborhood: getField('neighborhood'),
    address: getField('address'),
    features: getField('features', true),
    notes: getField('notes'),
  };
}
