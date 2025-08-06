import Link from 'next/link';

export default function BlogNavigation({ 
  locale, 
  previousPost, 
  nextPost, 
  relatedPosts,
  texts 
}) {
  const navigationTexts = {
    en: {
      previousPost: '← Previous Post',
      nextPost: 'Next Post →',
      relatedPosts: 'Posts from the Same Day in Previous Years',
      readMore: 'Read More'
    },
    zh: {
      previousPost: '← 上一篇',
      nextPost: '下一篇 →',
      relatedPosts: '往年同日发布的文章',
      readMore: '阅读更多'
    },
    ja: {
      previousPost: '← 前の投稿',
      nextPost: '次の投稿 →',
      relatedPosts: '過去の同じ日の投稿',
      readMore: '続きを読む'
    }
  };

  const t = navigationTexts[locale] || navigationTexts.en;

  return (
    <div className="mt-8 space-y-8">
      {/* Previous/Next Navigation */}
      {(previousPost || nextPost) && (
        <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex-1">
            {previousPost && (
              <Link
                href={`/blog/${locale}/${previousPost.slug}`}
                className="text-[#8172AD] hover:underline font-medium"
              >
                {t.previousPost}
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {previousPost.frontmatter.title}
                </div>
              </Link>
            )}
          </div>
          
          <div className="flex-1 text-right">
            {nextPost && (
              <Link
                href={`/blog/${locale}/${nextPost.slug}`}
                className="text-[#8172AD] hover:underline font-medium"
              >
                {t.nextPost}
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {nextPost.frontmatter.title}
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Related Posts from Same Day in Previous Years */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.relatedPosts}
          </h3>
          <div className="space-y-3">
            {relatedPosts.map((post) => (
              <div key={post.slug} className="flex justify-between items-center">
                <div className="flex-1">
                  <Link
                    href={`/blog/${locale}/${post.slug}`}
                    className="text-[#8172AD] hover:underline font-medium"
                  >
                    {post.frontmatter.title}
                  </Link>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US',
                      { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }
                    )}
                    {post.frontmatter.category && (
                      <span className="ml-2 bg-[#8172AD]/10 text-[#8172AD] px-2 py-1 rounded text-xs">
                        {post.frontmatter.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}