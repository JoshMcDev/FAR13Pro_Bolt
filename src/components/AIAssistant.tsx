import React, { useState } from 'react';
import { Brain, X, ArrowRight, Zap, FileText, Search, Shield } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI assistant powered by OpenAI and LangChain. I can help you with acquisition planning, document generation, compliance reviews, and FAR 13 requirements. What would you like assistance with today?'
    }
  ]);

  const quickActions = [
    { title: 'Generate RFQ', icon: FileText, description: 'Create acquisition documents' },
    { title: 'Market Research', icon: Search, description: 'Analyze vendor landscape' },
    { title: 'Compliance Check', icon: Shield, description: 'Review FAR requirements' },
    { title: 'Cost Analysis', icon: Zap, description: 'Evaluate pricing strategies' }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'I understand you need help with that. Let me analyze your request and provide you with the most relevant information based on current FAR 13 regulations and best practices.'
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[32rem] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-medium text-white">AI Assistant</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700/50 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-xl ${
              msg.type === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-slate-700/50 text-slate-200 border border-slate-600/50'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 p-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-all text-left"
              onClick={() => setMessage(action.title)}
            >
              <action.icon className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-white font-medium">{action.title}</div>
                <div className="text-xs text-slate-400">{action.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about FAR 13 requirements..."
            className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-lg transition-all shadow-lg"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};