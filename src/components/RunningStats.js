'use client';

import { useState, useEffect, useRef } from 'react';

export default function RunningStats({ locale }) {
  const [stats, setStats] = useState({ totalDistance: 0 });
  const [displayStats, setDisplayStats] = useState({ totalDistance: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // 本地化文本
  const texts = {
    en: {
      unit: "km"
    },
    zh: {
      unit: "公里"
    },
    ja: {
      unit: "km"
    }
  };

  const t = texts[locale] || texts.en;

  // 获取跑步数据
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/running-stats');
      if (response.ok) {
        const data = await response.json();
        
        if (!isLoading && data.totalDistance !== stats.totalDistance) {
          console.log('数据变化:', stats.totalDistance, '->', data.totalDistance);
          // 数据变化时触发动画
          setShouldAnimate(true);
          
          // 立即更新显示数据
          setDisplayStats(data);
          setStats(data);
          
          // 700ms后结束动画
          setTimeout(() => {
            setShouldAnimate(false);
          }, 700);
        } else if (isLoading) {
          setStats(data);
          setDisplayStats(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch running stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 初始加载
    fetchStats();

    // 设置定时更新 (每2-6秒随机更新)
    const updateInterval = setInterval(() => {
      fetchStats();
    }, Math.random() * 4000 + 2000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  // 数字动画效果
  const formatNumber = (num) => {
    return num.toLocaleString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-white bg-opacity-20 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-bold mb-4 font-mono tracking-tight h-16 flex items-center justify-center">
        <div 
          className={shouldAnimate ? 'animate-slideUp' : ''}
          style={{
            animationFillMode: 'both'
          }}
        >
          {formatNumber(displayStats.totalDistance)}
          <span className="text-2xl ml-2 font-normal">{t.unit}</span>
        </div>
      </div>
    </div>
  );
}