import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' }
  ] as const;

  return (
    <div className="flex items-center bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded-md transition-all duration-200 ${
            theme === value
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};