import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas text-fg flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-fg mb-3">Etwas ist schiefgelaufen</h1>
            <p className="text-muted text-sm mb-6">{this.state.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-fg px-6 py-3 text-sm font-semibold text-canvas hover:bg-black transition-all"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
