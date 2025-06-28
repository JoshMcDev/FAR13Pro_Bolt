import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Activity, Filter, MoreHorizontal } from 'lucide-react';

export const DataVisualization: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'bar' | 'pie'>('bar');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const chartData = [
    { name: 'Q1', value: 85, color: 'from-blue-500 to-cyan-500', amount: '$420K' },
    { name: 'Q2', value: 92, color: 'from-purple-500 to-pink-500', amount: '$580K' },
    { name: 'Q3', value: 78, color: 'from-emerald-500 to-teal-500', amount: '$390K' },
    { name: 'Q4', value: 96, color: 'from-orange-500 to-red-500', amount: '$640K' }
  ];

  const pieData = [
    { name: 'Small Business', value: 68, color: 'from-blue-500 to-cyan-500', amount: '$1.6M' },
    { name: 'Large Business', value: 32, color: 'from-purple-500 to-pink-500', amount: '$800K' }
  ];

  const performanceMetrics = [
    { label: 'Efficiency Score', value: 94, change: '+5%', trend: 'up' },
    { label: 'Cost Savings', value: 87, change: '+12%', trend: 'up' },
    { label: 'Timeline Adherence', value: 91, change: '-2%', trend: 'down' }
  ];

  return (
    <motion.div 
      className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/30 shadow-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-white">Performance Analytics</h2>
        <div className="flex items-center space-x-2">
          <motion.button 
            onClick={() => setActiveChart('bar')}
            className={`p-2 rounded-xl transition-all ${
              activeChart === 'bar' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 className="h-5 w-5" />
          </motion.button>
          <motion.button 
            onClick={() => setActiveChart('pie')}
            className={`p-2 rounded-xl transition-all ${
              activeChart === 'pie' 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <PieChart className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-xl transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {activeChart === 'bar' ? (
              <motion.div
                key="bar-chart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-light text-slate-300 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Quarterly Performance</span>
                </h3>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-slate-400 w-8">{item.name}</span>
                        <div className="flex-1 flex items-center space-x-3">
                          <div className="flex-1 bg-slate-700/50 rounded-full h-4 overflow-hidden relative">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full shadow-lg relative`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: 1 + index * 0.2 }}
                            >
                              {/* Animated shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                            </motion.div>
                          </div>
                          <span className="text-sm text-white w-12 text-right font-medium">{item.value}%</span>
                          <span className="text-sm text-slate-400 w-16 text-right">{item.amount}</span>
                        </div>
                      </div>
                      
                      {/* Hover tooltip */}
                      <AnimatePresence>
                        {hoveredItem === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-12 top-8 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 z-10 shadow-xl"
                          >
                            <div className="text-xs text-slate-300">
                              <div className="font-medium text-white">{item.name} Performance</div>
                              <div>Score: {item.value}%</div>
                              <div>Amount: {item.amount}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="pie-chart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-light text-slate-300 flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Business Distribution</span>
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    {/* Animated pie chart */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1, delay: 1.2 }}
                      style={{
                        background: `conic-gradient(from 0deg, #3b82f6 0deg, #06b6d4 ${68 * 3.6}deg, #8b5cf6 ${68 * 3.6}deg, #ec4899 360deg)`
                      }}
                    />
                    {/* Inner circle with glow */}
                    <div className="absolute inset-6 bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
                      <div className="text-center">
                        <div className="text-2xl font-light text-white">68%</div>
                        <div className="text-xs text-slate-400">Small Biz</div>
                      </div>
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-sm"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {pieData.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl hover:bg-slate-900/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                        <span className="text-sm text-slate-300">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white font-medium">{item.value}%</div>
                        <div className="text-xs text-slate-400">{item.amount}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Performance Metrics Sidebar */}
        <div className="space-y-4">
          <h3 className="text-lg font-light text-slate-300">Key Metrics</h3>
          <div className="space-y-3">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="p-4 bg-slate-900/30 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{metric.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    metric.trend === 'up' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        metric.trend === 'up' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                          : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 1.8 + index * 0.2 }}
                    />
                  </div>
                  <span className="text-sm text-white font-medium">{metric.value}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};