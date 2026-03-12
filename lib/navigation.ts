import { createNavigation } from 'next-intl/navigation';

export const locales = ['tr'] as const;
export const localePrefix = 'as-needed';
export const defaultLocale = 'tr';

export const { Link, redirect, usePathname, useRouter } =
    createNavigation({ locales, localePrefix, defaultLocale });
