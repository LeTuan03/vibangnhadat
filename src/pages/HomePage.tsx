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
import Careers from '../components/Careers';
import Contact from '../components/Contact';
// import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
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
                <Careers />
                <Contact />
            </main>
            {/* <Newsletter /> */}
        </div>
    );
};

export default HomePage;
