import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default async function LocalizedHome({ params }) {
  const { locale } = await params;
  
  // 本地化文本
  const texts = {
    en: {
      title: "PaceGuru",
      subtitle: "Unlock your best run with PaceGuru—your all-in-one running companion for Apple Watch. Effortlessly sync, analyze, and improve your running performance to reach your fitness goals faster.",
      downloadApp: "Download on App Store",
      forAppleWatch: "For Apple Watch & iPhone",
      keyFeatures: "Key Features",
      keyFeaturesSubtitle: "Everything you need to become a better runner",
      getStarted: "Get Started Today",
      getStartedSubtitle: "Download PaceGuru and unlock your full running potential today!",
      contact: "Contact us:",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      blog: "Blog",
      about: "About",
      features: {
        sync: {
          title: "Seamless Apple Watch Sync",
          description: "Instantly import and analyze your running data from your Apple Watch."
        },
        tracking: {
          title: "Advanced Run Tracking",
          description: "Monitor weekly, monthly, and 30-day progress with detailed stats and intuitive charts."
        },
        insights: {
          title: "Performance Insights",
          description: "Visualize distance, pace, heart rate, and calories burned to spot trends and areas for improvement."
        },
        training: {
          title: "Personalized Training Plans",
          description: "Create custom heart rate and pace zones. Design and sync tailored running plans directly to your Apple Watch."
        },
        plan: {
          title: "Plan, Run, Review",
          description: "Set your goals, track every run, and review your progress to keep improving."
        },
        analytics: {
          title: "Smart Analytics",
          description: "Whether you're training for your first 5K or chasing a marathon PR, get the insights you need to run smarter."
        }
      }
    },
    zh: {
      title: "PaceGuru",
      subtitle: "用PaceGuru解锁您的最佳跑步表现——您的Apple Watch全能跑步伴侣。轻松同步、分析和改善您的跑步表现，更快达成健身目标。",
      downloadApp: "在App Store下载",
      forAppleWatch: "适用于Apple Watch和iPhone",
      keyFeatures: "核心功能",
      keyFeaturesSubtitle: "成为更好跑者所需的一切",
      getStarted: "立即开始",
      getStartedSubtitle: "下载PaceGuru，释放您的跑步潜能！",
      contact: "联系我们：",
      termsOfService: "服务条款",
      privacyPolicy: "隐私政策",
      blog: "博客",
      about: "关于",
      features: {
        sync: {
          title: "无缝Apple Watch同步",
          description: "即时导入和分析您Apple Watch的跑步数据。"
        },
        tracking: {
          title: "先进跑步追踪",
          description: "通过详细统计和直观图表监控每周、每月和30天的进度。"
        },
        insights: {
          title: "性能洞察",
          description: "可视化距离、配速、心率和卡路里消耗，发现趋势和改进空间。"
        },
        training: {
          title: "个性化训练计划",
          description: "创建自定义心率和配速区间。设计并同步定制跑步计划直接到您的Apple Watch。"
        },
        plan: {
          title: "规划、跑步、回顾",
          description: "设定目标，追踪每次跑步，回顾进度以持续改进。"
        },
        analytics: {
          title: "智能分析",
          description: "无论您是在训练第一个5K还是追求马拉松个人最佳，都能获得更智能跑步所需的洞察。"
        }
      }
    },
    ja: {
      title: "PaceGuru",
      subtitle: "PaceGuruでベストランを解き放とう—Apple Watchのオールインワンランニングコンパニオン。ランニングパフォーマンスを簡単に同期、分析、改善して、フィットネス目標をより早く達成。",
      downloadApp: "App Storeでダウンロード",
      forAppleWatch: "Apple WatchとiPhone対応",
      keyFeatures: "主要機能",
      keyFeaturesSubtitle: "より良いランナーになるために必要なすべて",
      getStarted: "今日から始めよう",
      getStartedSubtitle: "PaceGuruをダウンロードして、あなたのランニングポテンシャルを解放しよう！",
      contact: "お問い合わせ：",
      termsOfService: "利用規約",
      privacyPolicy: "プライバシーポリシー",
      blog: "ブログ",
      about: "About",
      features: {
        sync: {
          title: "シームレスなApple Watch同期",
          description: "Apple Watchのランニングデータを即座にインポートして分析。"
        },
        tracking: {
          title: "高度なラン追跡",
          description: "詳細な統計と直感的なチャートで週次、月次、30日間の進捗を監視。"
        },
        insights: {
          title: "パフォーマンス洞察",
          description: "距離、ペース、心拍数、消費カロリーを可視化してトレンドと改善領域を発見。"
        },
        training: {
          title: "パーソナライズされたトレーニングプラン",
          description: "カスタム心拍数とペースゾーンを作成。カスタマイズされたランニングプランを設計してApple Watchに直接同期。"
        },
        plan: {
          title: "計画、ラン、レビュー",
          description: "目標を設定し、すべてのランを追跡し、進捗をレビューして改善を続ける。"
        },
        analytics: {
          title: "スマート分析",
          description: "初めての5KトレーニングでもマラソンのPR追求でも、よりスマートに走るために必要な洞察を取得。"
        }
      }
    }
  };

  const t = texts[locale] || texts.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6">
        <div className="flex gap-6 items-center">
          <Link
            href={`/blog/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {t.blog}
          </Link>
          <Link
            href={`/about/${locale}`}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {t.about}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-6 flex justify-center">
            <Image
              src="/pageguru.png"
              alt="PaceGuru Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-[family-name:var(--font-geist-sans)]">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="https://apps.apple.com/us/app/paceguru/id6468926049"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 min-w-48"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            {t.downloadApp}
          </a>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t.forAppleWatch}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.keyFeatures}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.keyFeaturesSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 12a8 8 0 0 1 7.843-8L11 3.5l1.5-1.5 3 3-3 3L11 6.5l.843.5a6 6 0 1 1-5.685 4.5H4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t.features.sync.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.features.sync.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t.features.tracking.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.features.tracking.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t.features.insights.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.features.insights.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t.features.training.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.features.training.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t.features.plan.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.features.plan.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t.features.analytics.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.features.analytics.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Legal Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t.getStarted}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            {t.getStartedSubtitle}
          </p>
          
          <div className="mb-16">
            <a
              href="https://apps.apple.com/us/app/paceguru/id6468926049"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t.downloadApp}
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <strong>{t.contact}</strong>
                <a href="mailto:hamainter@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
                  hamainter@gmail.com
                </a>
              </div>
              <div className="flex gap-6">
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.termsOfService}
                </a>
                <a
                  href="https://www.laihjx.com/paceguru-privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.privacyPolicy}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}