import React from "react";

interface ErrorBoundaryState {
  error: Error | null;
  refresh: boolean;
}

interface ErrorBoundaryProps {
  fallback?: React.ReactElement<
    unknown,
    string | React.FunctionComponent | typeof React.Component
  > | null;
}

const initialState: ErrorBoundaryState = { error: null, refresh: false };

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    // Update state so next render shows fallback UI.
    return { error };
  }

  state = initialState;

  resetErrorBoundary = () => {
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    const { error, refresh } = this.state;

    if (prevState.error !== null && refresh) {
      this.reset();
    }
  }

  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;

    if (error !== null) {
      if (React.isValidElement(fallback)) {
        return fallback;
      }

      // when error happens, but fallback UI is not valid
      // this.resetErrorBoundary();
      return (
        <>
          <div>에러가 발생했습니다.</div>
          <button
            onClick={() => {
              this.setState((prev) => ({ ...prev, refresh: true }));
            }}
          >
            새로 고침을 눌러주세요.
          </button>
        </>
      );
    }

    return children;
  }
}
