
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { OTHER_WORK } from '../constants';

// Small hand-built illustrations (not stock icons, not fake screenshots) that
// echo the site's existing visual language — glowing rose orb, thin orbit
// rings, faceted geometry — see GeometricSculpture.tsx / the favicon.

const JerseyIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-36 md:h-36" role="img" aria-label="Jersey illustration">
    <defs>
      <radialGradient id="jerseyGlow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="jerseyFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3f0d18" />
        <stop offset="100%" stopColor="#1a0508" />
      </linearGradient>
      <linearGradient id="jerseyStripe" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="105" r="80" fill="url(#jerseyGlow)" />

    <motion.g
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* orbit ring, same motif as the favicon */}
      <circle cx="100" cy="100" r="72" fill="none" stroke="#f43f5e" strokeOpacity="0.15" strokeWidth="1" />

      {/* jersey silhouette */}
      <path
        d="M85,40 L70,40 L40,55 L48,90 L68,72 L65,155 L135,155 L132,72 L152,90 L160,55 L130,40 L115,40 L100,55 Z"
        fill="url(#jerseyFill)"
        stroke="#fda4af"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* racing stripes down each sleeve/side */}
      <path d="M70,40 L40,55 L48,90 L68,72 Z" fill="none" stroke="url(#jerseyStripe)" strokeOpacity="0.5" strokeWidth="3" strokeLinejoin="round" />
      <path d="M115,40 L130,40 L160,55 L152,90 L132,72 Z" fill="none" stroke="url(#jerseyStripe)" strokeOpacity="0.5" strokeWidth="3" strokeLinejoin="round" />
      <rect x="66" y="78" width="4" height="72" fill="url(#jerseyStripe)" opacity="0.55" />
      <rect x="130" y="78" width="4" height="72" fill="url(#jerseyStripe)" opacity="0.55" />

      {/* number */}
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight={900}
        fontSize="46"
        fill="#ffffff"
        fillOpacity="0.92"
      >
        10
      </text>
    </motion.g>
  </svg>
);

const DeviceIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-36 md:h-36" role="img" aria-label="Refurbished devices illustration">
    <defs>
      <radialGradient id="deviceGlow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#e5e5e5" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="laptopFill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#404040" />
        <stop offset="100%" stopColor="#171717" />
      </linearGradient>
      <linearGradient id="phoneFill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#525252" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      <linearGradient id="badgeFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="105" r="80" fill="url(#deviceGlow)" />

    <motion.g
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
    >
      <circle cx="100" cy="100" r="72" fill="none" stroke="#e5e5e5" strokeOpacity="0.15" strokeWidth="1" />

      {/* laptop, set back-left */}
      <rect x="24" y="58" width="94" height="60" rx="6" fill="url(#laptopFill)" stroke="#a3a3a3" strokeOpacity="0.35" />
      <rect x="30" y="64" width="82" height="48" rx="2" fill="#0a0a0a" />
      <path d="M12,118 L130,118 L140,130 L2,130 Z" fill="url(#laptopFill)" stroke="#a3a3a3" strokeOpacity="0.35" strokeLinejoin="round" />

      {/* phone, set forward-right, clear of the laptop */}
      <rect x="128" y="78" width="42" height="80" rx="9" fill="url(#phoneFill)" stroke="#d4d4d4" strokeOpacity="0.4" />
      <rect x="133" y="86" width="32" height="60" rx="3" fill="#0a0a0a" />
      <circle cx="149" cy="150" r="2.5" fill="#a3a3a3" />

      {/* certified badge, pinned to the phone's top-right corner */}
      <circle cx="163" cy="60" r="16" fill="url(#badgeFill)" stroke="#0a0a0a" strokeWidth="3" />
      <path d="M155,60 L161,66 L172,53" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
  </svg>
);

const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  premiumkit: <JerseyIllustration />,
  'apple-resale': <DeviceIllustration />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OtherWork: React.FC = () => {
  return (
    <section id="other-work" className="py-16 md:py-24 bg-neutral-900 border-t border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Other Live Work</h2>
          <p className="text-neutral-400 max-w-xl">
            A couple of other sites built and shipped outside the case studies above — live in production today.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {OTHER_WORK.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group block rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-colors"
            >
              {/* Browser-chrome mockup with a custom illustration — a designed placeholder, not a real screenshot */}
              <div className="relative h-52 md:h-60 overflow-hidden border-b border-neutral-800">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 backdrop-blur-sm flex items-center gap-1.5 px-3 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="ml-3 text-[10px] text-white/70 font-mono truncate">
                    {item.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pt-8 transition-transform duration-500 group-hover:scale-105">
                  {ILLUSTRATIONS[item.id]}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-rose-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <ExternalLink size={18} className="text-neutral-400 group-hover:text-white transition-colors shrink-0 mt-1" />
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OtherWork;
