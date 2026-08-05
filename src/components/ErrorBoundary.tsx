import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import * as Sentry from '@sentry/react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras({ componentStack: errorInfo.componentStack });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bone px-4 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="font-display text-3xl font-semibold text-charbon">Une erreur est survenue</h1>
            <p className="text-sm text-olive">La page a rencontré un problème inattendu.</p>
            <Link to="/" className="orvyn-clip-sm inline-flex items-center justify-center bg-sauge px-6 py-3 text-xs font-semibold uppercase tracking-widest text-bone">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
