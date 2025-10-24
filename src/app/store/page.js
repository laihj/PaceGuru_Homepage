'use client';

import { useState, useEffect } from 'react';

export const metadata = {
  title: "PaceGuru - Your Running Companion",
  description: "记录跑步数据，制定训练计划，突破个人最佳成绩",
  openGraph: {
    title: "PaceGuru",
    description: "记录跑步数据，制定训练计划，突破个人最佳成绩",
    url: 'https://paceguru.app/store',
    type: 'website',
    images: [
      {
        url: '/ograph.png',
        width: 1200,
        height: 630,
        alt: 'PaceGuru - Running App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PaceGuru",
    description: "记录跑步数据，制定训练计划，突破个人最佳成绩",
    images: ['/ograph.png'],
  },
};

export default function StorePage() {
  const [countdown, setCountdown] = useState(3);
  const appStoreUrl = "https://apps.apple.com/us/app/paceguru/id6468926049";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = appStoreUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to PaceGuru
          </h1>
          
          <div className="mb-8">
            <img 
              src="/screen.png" 
              alt="PaceGuru Screenshot" 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="text-left mb-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">主要功能：</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                支持小组件，在手机桌面显示各种维跑步统计
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                设定个人的配速区间和心率区间
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                每一条跑步记录都按区间分割时间
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                在手机上设置间歇训练计划，同步到表端执行
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                内置能力提升训练模版，针对跑步五维能力训练计划
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                内置单次训练模版，训练提高更有乐趣
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg text-gray-600">
              <p className="mb-2">正在跳转到 App Store...</p>
              <div className="text-3xl font-bold text-blue-600">{countdown}</div>
            </div>
            
            <p className="text-gray-600">
              如果没有自动跳转，请
              <a 
                href={appStoreUrl}
                className="text-blue-600 hover:text-blue-800 underline ml-1 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                点击这里
              </a>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Your running journey starts here!
            </p>
          </div>
        </div>
      </div>
  );
}