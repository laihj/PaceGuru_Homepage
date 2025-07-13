import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getBlogPosts } from '../../../../lib/posts';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug('blog', locale, slug);
  
  if (!post) {
    notFound();
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
            href={`/about/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            About
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Link 
            href={`/blog/${locale}`}
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Blog
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
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-medium">
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
                a: ({href, children}) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300">{children}</ol>,
                li: ({children}) => <li className="mb-2">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">{children}</blockquote>,
                img: ({src, alt}) => <img src={src} alt={alt} className="max-w-full h-auto mx-auto block border border-gray-200 dark:border-gray-700 rounded-lg" style={{maxWidth: '600px'}} />,
                code: ({inline, children}) => inline 
                  ? <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{children}</code>
                  : <code className="block bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">{children}</code>
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
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