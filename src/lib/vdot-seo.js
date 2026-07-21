import { DEFAULT_VDOT_LOCALE, VDOT_LOCALES, getVdotCopy, vdotPath } from './vdot-i18n.js';

export const VDOT_SITE_URL = 'https://vdot.paceguru.app';

const openGraphLocales = { zh: 'zh_CN', en: 'en_US', ja: 'ja_JP' };
const hreflangLocales = { zh: 'zh-CN', en: 'en', ja: 'ja' };

export function vdotUrl(locale = DEFAULT_VDOT_LOCALE) {
  return new URL(vdotPath(locale), `${VDOT_SITE_URL}/`).toString();
}

export function vdotLanguageAlternates() {
  return Object.fromEntries([
    ...VDOT_LOCALES.map((locale) => [hreflangLocales[locale], vdotUrl(locale)]),
    ['x-default', vdotUrl(DEFAULT_VDOT_LOCALE)],
  ]);
}

export function getVdotMetadata(locale = DEFAULT_VDOT_LOCALE) {
  const copy = getVdotCopy(locale);
  const title = locale === 'zh'
    ? 'VDOT 计算器｜PaceGuru'
    : locale === 'ja'
      ? 'VDOT 計算機｜PaceGuru'
      : 'VDOT Calculator | PaceGuru';
  const description = locale === 'zh'
    ? '输入近期比赛成绩，计算 VDOT 并查看各比赛距离的等效成绩。'
    : locale === 'ja'
      ? '直近のレース記録から VDOT を計算し、各距離の等価なレース記録を確認できます。'
      : 'Calculate your VDOT from a recent race result and see equivalent performances across race distances.';

  return {
    metadataBase: new URL(VDOT_SITE_URL),
    title,
    description,
    alternates: {
      canonical: vdotPath(locale),
      languages: vdotLanguageAlternates(),
    },
    openGraph: {
      title,
      description,
      url: vdotUrl(locale),
      siteName: 'PaceGuru',
      locale: openGraphLocales[locale] || openGraphLocales[DEFAULT_VDOT_LOCALE],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'application-name': 'PaceGuru VDOT Calculator',
      'content-language': locale,
      'x-vdot-locale-name': copy.localeName,
    },
  };
}

export function getVdotJsonLd(locale = DEFAULT_VDOT_LOCALE) {
  const copy = getVdotCopy(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: locale === 'ja' ? 'PaceGuru VDOT 計算機' : locale === 'en' ? 'PaceGuru VDOT Calculator' : 'PaceGuru VDOT 计算器',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    url: vdotUrl(locale),
    inLanguage: locale === 'zh' ? 'zh-CN' : locale,
    description: copy.heroDescription,
    isPartOf: {
      '@type': 'WebSite',
      name: 'PaceGuru',
      url: 'https://paceguru.app/',
    },
  };
}
