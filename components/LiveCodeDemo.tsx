
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, CheckCircle2 } from 'lucide-react';

const codeSnippet = `
// Optimized Data Processor
class StreamEngine {
  constructor(private capacity: number) {
    this.buffer = new SharedArrayBuffer(capacity);
    this.view = new DataView(this.buffer);
  }

  async process(stream: ReadableStream): Promise<Result> {
    let processed = 0;
    const start = performance.now();

    for await (const chunk of stream) {
      // Zero-copy processing
      if (this.shouldOptimize(chunk)) {
        await this.fastPath(chunk);
      } else {
        await this.standardPath(chunk);
      }
      
      processed += chunk.byteLength;
      
      if (processed % 1000 === 0) {
        this.emit('progress', processed);
      }
    }

    return {
      bytes: processed,
      duration: performance.now() - start
    };
  }
}
`;

const LiveCodeDemo: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.slice(0, index));
      index++;
      if (index > codeSnippet.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 20); // Typing speed
    
    return () => clearInterval(interval);
  }, []);

  // Simple syntax highlighting (mock)
  const renderCode = () => {
    return { __html: displayedCode
      .replace(/class|constructor|async|await|return|if|else|for|of|private/g, '<span class="text-rose-500 font-bold">$&</span>')
      .replace(/StreamEngine|SharedArrayBuffer|DataView|ReadableStream|Result|Promise/g, '<span class="text-yellow-400">$&</span>')
      .replace(/this|buffer|view|capacity|chunk|processed|start/g, '<span class="text-blue-300">$&</span>')
      .replace(/process|shouldOptimize|fastPath|standardPath|emit/g, '<span class="text-blue-400">$&</span>')
      .replace(/\/\/.*/g, '<span class="text-neutral-400 italic">$&</span>')
      .replace(/{|}|;|\(|\)/g, '<span class="text-neutral-400">$&</span>')
      .replace(/[0-9]+/g, '<span class="text-green-400">$&</span>')
    };
  };

  return (
    <div className="w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-blue-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
      
      <div className="relative bg-neutral-900 z-10">
        {/* Window Header */}
        <div className="bg-neutral-950 px-4 py-3 flex items-center relative border-b border-neutral-800 h-10 md:h-12">
            <div className="flex gap-2 absolute left-4 top-1/2 -translate-y-1/2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            
            <div className="w-full flex justify-center">
                 <div className="text-xs text-neutral-400 font-mono flex items-center gap-2 px-3 py-1 bg-neutral-900/50 rounded-md border border-neutral-800/50 md:border-transparent md:bg-transparent">
                    <Terminal size={12} /> 
                    <span className="opacity-80">engine.ts</span>
                 </div>
            </div>
        </div>
        
        {/* Code Area */}
        <div className="p-4 md:p-6 font-mono text-xs md:text-sm overflow-x-auto min-h-[300px] md:h-[400px]">
            <pre className="text-neutral-300 leading-relaxed tab-[2]">
            <code dangerouslySetInnerHTML={renderCode()} />
            <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-rose-500 align-middle ml-1"
            />
            </pre>
        </div>

        {/* Footer */}
        <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-800 flex justify-between items-center text-[10px] md:text-xs text-neutral-400">
            <div className="flex gap-4">
                <span>TypeScript</span>
                <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-2">
                {isComplete ? (
                    <span className="flex items-center gap-1 text-green-500">
                        <CheckCircle2 size={12} /> Compiled
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-rose-500">
                        <Play size={10} fill="currentColor" /> Compiling...
                    </span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodeDemo;
