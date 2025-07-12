// 支持的语言列表
export const SUPPORTED_LOCALES = ['en', 'zh', 'ja'];
export const DEFAULT_LOCALE = 'en';

// 语言名称映射
export const LOCALE_NAMES = {
  'en': 'English',
  'zh': '中文',
  'ja': '日本語'
};

// 从客户端检测语言
export function detectLocaleFromBrowser() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  
  try {
    const languages = navigator.languages || [navigator.language];
    
    for (const language of languages) {
      const locale = language.toLowerCase();
      
      // 精确匹配
      if (SUPPORTED_LOCALES.includes(locale)) {
        return locale;
      }
      
      // 语言代码匹配
      const langCode = locale.split('-')[0];
      if (SUPPORTED_LOCALES.includes(langCode)) {
        return langCode;
      }
    }
    
    return DEFAULT_LOCALE;
  } catch (error) {
    console.error('Error detecting browser locale:', error);
    return DEFAULT_LOCALE;
  }
}

// 从localStorage获取用户选择的语言
export function getStoredLocale() {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem('preferred-locale');
  } catch (error) {
    return null;
  }
}

// 存储用户选择的语言
export function setStoredLocale(locale) {
  if (typeof window === 'undefined') return;
  
  try {
    if (SUPPORTED_LOCALES.includes(locale)) {
      localStorage.setItem('preferred-locale', locale);
    }
  } catch (error) {
    console.error('Error storing locale:', error);
  }
}

// 获取最佳语言（优先级：用户存储 > 浏览器检测 > 默认）
export function getBestLocale() {
  const stored = getStoredLocale();
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    return stored;
  }
  
  return detectLocaleFromBrowser();
}

// 构建带语言的URL
export function buildLocalizedUrl(path, locale) {
  // 移除开头的斜杠
  const cleanPath = path.replace(/^\/+/, '');
  
  // 如果路径已经包含语言，替换它
  const pathParts = cleanPath.split('/');
  if (SUPPORTED_LOCALES.includes(pathParts[0])) {
    pathParts[0] = locale;
    return '/' + pathParts.join('/');
  }
  
  // 否则添加语言前缀
  if (cleanPath) {
    return `/${locale}/${cleanPath}`;
  } else {
    return `/${locale}`;
  }
}

// 从URL中提取当前语言
export function extractLocaleFromPath(pathname) {
  const pathParts = pathname.split('/').filter(Boolean);
  const firstPart = pathParts[0];
  
  if (SUPPORTED_LOCALES.includes(firstPart)) {
    return firstPart;
  }
  
  return DEFAULT_LOCALE;
}