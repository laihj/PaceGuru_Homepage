'use client';

import { useState, useEffect } from 'react';

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

      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        {/* Purple glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#8172AD]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-2xl w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h1 className="text-4xl font-black text-white mb-6 tracking-tight">
            Welcome to PaceGuru
          </h1>

          <div className="mb-8">
            <img
              src="/images/screenshots/zh/home.png"
              alt="PaceGuru Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="text-left mb-8 space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-4">主要功能：</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#8172AD] mr-2">•</span>
                支持小组件，在手机桌面显示各种维跑步统计
              </li>
              <li className="flex items-start">
                <span className="text-[#8172AD] mr-2">•</span>
                设定个人的配速区间和心率区间
              </li>
              <li className="flex items-start">
                <span className="text-[#8172AD] mr-2">•</span>
                每一条跑步记录都按区间分割时间
              </li>
              <li className="flex items-start">
                <span className="text-[#8172AD] mr-2">•</span>
                在手机上设置间歇训练计划，同步到表端执行
              </li>
              <li className="flex items-start">
                <span className="text-[#8172AD] mr-2">•</span>
                内置能力提升训练模版，针对跑步五维能力训练计划
              </li>
              <li className="flex items-start">
                <span className="text-[#8172AD] mr-2">•</span>
                内置单次训练模版，训练提高更有乐趣
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg text-gray-400">
              <p className="mb-2">正在跳转到 App Store...</p>
              <div className="text-3xl font-bold text-[#8172AD]">{countdown}</div>
            </div>

            <p className="text-gray-400">
              如果没有自动跳转，请
              <a
                href={appStoreUrl}
                className="text-[#8172AD] hover:underline ml-1 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                点击这里
              </a>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-500">
              Your running journey starts here!
            </p>
          </div>
        </div>
      </div>
  );
}
