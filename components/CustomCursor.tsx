
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A small, "premium portfolio" signature touch: a two-part cursor (a tight
// dot + a trailing ring) that snaps onto interactive elements. Feature-
// detected rather than viewport-gated — this is about *input type*
// (mouse vs touch), not screen size — and it backs off entirely for
// prefers-reduced-motion visitors, since it's pure decoration riding on
// every pointer move.
const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Two springs at different stiffness give the dot/ring their tight-vs-lag feel.
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fineHover.matches && !reducedMotion.matches);
    update();
    fineHover.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      fineHover.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      setIsPointer(!!target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'));
    };
    const hide = () => setVisible(false);

    window.addEventListener('pointermove', move);
    document.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseleave', hide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none" aria-hidden="true">
      {/* Tight dot, follows the raw pointer position */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-rose-500"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: isPointer ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Trailing ring, springs toward the pointer and grows over links/buttons */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-rose-400/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          backgroundColor: isPointer ? 'rgba(244,63,94,0.12)' : 'rgba(244,63,94,0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </div>
  );
};

export default CustomCursor;
