import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, MoreHorizontal } from 'lucide-react';

interface WorkflowItem {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: React.ComponentType<any>;
}

interface WorkflowPhase {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  items: WorkflowItem[];
}

interface WorkflowProgressProps {
  workflowPhases: WorkflowPhase[];
  activeWorkflow: number;
  setActiveWorkflow: (index: number) => void;
}

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({
  workflowPhases,
  activeWorkflow,
  setActiveWorkflow
}) => {
  return (
    <motion.div 
      className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/30 shadow-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-white">Acquisition Workflow</h2>
        <div className="flex items-center space-x-2">
          <motion.button 
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/30 rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/30 rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreHorizontal className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      <div className="space-y-4">
        {workflowPhases.map((phase, index) => (
          <motion.div
            key={phase.id}
            className={`border rounded-2xl transition-all cursor-pointer overflow-hidden ${
              activeWorkflow === index 
                ? 'border-blue-500/30 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10 shadow-lg' 
                : 'border-slate-700/30 hover:border-slate-600/50 bg-slate-900/20 hover:bg-slate-900/30'
            }`}
            onClick={() => setActiveWorkflow(activeWorkflow === index ? -1 : index)}
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium shadow-lg relative overflow-hidden ${
                    phase.status === 'active' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                      : phase.status === 'completed'
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                  }`}>
                    {/* Animated background for active state */}
                    {phase.status === 'active' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                    )}
                    <span className="relative z-10">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{phase.title}</h3>
                    <p className="text-sm text-slate-400">{phase.progress}% complete</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: activeWorkflow === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </motion.div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className={`h-3 rounded-full relative overflow-hidden ${
                      phase.status === 'active' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : phase.status === 'completed'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                        : 'bg-slate-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                  >
                    {/* Animated shimmer effect */}
                    {phase.status === 'active' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {activeWorkflow === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-700/30 p-6 bg-slate-900/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.items.map((item, itemIndex) => (
                      <motion.div 
                        key={itemIndex} 
                        className="flex items-center space-x-3 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110 ${
                          item.status === 'completed' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                            : item.status === 'in-progress'
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                            : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                        }`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">{item.name}</p>
                          <p className={`text-xs capitalize ${
                            item.status === 'completed' 
                              ? 'text-emerald-400'
                              : item.status === 'in-progress'
                              ? 'text-blue-400'
                              : 'text-slate-500'
                          }`}>
                            {item.status.replace('-', ' ')}
                          </p>
                        </div>
                        {/* Status indicator */}
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'completed' 
                            ? 'bg-emerald-400'
                            : item.status === 'in-progress'
                            ? 'bg-blue-400 animate-pulse'
                            : 'bg-slate-500'
                        }`}></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};