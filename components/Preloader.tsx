
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('INITIALIZING...');

  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    // Text scramble effect
    const texts = ['INITIALIZING...', 'LOADING ASSETS...', 'CONNECTING...', 'ESTABLISHING UPLINK...', 'SYSTEM READY'];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setText(texts[textIndex]);
    }, 220);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Name Glitch Effect */}
        <div className="mb-12 text-center relative">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mix-blend-difference relative inline-block">
            <span className="relative z-10">KOUSHIK</span>
            <span className="absolute top-0 left-0 -ml-1 text-rose-500 opacity-50 animate-pulse">KOUSHIK</span>
            <span className="absolute top-0 left-0 ml-1 text-blue-500 opacity-50 animate-pulse delay-75">KOUSHIK</span>
          </h1>
          <div className="h-1 w-24 bg-rose-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden mb-4 border border-neutral-800">
          <motion.div 
            className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="flex justify-between items-end text-xs md:text-sm font-bold tracking-widest text-neutral-400">
          <div className="flex flex-col">
             <span className="text-rose-500 mb-1">STATUS</span>
             <span className="text-white min-w-[140px]">{count === 100 ? 'ACCESS GRANTED' : text}</span>
          </div>
          <div className="text-4xl md:text-5xl text-neutral-800 font-black relative">
            <span className="absolute inset-0 text-neutral-800 blur-sm">{count}</span>
            <span className="relative text-white">{count}</span>
            <span className="text-base text-rose-500 ml-1">%</span>
          </div>
        </div>

        {/* Decorative Code Lines */}
        <div className="mt-12 space-y-1 opacity-30 text-[10px] text-green-500 text-center select-none">
          <p>0x23948: MEM_ALLOC_SUCCESS</p>
          <p>0x8821A: VIRTUAL_DOM_READY</p>
          <p>0x1102B: SECURE_CONNECTION_EST</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
