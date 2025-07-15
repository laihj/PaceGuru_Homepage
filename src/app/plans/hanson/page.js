'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import DataTable from './components/DataTable';

export default function HansonPage() {
  const [paceData, setPaceData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/data/pace.json')
      .then(response => response.json())
      .then(data => setPaceData(data))
      .catch(error => console.error('Error loading pace data:', error));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            Hanson Marathon Method Pace Calculator
          </h1>
          <h3 className="text-lg text-center hint">
            Generate Training Plan Based on Your Marathon Goal
          </h3>
          <DataTable data={paceData} />
        </div>
      </div>
    </ConfigProvider>
  );
}