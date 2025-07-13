import localFont from "next/font/local";
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
  description: "Unlock your best run with PaceGuru—your all-in-one running companion for Apple Watch. Effortlessly sync, analyze, and improve your running performance to reach your fitness goals faster.",
  keywords: "Apple Watch running app, running tracker, pace analysis, heart rate zones, running companion, fitness app, marathon training, 5K training, running performance, Apple Watch sync",
  authors: [{ name: "PaceGuru Team" }],
  creator: "PaceGuru",
  publisher: "PaceGuru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://paceguru.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ja-JP': '/ja',
    },
  },
  openGraph: {
    title: "PaceGuru - Your Ultimate Apple Watch Running Companion",
    description: "Unlock your best run with PaceGuru—your all-in-one running companion for Apple Watch. Effortlessly sync, analyze, and improve your running performance to reach your fitness goals faster.",
    url: 'https://paceguru.app',
    siteName: 'PaceGuru',
    images: [
      {
        url: '/pageguru.png',
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
    description: "Unlock your best run with PaceGuru—your all-in-one running companion for Apple Watch. Effortlessly sync, analyze, and improve your running performance to reach your fitness goals faster.",
    images: ['/pageguru.png'],
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
    apple: '/pageguru.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
