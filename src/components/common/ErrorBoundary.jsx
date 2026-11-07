import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Grantly UI Exception Caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    try {
      localStorage.removeItem('grantly_saved_ids');
      localStorage.removeItem('grantly_compare_ids');
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-main, #f8fafc)',
            padding: '1.5rem',
            fontFamily: 'var(--font-main, sans-serif)'
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-xl, 24px)',
              boxShadow: 'var(--shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.1))',
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-color, #e2e8f0)'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--accent-rose-light, #fff1f2)',
                color: 'var(--accent-rose, #f43f5e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary, #101828)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em'
              }}
            >
              Something Went Wrong
            </h2>

            <p
              style={{
                color: 'var(--text-secondary, #475467)',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}
            >
              GRANTLY encountered an unexpected view state error. Your personal credentials and application tracking data remain safely preserved.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={this.handleReload}
                className="btn btn-primary"
                style={{ flex: '1 1 140px' }}
              >
                <RotateCcw size={16} />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="btn btn-secondary"
                style={{ flex: '1 1 140px' }}
              >
                <Home size={16} />
                <span>Reset Safe State</span>
              </button>
            </div>

            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <details
                style={{
                  marginTop: '1.5rem',
                  textAlign: 'left',
                  background: 'var(--bg-card-subtle, #f1f5f9)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md, 12px)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted, #64748b)',
                  overflowX: 'auto'
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Diagnostic Details</summary>
                <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
