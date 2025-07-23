import { NextResponse } from 'next/server';

// 服务端全局数据存储
let globalRunningStats = {
  totalDistance: 12847.35, // 初始值，单位：公里
  lastUpdated: Date.now(),
  updateInterval: null
};

// 启动自动更新
function startAutoUpdate() {
  if (globalRunningStats.updateInterval) {
    return;
  }
  
  globalRunningStats.updateInterval = setInterval(() => {
    // 随机增加 2-42 公里
    const increment = Math.random() * 40 + 2;
    globalRunningStats.totalDistance += increment;
    
    globalRunningStats.lastUpdated = Date.now();
  }, Math.random() * 4000 + 1000); // 1-5秒随机间隔
}

// 启动自动更新
startAutoUpdate();

export async function GET() {
  try {
    return NextResponse.json({
      totalDistance: Number(globalRunningStats.totalDistance.toFixed(2)),
      lastUpdated: globalRunningStats.lastUpdated
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch running stats' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { increment } = await request.json();
    
    if (typeof increment === 'number' && increment > 0 && increment < 42) {
      globalRunningStats.totalDistance += increment;
      globalRunningStats.lastUpdated = Date.now();
      
      return NextResponse.json({
        totalDistance: Number(globalRunningStats.totalDistance.toFixed(2)),
        lastUpdated: globalRunningStats.lastUpdated
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid increment value' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update running stats' },
      { status: 500 }
    );
  }
}