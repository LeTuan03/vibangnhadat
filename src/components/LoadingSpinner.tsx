import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    fullScreen = false,
    message = 'Đang tải...'
}) => {
    if (fullScreen) {
        return (
            <div className="loading-overlay">
                <div className="loading-content">
                    <div className="spinner"></div>
                    <p>{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="loading-inline">
            <div className="spinner"></div>
            <p>{message}</p>
        </div>
    );
};

export default LoadingSpinner;
