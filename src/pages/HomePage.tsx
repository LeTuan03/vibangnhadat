import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Statistics from '../components/Statistics';
import Services from '../components/Services';
import ServiceAreas from '../components/ServiceAreas';
// import VibanServices from '../components/VibanServices';
// import FamilyLawQA from '../components/FamilyLawQA';
import Gallery from '../components/Gallery';
// import Testimonials from '../components/Testimonials';
// import Knowledge from '../components/Knowledge';
import QA from '../components/QA';
import Booking from '../components/Booking';
// import Careers from '../components/Careers';
import Contact from '../components/Contact';
import { useSEO, generateOrganizationStructuredData } from '../hooks/useSEO';
// import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
    useSEO({
        title: 'Văn phòng Thừa phát lại - Dịch vụ lập vi bằng, tống đạt, thi hành án',
        description: 'Văn phòng Thừa phát lại chuyên nghiệp - Cung cấp dịch vụ lập vi bằng, tống đạt văn bản, xác minh điều kiện thi hành án và tổ chức thi hành án với đội ngũ chuyên gia giàu kinh nghiệm.',
        keywords: 'thừa phát lại, lập vi bằng, tống đạt văn bản, thi hành án, xác minh điều kiện, pháp luật',
        canonical: typeof window !== 'undefined' ? window.location.origin : '',
        ogType: 'website',
        ogTitle: 'Văn phòng Thừa phát lại - Dịch vụ lập vi bằng, tống đạt, thi hành án',
        ogDescription: 'Dịch vụ thừa phát lại chuyên nghiệp, uy tín. Lập vi bằng, tống đạt văn bản, thi hành án.',
        ogImage: '/og-image.jpg',
        structuredData: generateOrganizationStructuredData(),
    });

    return (
        <div className="home-page">
            <main>
                <Hero />
                <About />
                <Statistics />
                <Services />
                <ServiceAreas />
                {/* <VibanServices /> */}
                {/* <FamilyLawQA /> */}
                <Gallery />
                {/* <Testimonials /> */}
                {/* <Knowledge /> */}
                <QA />
                <Booking />
                {/* <Careers /> */}
                <Contact />
            </main>
            {/* <Newsletter /> */}
        </div>
    );
};

export default HomePage;
