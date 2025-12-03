import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { contactInfo } from '../data/content';
import { createPhoneLink, createZaloLink } from '../utils/helpers';
import './FloatingContact.css';

const FloatingContact: React.FC = () => {

    return (
        <div className="floating-contact">
            <a
                href={createZaloLink(contactInfo.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn floating-btn-zalo"
                title="Chat qua Zalo"
            >
                <SiZalo />
            </a>
            <a
                href={createPhoneLink(contactInfo.phone)}
                className="floating-btn floating-btn-phone"
                title="Gọi điện ngay"
            >
                <FaPhone />
            </a>
        </div>
    );
};

export default FloatingContact;
