'use client';

import { useState } from 'react';

/**
 * iPhone 15 风格的手机框。
 * - 传入 src 时显示截图（object-cover，按 iPhone 15 比例 2.17:1 填充）
 * - 未传 src 或加载失败时回退到占位样式（Apple logo + label）
 * 截图约定：public/images/screenshots/{locale}/{home,sync,training,analytics}.png
 */
export default function PhoneMockup({ src, alt = '', label = 'App screenshots coming soon' }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className="relative mx-auto w-[240px] h-[520px] sm:w-[260px] sm:h-[563px]">
      {/* 外框 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-[44px] border border-gray-600 shadow-2xl shadow-black/50">
        <div className="absolute inset-[6px] bg-gray-900 rounded-[38px] overflow-hidden">
          {showImage ? (
            // 截图为外部提供的本地文件，缺失时由 onError 回退到占位；非 CMS 远程图，用原生 img 更稳
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              onError={() => setFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              {/* Dynamic Island 占位 */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
              <svg className="w-10 h-10 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <p className="text-gray-500 text-xs text-center px-6 leading-relaxed">{label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
