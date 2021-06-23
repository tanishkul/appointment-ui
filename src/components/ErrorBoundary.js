import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
      errorMessage: ''
    }

    static getDerivedStateFromError(error) {
      return { errorMessage: error.toString() }
    }

    componentDidCatch(error, info) {
      this.logErrorToServices(error.toString(), info.componentStack)
    }

    // A fake logging service 😬
    logErrorToServices = console.log

    render() {
      const { errorMessage } = this.state;
      const { children } = this.props;
      if (errorMessage) {
        return (
          <>
            <p>Seems like an error occured!</p>
            <p>
              {errorMessage}
            </p>
          </>
        )
      }
      return children;
    }
}

export default ErrorBoundary;
