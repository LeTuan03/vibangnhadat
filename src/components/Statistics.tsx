import React, { useEffect, useState } from 'react';
import { FaAward, FaUsers, FaFileContract, FaCheckCircle } from 'react-icons/fa';
import { statistics } from '../data/content';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Statistics.css';

const iconMap: Record<string, React.ReactNode> = {
    FaAward: <FaAward />,
    FaUsers: <FaUsers />,
    FaFileContract: <FaFileContract />,
    FaCheckCircle: <FaCheckCircle />,
};

const Statistics: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, freezeOnceVisible: true });
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;

        statistics.forEach((stat) => {
            let currentStep = 0;
            const increment = stat.value / steps;

            const timer = setInterval(() => {
                currentStep++;
                setCounts((prev) => ({
                    ...prev,
                    [stat.id]: Math.min(Math.round(increment * currentStep), stat.value),
                }));

                if (currentStep >= steps) {
                    clearInterval(timer);
                }
            }, interval);
        });
    }, [isVisible]);

    return (
        <section className="statistics-section">
            <div className="container">
                <div ref={ref} className={`statistics-grid`}>
                    {statistics.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="stat-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="stat-icon">
                                {iconMap[stat.icon]}
                            </div>
                            <div className="stat-value">
                                {counts[stat.id] || 0}{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
