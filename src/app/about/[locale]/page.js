import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAboutContent } from '../../../lib/about';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const about = getAboutContent(locale);
  
  const texts = {
    en: {
      title: 'About PaceGuru - Apple Watch Running Companion App',
      description: 'Learn about PaceGuru, the ultimate Apple Watch running companion. Discover how our smart data analysis and personalized training insights help runners improve performance.',
      keywords: 'about paceguru, apple watch running app, running tracker, fitness app'
    },
    zh: {
      title: '关于 PaceGuru - Apple Watch 跑步伴侣应用',
      description: '了解 PaceGuru，专为 Apple Watch 设计的终极跑步伴侣。探索我们的智能数据分析和个性化训练见解如何帮助跑者提升表现。',
      keywords: '关于 paceguru, apple watch 跑步应用, 跑步追踪器, 健身应用'
    },
    ja: {
      title: 'PaceGuru について - Apple Watch ランニングコンパニオンアプリ',
      description: 'Apple Watch 向け究極のランニングコンパニオンアプリ PaceGuru について学びましょう。スマートデータ分析とパーソナライズされたトレーニングインサイトがランナーのパフォーマンス向上をどのように支援するかを発見。',
      keywords: 'paceguru について, apple watch ランニングアプリ, ランニングトラッカー, フィットネスアプリ'
    }
  };

  const t = texts[locale] || texts.en;
  const canonicalUrl = `https://paceguru.app/about/${locale}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://paceguru.app/about/en',
        'zh': 'https://paceguru.app/about/zh',
        'ja': 'https://paceguru.app/about/ja',
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'PaceGuru',
      images: [
        {
          url: 'https://paceguru.app/ograph.png',
          width: 1200,
          height: 630,
          alt: t.title,
        }
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['https://paceguru.app/ograph.png'],
      creator: '@paceguru',
    },
    keywords: t.keywords,
  };
}

export default async function AboutLocale({ params }) {
  const { locale } = await params;
  const about = getAboutContent(locale);
  
  if (!about) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About PaceGuru
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Content not found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6">
        <div className="flex gap-6 items-center">
          <Link
            href={locale === 'en' ? '/' : `/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href={`/blog/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Blog
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="prose prose-lg dark:prose-invert max-w-none p-8">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{children}</h1>,
                h2: ({children}) => <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">{children}</p>,
                a: ({href, children}) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-300">{children}</ol>,
                li: ({children}) => <li className="mb-2">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 my-6">{children}</blockquote>,
                code: ({inline, children}) => inline 
                  ? <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{children}</code>
                  : <code className="block bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">{children}</code>,
                hr: () => <hr className="border-gray-300 dark:border-gray-600 my-8" />,
                strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
              }}
            >
              {about.content}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}