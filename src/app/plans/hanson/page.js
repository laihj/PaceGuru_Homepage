'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import DataTable from './components/DataTable';
// Simple language switcher for Hanson plan page
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const texts = {
  zh: {
    title: "汉森马拉松训练法配速计算器",
    subtitle: "根据您的马拉松目标生成训练计划",
    language: "语言"
  },
  en: {
    title: "Hanson Marathon Method Pace Calculator",
    subtitle: "Generate Training Plan Based on Your Marathon Goal",
    language: "Language"
  }
};

export default function HansonPage() {
  const [paceData, setPaceData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const locale = searchParams.get('lang') || 'en';

  const t = texts[locale] || texts.zh;
  const antdLocale = locale === 'zh' ? zhCN : enUS;

  const LanguageSwitcher = () => {
    const languages = [
      { code: 'zh', name: '中文' },
      { code: 'en', name: 'English' }
    ];

    const changeLanguage = (newLang) => {
      const newUrl = pathname + '?' + new URLSearchParams({ lang: newLang }).toString();
      router.push(newUrl);
    };

    return (
      <div className="relative">
        <select 
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm hover:border-blue-500 transition-colors"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>
    );
  };

  useEffect(() => {
    setMounted(true);
    fetch('/data/pace.json')
      .then(response => response.json())
      .then(data => setPaceData(data))
      .catch(error => console.error('Error loading pace data:', error));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider locale={antdLocale}>
      <div className="min-h-screen bg-white">
        <nav className="absolute top-0 right-0 p-6">
          <div className="flex gap-6 items-center">
            <LanguageSwitcher />
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t.title}
          </h1>
          <h3 className="text-lg text-center hint">
            {t.subtitle}
          </h3>
          <DataTable data={paceData} locale={locale} />
        </div>
      </div>
    </ConfigProvider>
  );
}