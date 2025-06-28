import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  gradient, 
  delay = 0 
}) => {
  return (
    <motion.div 
      className="relative bg-slate-800/30 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/30 shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-light mb-2">{title}</p>
          <p className="text-3xl font-light text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
            {value}
          </p>
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-slate-600/30 transition-colors duration-300"></div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
    </motion.div>
  );
};