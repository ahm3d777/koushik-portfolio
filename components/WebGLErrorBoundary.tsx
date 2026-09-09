import React from 'react';

interface Props {
  children: React.ReactNode;
  // Rendered in place of the crashed subtree. Defaults to nothing — the
  // rest of the page (nav, copy, links) stays fully usable either way,
  // this is purely about not losing the whole app to a decorative extra.
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// React only stops an uncaught render/commit error from unmounting the
// *entire* app if something between it and the root catches it — and
// nothing did, anywhere in this app, before this component existed. That
// was a real, reproducible failure mode: any visitor whose network can't
// fetch a drei asset (an HDR environment map, a remote font — corporate
// proxy, ad-blocker, flaky CDN, fully offline) got a blank page instead of
// a portfolio site, because the WebGL scenes on Home/Work/Articles were
// unguarded. Wrapping each one in this boundary means a failure there
// degrades to "no 3D flourish on this page" instead of "no page."
class WebGLErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Decorative WebGL failing is expected in some environments (blocked
    // CDN, no WebGL, etc.) — log for diagnostics, don't alarm the visitor.
    // eslint-disable-next-line no-console
    console.warn('A decorative 3D scene failed to load and was hidden:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default WebGLErrorBoundary;
