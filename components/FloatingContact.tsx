
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide on contact page
  if (location.pathname === '/contact') return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/contact')}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-rose-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-shadow duration-300 group"
      aria-label="Contact Me"
    >
      <MessageSquare size={24} fill="currentColor" className="text-white" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-neutral-900 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg translate-x-2 group-hover:translate-x-0 transform duration-200">
        Let's Talk
      </span>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-rose-500 opacity-75 animate-ping -z-10" />
    </motion.button>
  );
};

export default FloatingContact;
