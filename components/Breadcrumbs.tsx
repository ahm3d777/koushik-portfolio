
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show on home page
  if (pathnames.length === 0) return null;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center text-xs md:text-sm text-neutral-400 mb-8"
      aria-label="Breadcrumb"
    >
      <Link to="/" className="hover:text-white transition-colors flex items-center group">
        <Home size={14} className="mr-2 group-hover:text-rose-500 transition-colors" /> 
        <span className="group-hover:text-white">Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <div key={name} className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-neutral-700" />
            {isLast ? (
              <span className="text-rose-500 font-bold capitalize bg-rose-500/10 px-2 py-0.5 rounded">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-white transition-colors capitalize hover:underline underline-offset-4 decoration-rose-500">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </motion.nav>
  );
};

export default Breadcrumbs;
