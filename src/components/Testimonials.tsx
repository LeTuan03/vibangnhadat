import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { mockTestimonials } from '../data/mockData';
import './Testimonials.css';

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [testimonials] = useState(mockTestimonials);
    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlay, totalSlides]);

    const goToPrevious = () => {
        setIsAutoPlay(false);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNext = () => {
        setIsAutoPlay(false);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const visibleTestimonials = testimonials.slice(
        currentIndex * itemsPerSlide,
        currentIndex * itemsPerSlide + itemsPerSlide
    );

    return (
        <section className="testimonials-section">
            <div className="">
                <h2 className="section-title" style={{ color: 'white' }}>
                    Khách Hàng Nói Gì Về Chúng Tôi
                </h2>
                <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Những phản hồi chân thực từ khách hàng đã sử dụng dịch vụ
                </p>

                <div className="testimonials-carousel">
                    <button className="carousel-btn prev" onClick={goToPrevious} aria-label="Previous">
                        <FaChevronLeft />
                    </button>

                    <div className="testimonials-grid">
                        {visibleTestimonials.map((testimonial) => (
                            <div className="testimonial-card" key={testimonial.id}>
                                <FaQuoteLeft className="quote-icon" />

                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <p className="testimonial-content">{testimonial.content}</p>

                                <div className="testimonial-author">
                                    <div className="author-avatar">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="author-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>
                                            {testimonial.position}
                                            {testimonial.company && ` - ${testimonial.company}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-btn next" onClick={goToNext} aria-label="Next">
                        <FaChevronRight />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="carousel-dots">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setIsAutoPlay(false);
                                setCurrentIndex(index);
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
