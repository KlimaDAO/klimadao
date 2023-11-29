import { Component, FC, PropsWithChildren } from "react";

type ErrorBoundaryProps<T extends Error> = {
  predicate: (error: T | Error | null) => boolean;
  fallback: React.ReactNode;
} & PropsWithChildren;

export class ConditionalErrorBoundary<T extends Error> extends Component<
  ErrorBoundaryProps<T>,
  { hasError: boolean; error: T | null }
> {
  constructor(props: ErrorBoundaryProps<T>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // If it's a specific error, render children anyway
      if (this.props.predicate(this.state.error)) {
        this.setState(() => ({ hasError: false, error: null }));
        return this.props.children;
      }
      // You can render any custom fallback UI
      return this.props.fallback;
    }
    return this.props.children;
  }
}

type WithConditionalErrorBoundaryProps<T, E extends Error> = T &
  ErrorBoundaryProps<E>;

/** A decorator version of WithSkeleton */
export function withConditionalErrorBoundary<T, E extends Error>(
  Component: React.ComponentType<T>,
  opts: ErrorBoundaryProps<E>
) {
  // Maintain the previous display name
  const displayName = Component.displayName ?? Component.name ?? "Component";

  /** Create out wrapped skeleton component */
  const ComponentWithConditionalErrorBoundary: FC<
    WithConditionalErrorBoundaryProps<T, E>
  > = (props) => (
    <ConditionalErrorBoundary
      predicate={opts.predicate}
      fallback={opts.fallback}
    >
      <Component {...props} />
    </ConditionalErrorBoundary>
  );

  /** Add another display name for the wrapped version */
  ComponentWithConditionalErrorBoundary.displayName = `withConditionalErrorBoundary(${displayName})`;

  return ComponentWithConditionalErrorBoundary;
}
