'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getBestLocale, setStoredLocale, getStoredLocale } from '../lib/i18n';

export default function LocaleRedirect({ targetPath }) {
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // 检查是否是首次访问或者需要重定向
    const storedLocale = getStoredLocale();
    const detectedLocale = getBestLocale();
    
    // 如果用户已经有语言偏好，并且当前路径不匹配，才重定向
    if (targetPath === '/') {
      // 对于主页，只有在没有存储语言且检测到的语言不是英文时才重定向
      if (!storedLocale && detectedLocale !== 'en') {
        setStoredLocale(detectedLocale);
        
        let redirectPath;
        if (targetPath === '/blog') {
          redirectPath = `/blog/${detectedLocale}`;
        } else if (targetPath === '/about') {
          redirectPath = `/about/${detectedLocale}`;
        } else {
          // 对于主页
          redirectPath = `/${detectedLocale}`;
        }
        
        setShouldRedirect(true);
        router.replace(redirectPath);
        return;
      }
    } else {
      // 对于其他页面（blog, about），正常重定向逻辑
      setStoredLocale(detectedLocale);
      
      let redirectPath;
      if (targetPath === '/blog') {
        redirectPath = `/blog/${detectedLocale}`;
      } else if (targetPath === '/about') {
        redirectPath = `/about/${detectedLocale}`;
      }
      
      setShouldRedirect(true);
      router.replace(redirectPath);
      return;
    }
    
    // 如果不需要重定向，标记为非首次访问
    setIsFirstVisit(false);
  }, [router, targetPath, pathname]);

  // 如果不需要重定向，不显示任何内容
  if (!shouldRedirect && !isFirstVisit) {
    return null;
  }

  // 只有在需要重定向时才显示加载状态
  if (!shouldRedirect) {
    return null;
  }

  // 显示加载状态
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
          </svg>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading PaceGuru...</p>
      </div>
    </div>
  );
}