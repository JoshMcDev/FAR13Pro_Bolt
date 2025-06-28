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
      className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-light mb-1">{title}</p>
          <p className="text-3xl font-light text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
            {value}
          </p>
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
      
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
    </motion.div>
  );
};