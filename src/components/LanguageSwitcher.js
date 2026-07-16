'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SUPPORTED_LOCALES, LOCALE_NAMES, extractLocaleFromPath, setStoredLocale } from '../lib/i18n';

export default function LanguageSwitcher({ availableLocales = SUPPORTED_LOCALES }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = extractLocaleFromPath(pathname);

  const handleLanguageChange = (newLocale) => {
    setStoredLocale(newLocale);
    setIsOpen(false);
  };

  const buildNewUrl = (locale) => {
    const pathParts = pathname.split('/').filter(Boolean);
    if ((pathParts[0] === 'blog' || pathParts[0] === 'about') && SUPPORTED_LOCALES.includes(pathParts[1])) {
      const remainingPath = pathParts.slice(2).join('/');
      return `/${pathParts[0]}/${locale}${remainingPath ? `/${remainingPath}` : ''}`;
    }

    if (SUPPORTED_LOCALES.includes(pathParts[0])) {
      const remainingPath = pathParts.slice(1).join('/');
      return `/${locale}${remainingPath ? `/${remainingPath}` : ''}`;
    }

    if (pathname === '/blog' || pathname === '/about') {
      return `${pathname}/${locale}`;
    }

    return `/${locale}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-1"
        aria-label="Change language"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.723 1.447a1 1 0 11-1.79-.895l.99-1.98a.869.869 0 01.02-.037l2.991-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd"/>
        </svg>
        {LOCALE_NAMES[currentLocale]}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-32 bg-gray-900 rounded-lg shadow-lg border border-white/10 z-20">
            {availableLocales.map((locale) => (
              <Link
                key={locale}
                href={buildNewUrl(locale)}
                onClick={() => handleLanguageChange(locale)}
                className={`block px-4 py-2 text-sm hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  locale === currentLocale
                    ? 'bg-[#8172AD]/20 text-[#8172AD] font-medium'
                    : 'text-gray-300'
                }`}
              >
                {LOCALE_NAMES[locale]}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
