import React from 'react';
import { BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';

export const DataVisualization: React.FC = () => {
  const chartData = [
    { name: 'Q1', value: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Q2', value: 92, color: 'from-purple-500 to-pink-500' },
    { name: 'Q3', value: 78, color: 'from-emerald-500 to-teal-500' },
    { name: 'Q4', value: 96, color: 'from-orange-500 to-red-500' }
  ];

  const pieData = [
    { name: 'Small Business', value: 68, color: 'from-blue-500 to-cyan-500' },
    { name: 'Large Business', value: 32, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-white">Performance Analytics</h2>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
            <BarChart3 className="h-5 w-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
            <PieChart className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="space-y-4">
          <h3 className="text-lg font-light text-slate-300 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Quarterly Performance</span>
          </h3>
          <div className="space-y-3">
            {chartData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center space-x-4"
              >
                <span className="text-sm text-slate-400 w-8">{item.name}</span>
                <div className="flex-1 bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full shadow-lg`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="text-sm text-white w-12 text-right">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="space-y-4">
          <h3 className="text-lg font-light text-slate-300 flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Business Distribution</span>
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{
                  background: `conic-gradient(from 0deg, #3b82f6 0deg, #06b6d4 ${68 * 3.6}deg, #8b5cf6 ${68 * 3.6}deg, #ec4899 360deg)`
                }}
              />
              {/* Inner circle */}
              <div className="absolute inset-4 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-light text-white">68%</div>
                  <div className="text-xs text-slate-400">Small Biz</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {pieData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
                <span className="text-sm text-white font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};