import React from 'react';

// Generate metadata for Hanson plan page
export async function generateMetadata({ searchParams }) {
  const lang = searchParams?.lang || 'en';

  const texts = {
    zh: {
      title: "汉森马拉松训练法配速计算器 - PaceGuru",
      description: "根据您的马拉松目标生成汉森马拉松训练计划。专业的 18 周马拉松训练计划，包括有氧跑、节奏跑、长距离跑和速度训练。"
    },
    en: {
      title: "Hanson Marathon Method Pace Calculator - PaceGuru",
      description: "Generate your Hanson Marathon Method training plan based on your marathon goal. Professional 18-week marathon training plan with aerobic, tempo, long distance, and speed workouts."
    }
  };

  const t = texts[lang] || texts.en;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://paceguru.app/plans/hanson?lang=${lang}`,
      siteName: 'PaceGuru',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
    },
  };
}

export default function HansonLayout({ children }) {
  return children;
}
