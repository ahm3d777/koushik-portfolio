
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Briefcase, User, Mail, Copy, Command, X, ArrowRight, Book, Code2, Monitor } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const actions = [
    { 
      id: 'home', 
      label: 'Go to Home', 
      icon: <Home size={18} />, 
      shortcut: 'H',
      perform: () => navigate('/') 
    },
    { 
      id: 'work', 
      label: 'Go to Work', 
      icon: <Briefcase size={18} />, 
      shortcut: 'W',
      perform: () => navigate('/work') 
    },
    { 
      id: 'articles', 
      label: 'Go to Articles', 
      icon: <Book size={18} />, 
      perform: () => navigate('/articles') 
    },
    { 
      id: 'snippets', 
      label: 'Go to Snippets', 
      icon: <Code2 size={18} />, 
      perform: () => navigate('/snippets') 
    },
    { 
      id: 'uses', 
      label: 'Go to Uses / Gear', 
      icon: <Monitor size={18} />, 
      perform: () => navigate('/uses') 
    },
    { 
      id: 'about', 
      label: 'Go to About', 
      icon: <User size={18} />, 
      shortcut: 'A',
      perform: () => navigate('/about') 
    },
    { 
      id: 'contact', 
      label: 'Go to Contact', 
      icon: <Mail size={18} />, 
      shortcut: 'C',
      perform: () => navigate('/contact') 
    },
    { 
      id: 'email', 
      label: 'Copy Email Address', 
      icon: <Copy size={18} />, 
      perform: () => {
        navigator.clipboard.writeText(SITE_CONFIG.email);
        setIsOpen(false);
      }
    },
  ];

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (index: number) => {
    const action = filteredActions[index];
    if (action) {
      action.perform();
      setIsOpen(false);
      setQuery('');
    }
  };

  // Keyboard navigation within the list
  useEffect(() => {
    const handleListNav = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(selectedIndex);
      }
    };

    window.addEventListener('keydown', handleListNav);
    return () => window.removeEventListener('keydown', handleListNav);
  }, [isOpen, selectedIndex, filteredActions]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[60vh]"
          >
            {/* Search Bar */}
            <div className="flex items-center px-4 py-4 border-b border-neutral-800">
              <Search className="text-neutral-400 mr-3" size={20} />
              <input 
                type="text" 
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-lg"
              />
              <div className="flex items-center gap-2">
                 <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-2 font-mono text-xs font-medium text-neutral-400">
                  <span className="text-xs">ESC</span>
                </kbd>
                <button onClick={() => setIsOpen(false)} aria-label="Close" className="text-neutral-400 hover:text-white">
                    <X size={18} />
                </button>
              </div>
            </div>

            {/* Actions List */}
            <div className="overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action, index) => (
                  <div
                    key={action.id}
                    onClick={() => handleSelect(index)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex ? 'bg-rose-500/10 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${index === selectedIndex ? 'text-rose-500' : 'text-neutral-400'}`}>
                        {action.icon}
                      </div>
                      <span className="font-medium">{action.label}</span>
                    </div>
                    {action.shortcut && (
                      <span className="text-xs font-mono text-neutral-600 bg-neutral-800 px-2 py-1 rounded">
                        {action.shortcut}
                      </span>
                    )}
                    {index === selectedIndex && (
                        <ArrowRight size={16} className="text-rose-500" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-neutral-400">
                  No results found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400">
                <span>Use arrow keys to navigate</span>
                <div className="flex items-center gap-2">
                    <span>Koushik Portfolio</span>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
