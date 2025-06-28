import React from 'react';
import { motion } from 'framer-motion';

export const PremiumLogo: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center space-x-4 py-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Premium Shield Icon */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl blur-lg"></div>
        
        {/* Main shield container */}
        <div className="relative w-12 h-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl border border-slate-600/50 shadow-2xl overflow-hidden">
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          
          {/* Metallic accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
          
          {/* Shield SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-slate-200"
            >
              <defs>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* Main shield path */}
              <path 
                d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" 
                fill="url(#shieldGradient)"
                stroke="url(#innerGradient)"
                strokeWidth="0.5"
              />
              
              {/* Inner shield detail */}
              <path 
                d="M12 4L5 8V12C5 15.31 7.84 18.62 12 19.5C16.16 18.62 19 15.31 19 12V8L12 4Z" 
                fill="url(#innerGradient)"
              />
              
              {/* Central emblem */}
              <circle 
                cx="12" 
                cy="11" 
                r="3" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                opacity="0.7"
              />
              <text 
                x="12" 
                y="13" 
                textAnchor="middle" 
                fontSize="6" 
                fill="currentColor" 
                fontWeight="600" 
                opacity="0.8"
              >
                13
              </text>
            </svg>
          </div>
          
          {/* Subtle inner highlight */}
          <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      {/* Premium Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-1">
          {/* FAR text with premium styling */}
          <span className="text-2xl font-light text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text tracking-wide">
            FAR
          </span>
          
          {/* 13 with accent styling */}
          <span className="text-2xl font-medium text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text tracking-wide">
            13
          </span>
          
          {/* Pro with elegant styling */}
          <span className="text-xl font-light text-transparent bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 bg-clip-text tracking-wider ml-1">
            Pro
          </span>
        </div>
        
        {/* Subtle tagline */}
        <div className="flex items-center space-x-2 mt-0.5">
          <div className="w-8 h-px bg-gradient-to-r from-blue-400/50 to-purple-400/50"></div>
          <span className="text-xs text-slate-400 font-light tracking-widest uppercase">
            Acquisition Platform
          </span>
        </div>
      </div>
    </motion.div>
  );
};