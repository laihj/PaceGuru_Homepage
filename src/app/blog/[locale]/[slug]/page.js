import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getBlogPosts, getAdjacentPosts, getPostsFromSameDayInPreviousYears } from '../../../../lib/posts';
import { notFound } from 'next/navigation';
import BlogNavigation from '../../../../components/BlogNavigation';
import AppStoreDownload from '../../../../components/AppStoreDownload';
import LanguageSwitcher from '../../../../components/LanguageSwitcher';

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug('blog', locale, slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  const title = post.frontmatter.title;
  const description = post.frontmatter.excerpt || post.content.substring(0, 160).replace(/[#*`]/g, '').trim();
  const canonicalUrl = `https://paceguru.app/blog/${locale}/${slug}`;
  const imageUrl = post.frontmatter.featuredImage || 'https://paceguru.app/ograph.png';

  return {
    title: `${title} - PaceGuru Blog`,
    description: description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://paceguru.app/blog/en/${slug}`,
        'zh': `https://paceguru.app/blog/zh/${slug}`,
        'ja': `https://paceguru.app/blog/ja/${slug}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: 'PaceGuru',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: locale,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: ['PaceGuru Team'],
      section: post.frontmatter.category || 'General',
      tags: post.frontmatter.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
      creator: '@paceguru',
    },
    keywords: [
      'Apple Watch running',
      'running app',
      'pace tracking',
      ...(post.frontmatter.tags || []),
      ...(post.frontmatter.keywords || [])
    ].join(', '),
  };
}

export default async function BlogPost({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug('blog', locale, slug);
  
  if (!post) {
    notFound();
  }

  // Get adjacent posts for navigation
  const { previousPost, nextPost } = getAdjacentPosts('blog', locale, slug);
  
  // Get posts from the same day in previous years
  const relatedPosts = getPostsFromSameDayInPreviousYears('blog', locale, slug);

  // 本地化文本
  const texts = {
    en: {
      home: 'Home',
      about: 'About',
      backToBlog: '← Back to Blog'
    },
    zh: {
      home: '首页',
      about: '关于',
      backToBlog: '← 返回博客'
    },
    ja: {
      home: 'ホーム',
      about: 'About',
      backToBlog: '← ブログに戻る'
    }
  };

  const t = texts[locale] || texts.en;

  // Get full image URL for schema
  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://paceguru.app/ograph.png';
    if (imgPath.startsWith('http')) return imgPath;
    return `https://paceguru.app${imgPath}`;
  };

  const imageUrl = getImageUrl(post.frontmatter.featuredImage);

  // Generate article schema JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.content.substring(0, 160).replace(/[#*`]/g, '').trim(),
    image: imageUrl,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: 'PaceGuru Team',
      url: 'https://paceguru.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PaceGuru',
      url: 'https://paceguru.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://paceguru.app/ograph.png',
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://paceguru.app/blog/${locale}/${slug}`,
    },
    articleSection: post.frontmatter.category || 'General',
    keywords: [
      'Apple Watch running',
      'running app',
      'pace tracking',
      ...(post.frontmatter.tags || [])
    ].filter(Boolean).join(', '),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema, null, 2)
        }}
      />
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6 z-10">
        <div className="flex gap-6 items-center">
          <Link
            href={locale === 'en' ? '/' : `/${locale}`}
            className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
          >
            {t.home}
          </Link>
          <Link
            href={`/about/${locale}`}
            className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
          >
            {t.about}
          </Link>
          <a
            href="https://www.laihjx.com/paceguru-privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            {locale === 'en' ? 'Privacy' : locale === 'zh' ? '隐私' : 'プライバシー'}
          </a>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Purple glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#8172AD]/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative max-w-4xl mx-auto px-4 py-28">
        <div className="mb-8">
          <Link
            href={`/blog/${locale}`}
            className="text-[#8172AD] hover:underline mb-4 inline-block"
          >
            {t.backToBlog}
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <header className="p-8 pb-6">
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
              {post.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString(
                  locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }
                )}
              </time>

              {post.frontmatter.category && (
                <span className="bg-[#8172AD]/20 text-[#8172AD] border border-[#8172AD]/30 px-3 py-1 rounded-full font-medium">
                  {post.frontmatter.category}
                </span>
              )}
            </div>
          </header>

          <hr className="border-white/10 mx-8" />

          <div className="prose prose-lg prose-invert max-w-none p-8 pt-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold text-white mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                a: ({href, children}) => <a href={href} className="text-[#8172AD] hover:underline">{children}</a>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
                li: ({children}) => <li className="mb-2">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-[#8172AD] pl-4 italic text-gray-400 my-4">{children}</blockquote>,
                img: ({src, alt}) => {
                  const altText = alt || src?.split('/').pop()?.split('.')[0].replace(/[-_]/g, ' ') || 'PaceGuru running app screenshot';
                  return <img src={src} alt={altText} className="w-4/5 max-w-full h-auto mx-auto block border border-white/10 rounded-lg" loading="lazy" />;
                },
                code: ({inline, children}) => inline
                  ? <code className="bg-white/10 px-2 py-1 rounded text-sm">{children}</code>
                  : <code className="block bg-white/10 p-4 rounded text-sm overflow-x-auto">{children}</code>,
                table: ({children}) => <div className="overflow-x-auto my-6"><table className="min-w-full border border-white/10 text-gray-300">{children}</table></div>,
                thead: ({children}) => <thead className="bg-white/5">{children}</thead>,
                th: ({children}) => <th className="border border-white/10 px-4 py-2 text-left font-semibold text-white">{children}</th>,
                td: ({children}) => <td className="border border-white/10 px-4 py-2">{children}</td>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* App Store Download CTA */}
          <div className="px-8 pb-8 not-prose">
            <AppStoreDownload locale={locale} className="mt-8" />
          </div>
        </div>

        {/* Blog Navigation - Previous/Next and Related Posts */}
        <BlogNavigation
          locale={locale}
          previousPost={previousPost}
          nextPost={nextPost}
          relatedPosts={relatedPosts}
          texts={texts}
        />
      </main>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const locales = ['en', 'zh', 'ja'];
  const params = [];
  
  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug
      });
    }
  }
  
  return params;
}