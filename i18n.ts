import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['tr', 'en', 'ru', 'bs'];
const defaultLocale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  console.log(`[i18n] requestLocale: ${locale}`);

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    console.log(`[i18n] Invalid or missing locale, falling back to ${defaultLocale}`);
    locale = defaultLocale;
  }

  console.log(`[i18n] Loading messages for: ${locale}`);
  const messages = (await import(`./messages/${locale}.json`)).default;
  console.log(`[i18n] Messages loaded for: ${locale}, count: ${Object.keys(messages).length}`);

  return {
    locale,
    messages
  };
});
