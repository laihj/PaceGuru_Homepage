'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DataTable from './components/DataTable';
// Simple language switcher for Hanson plan page
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const texts = {
  zh: {
    title: "汉森马拉松训练法配速计算器",
    subtitle: "根据您的马拉松目标生成训练计划",
    appCtaTitle: "把计划带到 Apple Watch 上执行",
    appCtaDescription: "用 PaceGuru 查看当天训练，同步到 Apple Watch，出门就能直接开始。",
    appCtaButton: "在 App Store 下载 PaceGuru",
    language: "语言",
    help: "帮助",
    helpTitle: "汉森训练法使用指南"
  },
  en: {
    title: "Hanson Marathon Method Pace Calculator",
    subtitle: "Generate Training Plan Based on Your Marathon Goal",
    appCtaTitle: "Take your plan to Apple Watch",
    appCtaDescription: "Use PaceGuru to see each workout, sync it to Apple Watch, and start when you head out.",
    appCtaButton: "Download PaceGuru on the App Store",
    language: "Language",
    help: "Help",
    helpTitle: "Hanson Training Guide"
  }
};

function HansonPageContent() {
  const [paceData, setPaceData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpContent, setHelpContent] = useState('');
  const [loadingHelp, setLoadingHelp] = useState(false);
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

  const HelpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.helpTitle}</h2>
          <button
            onClick={() => setShowHelp(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
          {loadingHelp ? (
            <div className="p-8 text-center text-gray-500">
              {locale === 'zh' ? '加载中...' : 'Loading...'}
            </div>
          ) : (
            <div className="prose prose-gray dark:prose-invert max-w-none p-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {helpContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    setMounted(true);
    fetch('/data/pace.json')
      .then(response => response.json())
      .then(data => setPaceData(data))
      .catch(error => console.error('Error loading pace data:', error));
  }, []);

  const loadHelpContent = async () => {
    setLoadingHelp(true);
    try {
      const helpFile = locale === 'zh' ? '/content/plans/hanson/help-zh.md' : '/content/plans/hanson/help-en.md';
      const response = await fetch(helpFile);
      if (response.ok) {
        const content = await response.text();
        setHelpContent(content);
      } else {
        setHelpContent(locale === 'zh' ? '帮助内容加载失败' : 'Failed to load help content');
      }
    } catch (error) {
      console.error('Error loading help:', error);
      setHelpContent(locale === 'zh' ? '帮助内容加载失败' : 'Failed to load help content');
    } finally {
      setLoadingHelp(false);
    }
  };

  const handleShowHelp = () => {
    setShowHelp(true);
    loadHelpContent();
  };

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider locale={antdLocale}>
      <div className="min-h-screen bg-white">
        <nav className="absolute top-0 right-0 p-6">
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-[#8172AD] font-medium transition-colors"
            >
              {locale === 'zh' ? '首页' : 'Home'}
            </Link>
            <button
              onClick={handleShowHelp}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-1"
              aria-label={t.help}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">{t.help}</span>
            </button>
            <LanguageSwitcher />
          </div>
        </nav>
        {showHelp && <HelpModal />}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t.title}
          </h1>
          <h3 className="text-lg text-center hint">
            {t.subtitle}
          </h3>
          <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-4 rounded-xl border border-[#ded8ee] bg-[#f8f6fc] p-4 text-left sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-6 w-6 shrink-0 text-[#8172AD]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="7" y="5" width="10" height="14" rx="2" />
                <path strokeLinecap="round" d="M9 2h6M9 22h6M10 9h4M10 13h4" />
              </svg>
              <div>
                <p className="m-0 font-semibold text-[#302b3e]">{t.appCtaTitle}</p>
                <p className="mb-0 mt-1 text-sm leading-6 text-[#625d70]">{t.appCtaDescription}</p>
              </div>
            </div>
            <a
              href="https://apps.apple.com/us/app/paceguru/id6468926049"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.appCtaButton}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-black px-3 text-white transition-opacity hover:opacity-85"
            >
              <svg className="h-7 w-6 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium tracking-[0.01em]">Download on the</span>
                <span className="mt-0.5 text-[19px] font-medium tracking-[-0.02em]">App Store</span>
              </span>
            </a>
          </div>
          <DataTable data={paceData} locale={locale} />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default function HansonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>}>
      <HansonPageContent />
    </Suspense>
  );
}
