import Link from 'next/link';
import { getBlogPosts } from '../../../lib/posts';

export default async function BlogLocale({ params }) {
  const { locale } = await params;
  const posts = getBlogPosts(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6">
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            About
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PaceGuru Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tips, tutorials, and insights for better running performance
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No posts yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay tuned for upcoming content!
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
                      className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.frontmatter.title}
                    </Link>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(post.frontmatter.date).toLocaleDateString('en-US')}
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
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}