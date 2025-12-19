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
        title: 'Văn phòng Thừa phát lại Hoàng Mai | Lập vi bằng - Tống đạt - Thi hành án',
        description: 'Văn phòng Thừa phát lại Hoàng Mai chuyên nghiệp - Dịch vụ lập vi bằng, tống đạt văn bản, xác minh điều kiện thi hành án tại Hà Nội. Uy tín, nhanh chóng, đúng pháp luật.',
        keywords: 'thừa phát lại hoàng mai, lập vi bằng hoàng mai, tống đạt văn bản hoàng mai, thi hành án hoàng mai, văn phòng thừa phát lại hà nội, dịch vụ thừa phát lại, văn phòng thừa phát lại hoàng mai',
        canonical: typeof window !== 'undefined' ? window.location.origin : '',
        ogType: 'website',
        ogTitle: 'Văn phòng Thừa phát lại Hoàng Mai | Lập vi bằng - Tống đạt - Thi hành án',
        ogDescription: 'Dịch vụ thừa phát lại chuyên nghiệp tại Hoàng Mai, Hà Nội. Lập vi bằng, tống đạt văn bản, thi hành án uy tín.',
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
