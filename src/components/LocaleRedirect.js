'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBestLocale, setStoredLocale } from '../lib/i18n';

export default function LocaleRedirect({ targetPath }) {
  const router = useRouter();

  useEffect(() => {
    const detectedLocale = getBestLocale();
    setStoredLocale(detectedLocale);
    router.replace(`${targetPath}/${detectedLocale}`);
  }, [router, targetPath]);

  return null;
}
