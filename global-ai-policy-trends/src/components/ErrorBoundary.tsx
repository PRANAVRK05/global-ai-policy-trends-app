import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
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
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 glass-panel rounded-2xl border border-red-500/20 m-8">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 mb-6 text-center max-w-md">
            {this.state.error?.message || "An unexpected error occurred in the application."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <RefreshCw className="h-4 w-4" /> Reload Page
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
