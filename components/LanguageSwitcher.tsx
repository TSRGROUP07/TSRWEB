"use client";

import { useLocale } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];



export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentLang, setCurrentLang] = useState('tr');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Read cookie on mount to set initial state
    const cookies = document.cookie.split(';');
    const googtrans = cookies.find(c => c.trim().startsWith('googtrans='));
    if (googtrans) {
      // Cookie format: /source/target (e.g., /auto/en or /tr/en)
      const parts = googtrans.split('=')[1].split('/');
      const targetLang = parts[parts.length - 1]; // Last part is target language
      if (targetLang && languages.some(l => l.code === targetLang)) {
        setCurrentLang(targetLang);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /*
   * Change language using Google Translate API
   * Method 1: Try to find the select element and change its value.
   * Method 2: Set the google translate cookie and reload the page as fallback.
   */
  const switchLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback: Set cookie and reload
      console.warn("Google Translate dropdown not found, using cookie fallback.");

      const host = window.location.hostname;
      // Clear existing cookie first
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host}`;

      // Set new cookie
      // Format: /source_lang/target_lang or /auto/target_lang
      const cookieValue = `/auto/${langCode}`;

      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${host}`;

      window.location.reload();
    }
  };

  const currentFlag = languages.find(l => l.code === currentLang)?.flag || '🇹🇷';
  const currentCode = languages.find(l => l.code === currentLang)?.code.toUpperCase() || 'TR';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 min-w-[70px] sm:min-w-[85px] justify-center"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-white flex-shrink-0" />
        <span className="text-white text-sm font-medium hidden sm:inline whitespace-nowrap">
          {currentFlag} {currentCode}
        </span>
        <span className="text-white text-sm font-medium sm:hidden flex-shrink-0">
          {currentFlag}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${currentLang === lang.code
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:text-gray-900'
                }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="flex-1 font-medium">{lang.name}</span>
              {currentLang === lang.code && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
