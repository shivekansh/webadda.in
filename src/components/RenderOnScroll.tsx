import React, { useRef, useState, useEffect, ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

/**
 * A wrapper component that delays rendering (and thus downloading lazy-loaded JS)
 * until the element is within `rootMargin` of the viewport.
 * Perfect for low-end device optimization as it breaks up the initial main-thread workload.
 */
export function RenderOnScroll({ children, fallback = null, rootMargin = '400px' }: Props) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, just render immediately
    if (!window.IntersectionObserver) {
      setIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback || <div style={{ height: '50vh' }} /> // Prevents massive scrollbar jitter
      )}
    </div>
  );
}
