import { notFound } from 'next/navigation';
import VdotCalculator from '../VdotCalculator';
import { VDOT_LOCALES, isVdotLocale } from '../../../lib/vdot-i18n';
import { getVdotJsonLd, getVdotMetadata } from '../../../lib/vdot-seo';

export function generateStaticParams() {
  return VDOT_LOCALES.filter((locale) => locale !== 'zh').map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isVdotLocale(locale) || locale === 'zh') return {};
  return getVdotMetadata(locale);
}

export default async function LocalizedVdotPage({ params }) {
  const { locale } = await params;
  if (!isVdotLocale(locale) || locale === 'zh') notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getVdotJsonLd(locale)) }} />
      <VdotCalculator locale={locale} />
    </>
  );
}
