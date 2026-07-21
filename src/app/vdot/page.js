import VdotCalculator from './VdotCalculator';
import { DEFAULT_VDOT_LOCALE } from '../../lib/vdot-i18n';
import { getVdotJsonLd, getVdotMetadata } from '../../lib/vdot-seo';

export const metadata = getVdotMetadata(DEFAULT_VDOT_LOCALE);

export default function VdotPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getVdotJsonLd(DEFAULT_VDOT_LOCALE)) }} />
      <VdotCalculator locale={DEFAULT_VDOT_LOCALE} />
    </>
  );
}
