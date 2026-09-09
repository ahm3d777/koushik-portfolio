
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Twitter, ArrowUp, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">KOUSHIK</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Senior Software Engineer building scalable solutions that matter.
              Focused on performance, accessibility, and clean architecture.
            </p>
            <div className="flex space-x-4">
              <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-neutral-400 hover:text-rose-500 transition-colors"><Github size={20} /></a>
              <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-400 hover:text-rose-500 transition-colors"><Linkedin size={20} /></a>
              {SITE_CONFIG.twitter && (
                <a href={SITE_CONFIG.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-neutral-400 hover:text-rose-500 transition-colors"><Twitter size={20} /></a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><NavLink to="/about" className="hover:text-rose-500 transition-colors">About Me</NavLink></li>
              <li><NavLink to="/work" className="hover:text-rose-500 transition-colors">Portfolio</NavLink></li>
              <li><NavLink to="/articles" className="hover:text-rose-500 transition-colors">Articles</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-rose-500 transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><NavLink to="/snippets" className="hover:text-rose-500 transition-colors">Code Snippets</NavLink></li>
              <li><NavLink to="/uses" className="hover:text-rose-500 transition-colors">/Uses & Gear</NavLink></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-6">Stay in Touch</h4>
            <form
              className="flex items-center space-x-2 mb-6"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Enter email"
                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 text-sm rounded-l-md w-full focus:outline-none focus:border-rose-500"
              />
              <button type="submit" aria-label="Subscribe" className="bg-rose-500 text-white px-3 py-2 rounded-r-md hover:bg-rose-600 transition-colors">
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Koushik. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Made with React & Tailwind</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-white hover:text-rose-500 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
