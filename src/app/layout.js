import localFont from "next/font/local";
import { SITE_URL } from "../lib/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PaceGuru - Your Ultimate Apple Watch Running Companion",
  description: "PaceGuru is your all-in-one running companion for Apple Watch. Sync, analyze, and improve your running performance with AI-powered insights.",
  keywords: "Apple Watch running app, running tracker, pace analysis, heart rate zones, running companion, fitness app, marathon training, 5K training, running performance, Apple Watch sync",
  authors: [{ name: "PaceGuru Team" }],
  creator: "PaceGuru",
  publisher: "PaceGuru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh-CN': '/zh',
      'ja': '/ja',
    },
  },
  openGraph: {
    title: "PaceGuru - Your Ultimate Apple Watch Running Companion",
    description: "PaceGuru - Your Apple Watch running companion. Sync, analyze, and improve your running performance.",
    url: SITE_URL,
    siteName: 'PaceGuru',
    images: [
      {
        url: '/ograph.png',
        width: 1200,
        height: 630,
        alt: 'PaceGuru - Apple Watch Running App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PaceGuru - Your Ultimate Apple Watch Running Companion",
    description: "PaceGuru - Your Apple Watch running companion. Sync, analyze, and improve your running performance.",
    images: ['/ograph.png'],
    creator: '@paceguru',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/ograph.png',
  },
  manifest: '/site.webmanifest',
};

// lang 跟随 locale：改善 SEO/无障碍，避免 /zh /ja 页面 lang 仍为 en。
// 根 layout 拿不到 [locale] 段参数，此前借 middleware 注入的 header 推断，
// 但根 layout 调 headers() 会把全站（含首页）拖成动态渲染，TTFB 显著变差。
// 改为静态输出 lang="en"，再用下面这段同步内联脚本在首帧前按 URL 修正。
// 逻辑与原服务端版本一致（含 vdot.paceguru.app 子站默认中文）。
const LANG_FIX_SCRIPT = `(function(){try{var p=location.pathname,l;if(/^(www\\.)?vdot\\.paceguru\\.app$/.test(location.hostname)){var m=p.match(/^\\/(en|zh|ja)(\\/|$)/);l=m?({en:'en',ja:'ja',zh:'zh-CN'})[m[1]]:'zh-CN';}else{l=/(^|\\/)zh(\\/|$)/.test(p)?'zh-CN':/(^|\\/)ja(\\/|$)/.test(p)?'ja':'en';}document.documentElement.lang=l;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: LANG_FIX_SCRIPT }} />
        <meta name="theme-color" content="#8172AD" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#8172AD" />
        <script
          defer
          src="https://vibeloft.ai/telemetry/v1.js"
          data-vl-product-id="11277e6e-55e0-4c59-bc42-e4c7a26ad39b"
          data-vl-auth-key="vl_web.jbLErj3_HPn_mEmgNEzrHy_wq2FH_Yh2sGQgXcwxBT0"
        ></script>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QPCM0TN37F"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QPCM0TN37F');
            `,
          }}
        />
        {/* umami.is analytics */}
        <script 
          defer 
          src="https://cloud.umami.is/script.js" 
          data-website-id="77ada27f-4c28-4548-b88d-d6938b799041"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
