import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';

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
      className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-white">Acquisition Workflow</h2>
        <motion.button 
          className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="h-5 w-5" />
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {workflowPhases.map((phase, index) => (
          <motion.div
            key={phase.id}
            className={`border rounded-xl transition-all cursor-pointer overflow-hidden ${
              activeWorkflow === index 
                ? 'border-purple-500/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20 shadow-lg' 
                : 'border-slate-700/50 hover:border-slate-600/50 bg-slate-900/30'
            }`}
            onClick={() => setActiveWorkflow(activeWorkflow === index ? -1 : index)}
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-lg ${
                    phase.status === 'active' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                      : phase.status === 'completed'
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {index + 1}
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
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className={`h-2 rounded-full ${
                      phase.status === 'active' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : phase.status === 'completed'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                        : 'bg-slate-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                  />
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
                  className="border-t border-slate-700/50 p-4 bg-slate-900/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.items.map((item, itemIndex) => (
                      <motion.div 
                        key={itemIndex} 
                        className="flex items-center space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                          item.status === 'completed' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                            : item.status === 'in-progress'
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.name}</p>
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