
import React, { useState, useEffect } from 'react';

const WorldMap: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // UTC+6 (Dhaka)
      const dhakaTime = new Date(now.getTime() + (3600000 * 6) + (now.getTimezoneOffset() * 60000));
      setTime(dhakaTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:2rem_2rem]" />
       
       {/* Simplified World Map Silhouette (Abstract) */}
       <svg className="absolute inset-0 w-full h-full text-neutral-800 fill-current opacity-50" viewBox="0 0 1000 500">
          <path d="M145,280 C120,280 110,310 130,330 C150,350 180,340 180,310 C180,290 160,280 145,280 Z" />
          <path d="M220,120 C180,120 150,150 180,200 C210,250 260,220 280,180 C300,140 260,120 220,120 Z" />
          <path d="M450,150 C420,150 400,180 410,240 C420,300 480,350 520,320 C560,290 550,200 500,160 C480,150 450,150 450,150 Z" />
          <path d="M480,80 C450,80 440,110 460,130 C480,150 540,140 540,110 C540,90 500,80 480,80 Z" />
          <path d="M650,100 C600,100 580,150 600,200 C620,250 700,280 750,220 C800,160 750,100 650,100 Z" />
          <path d="M750,350 C730,350 720,370 730,390 C740,410 780,400 780,380 C780,360 760,350 750,350 Z" />
       </svg>

       {/* Dhaka Location Marker */}
       <div className="absolute top-[35%] left-[68%]">
          <div className="relative">
             <div className="absolute -inset-2 bg-rose-500 rounded-full opacity-30 animate-ping" />
             <div className="w-2 h-2 bg-rose-500 rounded-full relative z-10" />
             
             {/* Tooltip */}
             <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-neutral-950/90 backdrop-blur border border-neutral-700 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-100 transition-opacity z-20 shadow-xl">
                <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-0.5">DHAKA, BD</div>
                <div className="text-sm font-mono text-white font-bold">{time}</div>
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-700" />
             </div>
          </div>
       </div>
    </div>
  );
};

export default WorldMap;
