import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Redirect to the premium static 404 page, preserving the attempted URL in the query string
    const attemptedUrl = window.location.pathname + window.location.search;
    window.location.replace(`/404.html?from=${encodeURIComponent(attemptedUrl)}`);
  }, []);

  return null; // Return nothing while redirecting
}
