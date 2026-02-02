import Link from 'next/link';
import { getBlogPosts } from '../../../lib/posts';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  const texts = {
    en: {
      title: 'PaceGuru Running Blog - Apple Watch Training Tips',
      description: 'Discover expert tips, tutorials, and insights to improve your running performance with Apple Watch. Get training advice, pace tracking guides, and fitness strategies.',
      keywords: 'Apple Watch running, running app, pace tracking, running tips, fitness blog'
    },
    zh: {
      title: 'PaceGuru 跑步博客 - Apple Watch 训练技巧',
      description: '探索使用 Apple Watch 提升跑步表现的专业技巧、教程和见解。获取训练建议、配速跟踪指南和健身策略。',
      keywords: 'Apple Watch 跑步, 跑步应用, 配速跟踪, 跑步技巧, 健身博客'
    },
    ja: {
      title: 'PaceGuru ランニングブログ - Apple Watch トレーニングのヒント',
      description: 'Apple Watch を使用したランニングパフォーマンス向上のための専門的なヒント、チュートリアル、洞察を発見しましょう。トレーニングアドバイス、ペース追跡ガイド、フィットネス戦略を入手。',
      keywords: 'Apple Watch ランニング, ランニングアプリ, ペーストラッキング, ランニングヒント, フィットネスブログ'
    }
  };

  const t = texts[locale] || texts.en;
  const canonicalUrl = `https://paceguru.app/blog/${locale}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://paceguru.app/blog/en',
        'zh': 'https://paceguru.app/blog/zh',
        'ja': 'https://paceguru.app/blog/ja',
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

export default async function BlogLocale({ params }) {
  const { locale } = await params;
  const posts = getBlogPosts(locale);

  // 本地化文本
  const texts = {
    en: {
      title: 'PaceGuru Blog',
      subtitle: 'Tips, tutorials, and insights for better running performance',
      noPosts: 'No posts yet',
      noPostsDesc: 'Stay tuned for upcoming content!',
      readMore: 'Read more →',
      home: 'Home',
      about: 'About'
    },
    zh: {
      title: 'PaceGuru 博客',
      subtitle: '提升跑步表现的技巧、教程和见解',
      noPosts: '暂无文章',
      noPostsDesc: '敬请期待即将发布的内容！',
      readMore: '阅读更多 →',
      home: '首页',
      about: '关于'
    },
    ja: {
      title: 'PaceGuru ブログ',
      subtitle: 'より良いランニングパフォーマンスのためのヒント、チュートリアル、洞察',
      noPosts: '投稿はまだありません',
      noPostsDesc: '今後のコンテンツをお楽しみに！',
      readMore: '続きを読む →',
      home: 'ホーム',
      about: 'について'
    }
  };

  const t = texts[locale] || texts.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8172AD]/10 to-[#8172AD]/20 dark:from-[#8172AD]/20 dark:to-[#8172AD]/30">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6">
        <div className="flex gap-6 items-center">
          <Link
            href={locale === 'en' ? '/' : `/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-[#8172AD] dark:hover:text-[#8172AD] font-medium transition-colors"
          >
            {t.home}
          </Link>
          <Link
            href={`/about/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-[#8172AD] dark:hover:text-[#8172AD] font-medium transition-colors"
          >
            {t.about}
          </Link>
          <a
            href="https://www.laihjx.com/paceguru-privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors"
          >
            {locale === 'en' ? 'Privacy' : locale === 'zh' ? '隐私' : 'プライバシー'}
          </a>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.noPosts}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t.noPostsDesc}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <Link 
                      href={`/blog/${locale}/${post.slug}`}
                      className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-[#8172AD] dark:hover:text-[#8172AD] transition-colors"
                    >
                      {post.frontmatter.title}
                    </Link>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(post.frontmatter.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US')}
                    </div>
                  </div>
                  {post.frontmatter.category && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {post.frontmatter.category}
                    </span>
                  )}
                </div>
                
                {post.frontmatter.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.frontmatter.excerpt}
                  </p>
                )}
                
                <Link 
                  href={`/blog/${locale}/${post.slug}`}
                  className="text-[#8172AD] dark:text-[#8172AD] hover:underline font-medium"
                >
                  {t.readMore}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}