import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getBlogPosts, getAdjacentPosts, getPostsFromSameDayInPreviousYears } from '../../../../lib/posts';
import { notFound } from 'next/navigation';
import BlogNavigation from '../../../../components/BlogNavigation';

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

  // Generate article schema JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.content.substring(0, 160).replace(/[#*`]/g, '').trim(),
    image: post.frontmatter.featuredImage || 'https://paceguru.app/ograph.png',
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
    ].join(', '),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8172AD]/10 to-[#8172AD]/20 dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema, null, 2)
        }}
      />
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6">
        <div className="flex gap-6 items-center">
          <Link
            href={locale === 'en' ? '/' : `/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-[#8172AD] font-medium transition-colors"
          >
            {t.home}
          </Link>
          <Link
            href={`/about/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-[#8172AD] font-medium transition-colors"
          >
            {t.about}
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Link 
            href={`/blog/${locale}`}
            className="text-[#8172AD] hover:underline mb-4 inline-block"
          >
            {t.backToBlog}
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <header className="p-8 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                <span className="bg-[#8172AD]/10 text-[#8172AD] px-3 py-1 rounded-full font-medium">
                  {post.frontmatter.category}
                </span>
              )}
            </div>
          </header>
          
          <hr className="border-gray-200 dark:border-gray-700 mx-8" />
          
          <div className="prose prose-lg dark:prose-invert max-w-none p-8 pt-6">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{children}</p>,
                a: ({href, children}) => <a href={href} className="text-[#8172AD] hover:underline">{children}</a>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300">{children}</ol>,
                li: ({children}) => <li className="mb-2">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">{children}</blockquote>,
                img: ({src, alt}) => <img src={src} alt={alt} className="w-full max-w-full h-auto mx-auto block border border-gray-200 dark:border-gray-700 rounded-lg" />,
                code: ({inline, children}) => inline 
                  ? <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{children}</code>
                  : <code className="block bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">{children}</code>
              }}
            >
              {post.content}
            </ReactMarkdown>
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
      </article>
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