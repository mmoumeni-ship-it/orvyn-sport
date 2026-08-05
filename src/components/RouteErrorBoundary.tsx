import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';

type BoundaryProps = { children: ReactNode };
type BoundaryState = { hasError: boolean };

class InnerBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras({ componentStack: errorInfo.componentStack });
      Sentry.captureException(error);
    });
  }

  reset() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-bone px-4 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="font-display text-2xl font-semibold text-charbon">
              Oups, une erreur est survenue
            </h2>
            <p className="text-sm text-olive">
              La page a rencontré un problème. Vous pouvez retourner à l'accueil ou réessayer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="orvyn-clip-sm inline-flex items-center justify-center bg-sauge px-6 py-3 text-xs font-semibold uppercase tracking-widest text-bone"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function RouteErrorBoundary({ children }: BoundaryProps) {
  const location = useLocation();
  return (
    <InnerBoundary key={location.pathname}>
      {children}
    </InnerBoundary>
  );
}
