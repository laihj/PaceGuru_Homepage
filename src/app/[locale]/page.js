import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import QandA from "../../components/QandA";
import PhoneMockup from "../../components/PhoneMockup";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const localeData = {
    en: {
      title: "PaceGuru - Your Ultimate Apple Watch Running Companion",
      description: "PaceGuru - Your Apple Watch running companion. Sync, analyze, and improve your running performance.",
      keywords: "Apple Watch running app, running tracker, pace analysis, heart rate zones, training plans, VDOT calculator, marathon training, running performance",
      locale: "en_US"
    },
    zh: {
      title: "PaceGuru - Apple Watch 跑步伴侣",
      description: "PaceGuru - 您的 Apple Watch 跑步伴侣。同步、分析、提升跑步表现。",
      keywords: "Apple Watch 跑步应用, 跑步追踪, 配速分析, 心率区间, 训练计划, VDOT计算器, 马拉松训练, 跑步表现",
      locale: "zh_CN"
    },
    ja: {
      title: "PaceGuru - Apple Watchランニングコンパニオン",
      description: "PaceGuru - あなたのApple Watchランニングコンパニオン。ランニングパフォーマンスを同期・分析・改善。",
      keywords: "Apple Watchランニングアプリ, ランニングトラッカー, ペース分析, 心拍ゾーン, トレーニング計画, VDOT計算機, マラソントレーニング, ランニングパフォーマンス",
      locale: "ja_JP"
    }
  };

  const data = localeData[locale] || localeData.en;
  const baseUrl = 'https://paceguru.app';
  const pageUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      url: pageUrl,
      siteName: 'PaceGuru',
      images: [
        {
          url: '/ograph.png',
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: data.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['/ograph.png'],
      creator: '@paceguru',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': locale === 'en' ? baseUrl : `${baseUrl}/en`,
        'zh-CN': locale === 'zh' ? baseUrl : `${baseUrl}/zh`,
        'ja': locale === 'ja' ? baseUrl : `${baseUrl}/ja`,
      },
    },
  };
}

