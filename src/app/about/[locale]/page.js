import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAboutContent } from '../../../lib/about';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

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
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Blog
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-20">
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
      </article>
    </div>
  );
}