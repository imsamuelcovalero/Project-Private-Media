/* File: src/helpers/ErrorBoundary.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary é um componente wrapper que captura erros em seus componentes filhos
 * e exibe uma IU alternativa com uma mensagem de erro personalizada.
 * Ele previne que um erro em um componente cause falha em toda a aplicação.
 *
 * Uso:
 * <ErrorBoundary>
 *   <SeuComponente />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h1>Algo deu errado.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;