export default async function LocalizedHome({ params }) {
  const { locale } = await params;

  const texts = {
    en: {
      title: "PaceGuru",
      heroTagline: "Train Smarter.\nRun Faster.",
      heroSubtitle: "Your all-in-one running companion for Apple Watch. Effortlessly sync, analyze, and crush your running goals.",
      heroBadge: "Apple Watch & iPhone",
      downloadApp: "Download on App Store",
      freeLabel: "Free to Download",
      statsRating: "App Store Rating",
      statsRatingValue: "4.8 ★",
      statsDownloadsValue: "10K+",
      statsDownloads: "Active Runners",
      statsPlansValue: "5+",
      statsPlans: "Training Plans",
      showcaseTitle: "Everything You Need to Level Up",
      showcase: [
        {
          tag: "Apple Watch",
          title: "Seamless Sync,\nInstant Insights",
          desc: "Import your Apple Watch running data automatically. See every split, pace zone, and heart rate beat visualized in seconds.",
        },
        {
          tag: "AI Training",
          title: "Plans Built\nAround You",
          desc: "Get personalized training plans powered by proven methods like Hansons and Daniels. Sync directly to your Apple Watch and run with purpose.",
        },
        {
          tag: "Analytics",
          title: "Data That\nDrives Results",
          desc: "Track weekly mileage, monitor heart rate zones, and spot performance trends. Every run tells a story — PaceGuru helps you read it.",
        },
      ],
      keyFeatures: "All Features",
      keyFeaturesSubtitle: "Everything you need to become a better runner",
      testimonialsTitle: "Loved by Runners",
      testimonials: [
        {
          name: "Sarah K.",
          tag: "Marathon Runner · 3:42 PR",
          text: "PaceGuru completely changed how I train. The Apple Watch sync is flawless and the training plans actually work.",
        },
        {
          name: "Marcus L.",
          tag: "Half Marathon · 1:48 PR",
          text: "I've tried every running app. PaceGuru is the only one that gives me real actionable data from my Watch.",
        },
        {
          name: "Yuki T.",
          tag: "5K Runner · 22:30 PR",
          text: "The AI analysis after each run is incredibly motivating. I love seeing exactly where I can improve.",
        },
      ],
      getStarted: "Start Your Best Run Today",
      getStartedSubtitle: "Join thousands of runners already training smarter with PaceGuru.",
      contact: "Contact:",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      blog: "Blog",
      about: "About",
      features: {
        sync: { title: "Apple Watch Sync", description: "Instantly import and analyze your running data from your Apple Watch." },
        tracking: { title: "Run Tracking", description: "Monitor weekly, monthly, and 30-day progress with detailed stats and intuitive charts." },
        insights: { title: "Performance Insights", description: "Visualize distance, pace, heart rate, and calories burned to spot trends." },
        training: { title: "Training Plans", description: "Create custom heart rate and pace zones. Sync tailored plans to your Apple Watch." },
        plan: { title: "Plan, Run, Review", description: "Set goals, track every run, and review your progress to keep improving." },
        analytics: { title: "Smart Analytics", description: "Get the insights you need to run smarter — whether it's your first 5K or a marathon PR." },
        tools: { title: "Running Tools", description: "Pace calculator, VDOT calculator, and other essential running tools." },
        shoes: { title: "Shoe Tracking", description: "Track your running shoes mileage and usage history across every run." },
        ai: { title: "AI Feedback", description: "Get AI-powered analysis and feedback on every run to improve performance." },
      }
    },
    zh: {
      title: "PaceGuru",
      heroTagline: "更智能训练，\n更快奔跑。",
      heroSubtitle: "您的 Apple Watch 全能跑步伴侣。轻松同步、分析，实现跑步目标。",
      heroBadge: "Apple Watch 和 iPhone",
      downloadApp: "在 App Store 下载",
      freeLabel: "免费下载",
      statsRating: "App Store 评分",
      statsRatingValue: "4.8 ★",
      statsDownloadsValue: "10K+",
      statsDownloads: "活跃跑者",
      statsPlansValue: "5+",
      statsPlans: "训练计划",
      showcaseTitle: "全面提升，一步到位",
      showcase: [
        {
          tag: "Apple Watch",
          title: "无缝同步，\n即时洞察",
          desc: "自动导入 Apple Watch 跑步数据，秒速可视化每段配速、心率区间，让数据为你所用。",
        },
        {
          tag: "AI 训练",
          title: "专为你打造\n的训练计划",
          desc: "基于汉森、丹尼尔斯等权威训练法，生成个性化计划。直接同步至 Apple Watch，每次跑步都有目的。",
        },
        {
          tag: "数据分析",
          title: "数据驱动\n更好成绩",
          desc: "追踪周跑量、监控心率区间、发现成绩趋势。每次跑步都在讲述故事，PaceGuru 帮你读懂它。",
        },
      ],
      keyFeatures: "全部功能",
      keyFeaturesSubtitle: "成为更好跑者所需的一切",
      testimonialsTitle: "跑者真实评价",
      testimonials: [
        {
          name: "Sarah K.",
          tag: "马拉松跑者 · 3:42 个人最好",
          text: "PaceGuru 彻底改变了我的训练方式。Apple Watch 同步超流畅，训练计划真的有效。",
        },
        {
          name: "Marcus L.",
          tag: "半程马拉松 · 1:48 个人最好",
          text: "我用过各种跑步 App，PaceGuru 是唯一能给我真正可执行数据洞察的一个。",
        },
        {
          name: "Yuki T.",
          tag: "5K 跑者 · 22:30 个人最好",
          text: "每次跑完的 AI 分析超有激励感，能清楚看到自己哪里还能进步。",
        },
      ],
      getStarted: "立即开始你最好的跑步",
      getStartedSubtitle: "加入数千位已在用 PaceGuru 更智能训练的跑者。",
      contact: "联系我们：",
      termsOfService: "服务条款",
      privacyPolicy: "隐私政策",
      blog: "博客",
      about: "关于",
      features: {
        sync: { title: "Apple Watch 同步", description: "即时导入并分析您 Apple Watch 的跑步数据。" },
        tracking: { title: "跑步追踪", description: "通过详细统计和直观图表监控每周、每月进度。" },
        insights: { title: "性能洞察", description: "可视化距离、配速、心率和卡路里，发现改进空间。" },
        training: { title: "训练计划", description: "创建自定义心率和配速区间，同步定制计划到 Apple Watch。" },
        plan: { title: "规划、跑步、回顾", description: "设定目标，追踪每次跑步，回顾进度持续改进。" },
        analytics: { title: "智能分析", description: "无论首个5K还是马拉松PB，获得更智能跑步所需的洞察。" },
        tools: { title: "跑步工具", description: "配速计算器、VDOT计算器等实用跑步工具。" },
        shoes: { title: "跑鞋记录", description: "追踪每双跑鞋的里程和使用历史。" },
        ai: { title: "AI 反馈", description: "AI 评价每次跑步，提供个性化改进建议。" },
      }
    },
    ja: {
      title: "PaceGuru",
      heroTagline: "スマートに鍛え、\n速く走ろう。",
      heroSubtitle: "Apple Watchのオールインワンランニングコンパニオン。簡単に同期・分析してランニング目標を達成。",
      heroBadge: "Apple Watch & iPhone対応",
      downloadApp: "App Storeでダウンロード",
      freeLabel: "無料でダウンロード",
      statsRating: "App Store評価",
      statsRatingValue: "4.8 ★",
      statsDownloadsValue: "10K+",
      statsDownloads: "アクティブランナー",
      statsPlansValue: "5+",
      statsPlans: "トレーニングプラン",
      showcaseTitle: "レベルアップに必要なすべて",
      showcase: [
        {
          tag: "Apple Watch",
          title: "シームレスな同期、\n即座の洞察",
          desc: "Apple Watchのランニングデータを自動インポート。ペースゾーン・心拍数を秒で可視化。",
        },
        {
          tag: "AIトレーニング",
          title: "あなたのための\nプランを作成",
          desc: "ハンソン・ダニエルズなど実績ある手法によるパーソナライズされたトレーニングプラン。Apple Watchに直接同期。",
        },
        {
          tag: "分析",
          title: "結果を生む\nデータ分析",
          desc: "週間走行距離・心拍ゾーン・パフォーマンストレンドを追跡。PaceGuruがあなたのランを読み解く。",
        },
      ],
      keyFeatures: "全機能",
      keyFeaturesSubtitle: "より良いランナーになるために必要なすべて",
      testimonialsTitle: "ランナーの声",
      testimonials: [
        {
          name: "Sarah K.",
          tag: "マラソンランナー · 3:42 自己ベスト",
          text: "PaceGuruはトレーニング方法を一変させました。Apple Watch同期は完璧で、プランが実際に機能します。",
        },
        {
          name: "Marcus L.",
          tag: "ハーフマラソン · 1:48 自己ベスト",
          text: "あらゆるランニングアプリを試しましたが、PaceGuruだけが本当に実行可能なデータを提供してくれます。",
        },
        {
          name: "Yuki T.",
          tag: "5Kランナー · 22:30 自己ベスト",
          text: "ランごとのAI分析がとてもモチベーションになります。どこを改善できるか明確にわかります。",
        },
      ],
      getStarted: "今日から最高のランを始めよう",
      getStartedSubtitle: "すでに何千人ものランナーがPaceGuruでスマートにトレーニングしています。",
      contact: "お問い合わせ：",
      termsOfService: "利用規約",
      privacyPolicy: "プライバシーポリシー",
      blog: "ブログ",
      about: "About",
      features: {
        sync: { title: "Apple Watch同期", description: "Apple Watchのランニングデータを即座にインポートして分析。" },
        tracking: { title: "ラン追跡", description: "詳細な統計と直感的なチャートで週次・月次の進捗を監視。" },
        insights: { title: "パフォーマンス洞察", description: "距離・ペース・心拍数・消費カロリーを可視化。" },
        training: { title: "トレーニングプラン", description: "カスタム心拍ゾーンを作成し、Apple Watchに直接同期。" },
        plan: { title: "計画、ラン、レビュー", description: "目標設定・追跡・レビューで継続的に改善。" },
        analytics: { title: "スマート分析", description: "初めての5KでもマラソンPRでも、必要な洞察を取得。" },
        tools: { title: "ランニングツール", description: "ペース計算機・VDOT計算機などのツールを提供。" },
        shoes: { title: "シューズ記録", description: "ランニングシューズの走行距離と使用履歴を追跡。" },
        ai: { title: "AIフィードバック", description: "毎回のランニングにAIが個別フィードバックを提供。" },
      }
    }
  };

  const t = texts[locale] || texts.en;

  const schemaData = {
    en: {
      name: "PaceGuru",
      description: "PaceGuru - Your Apple Watch running companion. Sync, analyze, and improve your running performance.",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, watchOS",
      offers: { price: "0", priceCurrency: "USD" },
      aggregateRating: { ratingValue: "4.8", ratingCount: "1250" }
    },
    zh: {
      name: "PaceGuru",
      description: "PaceGuru - 您的 Apple Watch 跑步伴侣。同步、分析、提升跑步表现。",
      applicationCategory: "健康应用",
      operatingSystem: "iOS, watchOS",
      offers: { price: "0", priceCurrency: "CNY" },
      aggregateRating: { ratingValue: "4.8", ratingCount: "1250" }
    },
    ja: {
      name: "PaceGuru",
      description: "PaceGuru - あなたのApple Watchランニングコンパニオン。ランニングパフォーマンスを同期・分析・改善。",
      applicationCategory: "ヘルスケアアプリ",
      operatingSystem: "iOS, watchOS",
      offers: { price: "0", priceCurrency: "JPY" },
      aggregateRating: { ratingValue: "4.8", ratingCount: "1250" }
    }
  };

  const appData = schemaData[locale] || schemaData.en;
  const baseUrl = 'https://paceguru.app';
  const pageUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appData.name,
    description: appData.description,
    applicationCategory: appData.applicationCategory,
    operatingSystem: appData.operatingSystem,
    offers: { '@type': 'Offer', price: appData.offers.price, priceCurrency: appData.offers.priceCurrency },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: appData.aggregateRating.ratingValue,
      ratingCount: appData.aggregateRating.ratingCount,
      bestRating: '5',
      worstRating: '1'
    },
    url: 'https://apps.apple.com/us/app/paceguru/id6468926049',
    author: { '@type': 'Organization', name: 'PaceGuru Team', url: baseUrl },
    publisher: { '@type': 'Organization', name: 'PaceGuru', url: baseUrl },
    featureList: ['Apple Watch sync', 'Running data analysis', 'Heart rate zones', 'Training plans', 'VDOT calculator', 'Pace calculator', 'Shoe tracking', 'AI running analysis']
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PaceGuru',
    url: baseUrl,
    logo: `${baseUrl}/pageguru.png`,
    description: appData.description,
    contactPoint: { '@type': 'ContactPoint', email: 'hamainter@gmail.com', contactType: 'customer service' },
    sameAs: ['https://apps.apple.com/us/app/paceguru/id6468926049']
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appData.name,
    url: baseUrl,
    description: appData.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/blog/{locale}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const featureIcons = [
    // sync - watch
    <svg key="sync" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 7.843-8L11 3.5l1.5-1.5 3 3-3 3L11 6.5l.843.5a6 6 0 1 1-5.685 4.5H4z"/></svg>,
    // tracking - chart
    <svg key="tracking" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>,
    // insights - eye
    <svg key="insights" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>,
    // training - star
    <svg key="training" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    // plan - target
    <svg key="plan" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>,
    // analytics - globe
    <svg key="analytics" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
    // tools - settings
    <svg key="tools" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>,
    // shoes - edit/shoe
    <svg key="shoes" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75 1.84-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/></svg>,
    // ai - check/sparkle
    <svg key="ai" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>,
  ];

  const featureKeys = ['sync', 'tracking', 'insights', 'training', 'plan', 'analytics', 'tools', 'shoes', 'ai'];

  const AppStoreButton = ({ size = 'lg' }) => (
    <a
      href="https://apps.apple.com/us/app/paceguru/id6468926049"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 ${size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'}`}
    >
      <svg className={size === 'lg' ? 'w-7 h-7' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <span>{t.downloadApp}</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema, null, 2) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema, null, 2) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema, null, 2) }} />

      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-6 z-10">
        <div className="flex gap-6 items-center">
          <Link href={`/blog/${locale}`} className="text-gray-400 hover:text-white font-medium transition-colors text-sm">
            {t.blog}
          </Link>
          <Link href={`/about/${locale}`} className="text-gray-400 hover:text-white font-medium transition-colors text-sm">
            {t.about}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Purple glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#8172AD]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm text-gray-300">
                  <Image src="/pageguru.png" alt="PaceGuru" width={18} height={18} className="rounded-md" />
                  {t.heroBadge}
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 whitespace-pre-line font-[family-name:var(--font-geist-sans)]">
                  {t.heroTagline}
                </h1>

                <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
                  {t.heroSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <AppStoreButton size="lg" />
                  <span className="text-gray-500 text-sm">{t.freeLabel}</span>
                </div>

                {/* Mini rating */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8172AD] to-indigo-500 border-2 border-[#0a0a0a]" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-semibold">4.8 ★</span> from 1,250+ runners
                  </div>
                </div>
              </div>

              {/* Right – phone mockup */}
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup
                  src={`/images/screenshots/${locale}/home.png`}
                  alt={t.heroTagline}
                  label={t.heroBadge}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BANNER ── */}
        <section className="border-y border-white/10 bg-white/5">
          <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">{t.statsRatingValue}</div>
              <div className="text-sm text-gray-400">{t.statsRating}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">{t.statsDownloadsValue}</div>
              <div className="text-sm text-gray-400">{t.statsDownloads}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">{t.statsPlansValue}</div>
              <div className="text-sm text-gray-400">{t.statsPlans}</div>
            </div>
          </div>
        </section>

        {/* ── FEATURE SHOWCASE ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-20">
              {t.showcaseTitle}
            </h2>

            <div className="space-y-28">
              {(() => {
                // showcase 三项顺序固定：Apple Watch / AI Training / Analytics
                const shotKeys = ['sync', 'training', 'analytics'];
                return t.showcase.map((item, i) => (
                  <div
                    key={i}
                    className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    {/* Text */}
                    <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="inline-block bg-[#8172AD]/20 text-[#8172AD] border border-[#8172AD]/30 rounded-full px-3 py-1 text-xs font-semibold mb-6 uppercase tracking-wider">
                        {item.tag}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6 whitespace-pre-line">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Mockup */}
                    <div className={`flex justify-center ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <PhoneMockup
                        src={`/images/screenshots/${locale}/${shotKeys[i]}.png`}
                        alt={`${item.title}`}
                        label={item.tag}
                      />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </section>

        {/* ── FEATURES GRID ── */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t.keyFeatures}</h2>
              <p className="text-gray-400 text-lg">{t.keyFeaturesSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featureKeys.map((key, i) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#8172AD]/50 hover:bg-[#8172AD]/5 transition-all group">
                  <div className="w-10 h-10 bg-[#8172AD]/20 rounded-xl flex items-center justify-center mb-4 text-[#8172AD] group-hover:bg-[#8172AD]/30 transition-colors">
                    {featureIcons[i]}
                  </div>
                  <h3 className="font-bold text-white mb-2">{t.features[key].title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.features[key].description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-14">{t.testimonialsTitle}</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {t.testimonials.map((review, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#8172AD]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{review.text}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-white text-sm">{review.name}</div>
                    <div className="text-[#8172AD] text-xs mt-0.5">{review.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Q&A ── */}
        <div className="bg-white/5">
          <QandA locale={locale} />
        </div>

        {/* ── CLASSIC BOOKS ── */}
        {(locale === 'zh' || locale === 'en') && (
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-white mb-3">
                  {locale === 'en' ? 'Classic Books' : '经典书籍'}
                </h2>
                <p className="text-gray-400">
                  {locale === 'en' ? 'Professional book recommendations to improve your running performance' : '提升跑步表现的专业书籍推荐'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex gap-6">
                    <div className="w-28 h-40 flex-shrink-0">
                      <img
                        src={`/images/books/hanson${locale === 'en' ? '_en' : ''}.jpg`}
                        alt={locale === 'en' ? 'Hansons Marathon Method' : '汉森马拉松训练法'}
                        width="112" height="160"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-white mb-2">
                        {locale === 'en' ? 'Hansons Marathon Method' : '汉森马拉松训练法'}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1">
                        {locale === 'en'
                          ? 'A scientifically-based marathon training system for runners of all levels.'
                          : '基于科学原理的马拉松训练系统，专为不同水平跑者设计。'}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <a href={`/plans/hanson?lang=${locale}`} className="text-[#8172AD] hover:text-purple-400 text-sm transition-colors">
                          {locale === 'en' ? 'View Plan →' : '查看计划 →'}
                        </a>
                        <a href={locale === 'en' ? 'https://book.douban.com/subject/11416098/' : 'https://book.douban.com/subject/26852290/'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                          {locale === 'en' ? 'Details →' : '详情 →'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex gap-6">
                    <div className="w-28 h-40 flex-shrink-0">
                      <img
                        src={`/images/books/daniels${locale === 'en' ? '_en' : ''}.jpg`}
                        alt={locale === 'en' ? "Daniels' Running Formula" : '丹尼尔斯经典跑步训练法'}
                        width="112" height="160"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-white mb-2">
                        {locale === 'en' ? "Daniels' Running Formula" : '丹尼尔斯经典跑步训练法'}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1">
                        {locale === 'en'
                          ? 'The classic work by Jack Daniels, detailing the VDOT training system.'
                          : '杰克·丹尼尔斯经典著作，详述 VDOT 训练体系与科学配速指导。'}
                      </p>
                      <div className="mt-4">
                        <a href={locale === 'en' ? 'https://book.douban.com/subject/35531345/' : 'https://book.douban.com/subject/25967933/'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                          {locale === 'en' ? 'Details →' : '详情 →'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8172AD]/30 via-indigo-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
              {t.getStarted}
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              {t.getStartedSubtitle}
            </p>
            <AppStoreButton size="lg" />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              {t.contact}{' '}
              <a href="mailto:hamainter@gmail.com" className="text-[#8172AD] hover:text-purple-400 transition-colors">
                hamainter@gmail.com
              </a>
            </div>
            <div className="flex gap-6">
              <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                {t.termsOfService}
              </a>
              <a href="https://www.laihjx.com/paceguru-privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                {t.privacyPolicy}
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
