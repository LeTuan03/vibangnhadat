import React, { useState, useEffect } from 'react';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import GalleryFirebaseService from '../services/GalleryFirebaseService';
import type { GalleryItem } from '../types';
import './Gallery.css';

interface VideoModalProps {
    videoId: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
    return (
        <div className="video-modal" onClick={onClose}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose}>×</button>
                <iframe
                    width="100%"
                    height="600"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

const Gallery: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const data = await GalleryFirebaseService.getAllItems();
                setGalleryItems(data);
            } catch (err) {
                console.error('Error loading gallery items:', err);
                setGalleryItems([]);
            }
        };
        loadGallery();
    }, []);

    return (
        <section id="gallery" className="gallery-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Hình ảnh & Video</h2>
                    <a href="#" className="see-more-link">Xem thêm <FaArrowRight /></a>
                </div>
                <div className="gallery-grid">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-item">
                            {item.type === 'video' ? (
                                <div
                                    className="gallery-video"
                                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                                    onClick={() => setSelectedVideo(item.videoId || '')}
                                >
                                    <div className="video-overlay">
                                        <FaPlay className="play-icon" />
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="gallery-image"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedVideo && (
                <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
            )}
        </section>
    );
};

export default Gallery;
