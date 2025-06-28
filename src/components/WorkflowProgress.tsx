import React from 'react';
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
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-white">Acquisition Workflow</h2>
        <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg">
          <Filter className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {workflowPhases.map((phase, index) => (
          <div
            key={phase.id}
            className={`border rounded-xl transition-all cursor-pointer overflow-hidden ${
              activeWorkflow === index 
                ? 'border-purple-500/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20 shadow-lg' 
                : 'border-slate-700/50 hover:border-slate-600/50 bg-slate-900/30'
            }`}
            onClick={() => setActiveWorkflow(activeWorkflow === index ? -1 : index)}
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
                <div className={`transition-transform duration-300 ${activeWorkflow === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      phase.status === 'active' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : phase.status === 'completed'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                        : 'bg-slate-600'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            {activeWorkflow === index && (
              <div className="border-t border-slate-700/50 p-4 bg-slate-900/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phase.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="flex items-center space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all"
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};