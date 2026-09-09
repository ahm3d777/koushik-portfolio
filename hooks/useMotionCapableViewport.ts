import { useEffect, useState } from 'react';

/**
 * True when the visitor's device can comfortably run continuous, purely
 * decorative animation: the viewport is at least `minWidth` px wide, and
 * the OS-level `prefers-reduced-motion` setting is not on.
 *
 * Use this to gate whether an animation-heavy component (a canvas particle
 * field, a Three.js scene) gets mounted at all — not just hidden with CSS —
 * so phones and reduced-motion visitors never pay for fetching or running
 * it in the first place.
 */
export function useMotionCapableViewport(minWidth = 768): boolean {
  const computeCapable = () => {
    if (typeof window === 'undefined') return false;
    const wideEnough = window.innerWidth >= minWidth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return wideEnough && !reducedMotion;
  };

  const [capable, setCapable] = useState(computeCapable);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCapable(computeCapable());

    window.addEventListener('resize', update);
    mediaQuery.addEventListener('change', update);
    // Re-check once on mount too, in case SSR/initial render guessed wrong.
    update();

    return () => {
      window.removeEventListener('resize', update);
      mediaQuery.removeEventListener('change', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minWidth]);

  return capable;
}
