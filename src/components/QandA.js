export default function QandA({ locale }) {
  const qaData = {
    en: {
      title: "Frequently Asked Questions",
      features: [
        {
          title: "How to Plan Your Training?",
          description: "Eliminate planning confusion and provide a professional training blueprint for every goal.",
          icon: "🎯",
          points: [
            "Train with Scientific Zones: Precisely target training intensity and physiological goals using your personalized Pace and Heart Rate Zones.",
            "Classic Workout Templates: Access pre-built templates for Yasso 800s, Fartleks, and intervals to diversify your routine.",
            "Generate Pro Plans Instantly: Input your race date and target time to automatically generate complete 18-week marathon plans (e.g., Hansons)."
          ]
        },
        {
          title: "How to Gain Training Insights?",
          description: "Convert complex running data into easy-to-understand coaching analysis, allowing you to assess the quality of your training.",
          icon: "📊",
          points: [
            "30-Day Load Monitoring: Focus on sustained running load to help maintain consistent volume and prevent overtraining or injury.",
            "Multi-Dimensional Run Analysis: Detailed views of pace curves, heart rate, ground contact time, and power to fully review your run stability.",
            "Hexagonal Ability Radar Chart: Visually assess the balance of your training intensities (Easy, Threshold, High Intensity) to ensure a scientific structure."
          ]
        },
        {
          title: "How to Track Your Progress?",
          description: "Quantify your day-to-day consistency and clearly see your growth and transformation over the long term.",
          icon: "📈",
          points: [
            "Long-Term Trend Charts: Track the historical evolution of key metrics like VDOT (estimated VO₂max), cadence, and pace.",
            "Widgets & Watch Face Reminders: Instantly view weekly/monthly volume and 30-day load directly from your device screen or wrist.",
            "Automated Plan Sync & Execution: Ensure efficient execution with your daily workout plan automatically ready on your Apple Watch—reliable execution equals reliable progress."
          ]
        }
      ]
    },
    zh: {
      title: "常见问题",
      features: [
        {
          title: "如何规划训练？",
          description: "消除规划困惑，为每个目标提供专业的训练蓝图。",
          icon: "🎯",
          points: [
            "科学区间训练：使用你个性化的配速和心率区间，精确瞄准训练强度和生理目标。",
            "经典训练模板：使用 Yasso 800、法特莱克和间歇跑的预设模板，丰富你的训练套路。",
            "生成专业计划：输入你的比赛日期和目标时间，自动生成完整的18周马拉松计划（Hanson 计划）。"
          ]
        },
        {
          title: "如何评估训练？",
          description: "将复杂的跑步数据转化为易于理解的指导分析，让你评估训练质量。",
          icon: "📊",
          points: [
            "30天负荷监控：专注于持续的跑步负荷，帮助保持一致的运动量，防止过度训练或受伤。",
            "多维度跑步分析：详细查看配速曲线、心率、着地时间和功率，全面评估你的跑步稳定性。",
            "六边形能力雷达图：直观评估你的训练强度平衡（轻松、阈值、高强度），确保科学的训练结构。"
          ]
        },
        {
          title: "如何跟踪进步？",
          description: "量化你的日常坚持，清晰看到你的长期成长和转变。",
          icon: "📈",
          points: [
            "长期趋势图表：跟踪关键指标的演变，如 VDOT（预估 VO₂max）、步频和配速。",
            "小组件和表盘提醒：直接从设备屏幕或手表上即时查看各种各样的训练数据。",
            "自动计划同步和执行：确保高效执行，每日训练计划自动同步到 Apple Watch 上——打开即可训练。"
          ]
        }
      ]
    },
    ja: {
      title: "よくある質問",
      features: [
        {
          title: "トレーニングの計画の立て方",
          description: "計画の混乱をなくし、すべての目標に対してプロのトレーニング青写真を提供します。",
          icon: "🎯",
          points: [
            "科学的トレーニングゾーン：個人向けのペースと心拍ゾーンを使用して、トレーニング強度と生理的目標を正確にターゲット。",
            "クラシックワークアウトテンプレート：Yasso 800、ファルトレク、インターバル向けの既製テンプレートでトレーニングの多様性を。",
            "プロプランを即座に生成：レース日と目標タイムを入力して、完全な18週間マラソンプラン（例：ハンソン）を自動生成。"
          ]
        },
        {
          title: "トレーニングの洞察を得る方法",
          description: "複雑なランニングデータを理解しやすいコーチング分析に変換し、トレーニングの質を評価できるようにします。",
          icon: "📊",
          points: [
            "30日間負荷監視：持続的なランニング負荷に焦点を当て、一貫したボリュームを維持し、オーバートレーニングや怪我を防止。",
            "多次元ラン分析：ペースカーブ、心拍数、グラウンドコンタクト時間、パワーの詳細ビューでランの安定性を完全レビュー。",
            "六角形能力レーダーチャート：トレーニング強度のバランス（イージー、しきい値、高強度）を視覚的に評価し、科学的な構造を確保。"
          ]
        },
        {
          title: "進捗の追跡方法",
          description: "日々の一貫性を定量化し、長期的な成長と変化を明確に確認できます。",
          icon: "📈",
          points: [
            "長期トレンドチャート：VDOT（推定VO₂max）、ケイデンス、ペースなどの主要指標の長期的な進化を追跡。",
            "ウィジェット＆ウォッチフェイスリマインダー：週/月次ボリュームや30日間負荷をデバイス画面や手首から直接確認。",
            "自動プラン同期＆実行：日々のワークアウトプランがApple Watchに自動的に準備されるため、効率的な実行を確保——確実な実行は確実な進歩に。"
          ]
        }
      ]
    }
  };

  const data = qaData[locale] || qaData.en;

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
          {data.features.map((feature, index) => (
            <div key={index} className={index !== data.features.length - 1 ? 'mb-12 pb-12 border-b border-gray-200 dark:border-gray-600 last:mb-0 last:pb-0 last:border-b-0' : ''}>
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 ml-12">
                {feature.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#8172AD]/10 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-[#8172AD] rounded-full"></div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}