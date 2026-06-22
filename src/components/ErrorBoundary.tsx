import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 flex flex-col items-center justify-center text-center max-w-md mx-auto my-8">
          <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-sm text-slate-400 mb-4">We encountered an error loading this section.</p>
          <pre className="text-xs text-red-400 text-left overflow-auto max-w-full p-2 bg-black/50 mb-4">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
