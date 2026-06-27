'use client';

import { useState } from 'react';

/**
 * Apple Watch 风格表框。
 * - 传入 src 时显示 watch 截图（object-cover 填充）
 * - 未传 src 或加载失败时回退到占位（数字表盘 + 标签）
 * watch 截图约定：
 *   public/images/screenshots/{locale}/{home-watch,training-watch}.png
 */
export default function WatchMockup({ src, alt = '', label = 'Apple Watch' }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className="relative w-[150px] h-[185px] sm:w-[160px] sm:h-[198px]">
      {/* 外框 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-[42px] border border-gray-600 shadow-2xl shadow-black/60">
        <div className="absolute inset-[5px] bg-gray-900 rounded-[37px] overflow-hidden">
          {/* Digital Crown + 侧键 */}
          <div className="absolute -right-[6px] top-9 w-[6px] h-7 bg-gray-700 rounded-r-md border border-gray-600" />
          <div className="absolute -right-[6px] top-18 w-[6px] h-4 bg-gray-700 rounded-r-md border border-gray-600" />

          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              onError={() => setFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-3">
              {/* 占位数字表盘 */}
              <div className="text-center">
                <div className="text-emerald-400 text-2xl font-bold tabular-nums">7:30</div>
                <div className="text-gray-500 text-[10px]"> Tue, Jun 27</div>
              </div>
              <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12z"/>
              </svg>
              <p className="text-gray-500 text-[10px] text-center leading-tight">{label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
