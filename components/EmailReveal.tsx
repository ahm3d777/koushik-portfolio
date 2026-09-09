
import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

const EmailReveal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = SITE_CONFIG.email;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (permissions, insecure context) —
      // the mailto: link right next to this still works either way.
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start gap-4 relative z-10">
        <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-rose-500">
          <Mail size={20} />
        </div>

        <div className="flex-1">
          <div className="text-sm text-neutral-400 font-medium mb-1">Email Address</div>

          <div className="flex items-center gap-3">
            <a href={`mailto:${email}`} className="text-white font-bold text-lg hover:underline decoration-rose-500 underline-offset-4 break-all">
              {email}
            </a>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailReveal;
