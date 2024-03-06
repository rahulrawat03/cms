import { Component, ReactNode } from "react";
import { AlertTriangle } from "react-feather";
import css from "./error-boundary.module.css";

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<{ children: ReactNode }> {
  public state: State = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.setState({
      errorMessage: error.message,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={css.error}>
          <AlertTriangle size={48} />
          <h2 className={css.title}>
            An unexpected error occurred while running the app!
          </h2>
          <p className={css.body}>{this.state.errorMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
