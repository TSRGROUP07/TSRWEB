import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './lib/navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'tr',

  // Use as-needed to hide default locale prefix
  localePrefix
});

export const config = {
  // Match al pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

