import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { getContactInfo } from '../services';
import { createPhoneLink, createZaloLink } from '../utils/helpers';
import './FloatingContact.css';

const FloatingContact: React.FC = () => {
    const [contactInfo, setContactInfo] = React.useState<any>({ phone: '' });

    React.useEffect(() => {
        const load = async () => {
            try {
                const c = await getContactInfo();
                if (c) setContactInfo(c);
            } catch (err) {
                console.error('Lỗi tải contact cho FloatingContact:', err);
            }
        };

        load();
    }, []);

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

