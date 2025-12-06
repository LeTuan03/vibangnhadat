import React, { ReactNode } from 'react';
import { logger } from '../utils/logger';
import './ErrorBoundary.css';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component to catch React errors and display fallback UI
 */
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(_error: Error): Partial<State> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });
        logger.error('React Error Boundary caught an error', error);
        logger.error('Component Stack', errorInfo.componentStack);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <h1>Oops! Đã có lỗi xảy ra</h1>
                        <p>Xin lỗi, ứng dụng gặp một lỗi không mong muốn.</p>

                        {this.state.error && (
                            <details style={{ whiteSpace: 'pre-wrap' }} className="error-details">
                                <summary>Thông tin lỗi (Chi tiết kỹ thuật)</summary>
                                {this.state.error.toString()}
                                {'\n\n'}
                                {this.state.errorInfo?.componentStack}
                            </details>
                        )}

                        <button onClick={this.handleReset} className="error-reset-btn">
                            Thử lại
                        </button>
                        <a href="/" className="error-home-link">
                            Về trang chủ
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
