import React from 'react';
import HomeNavbar from '../components/HomeNavbar/HomeNavbar';
import HeroSection from '../components/HeroSection/HeroSection';
import LiveTicker from '../components/Landing/LiveTicker';
import MatchChoreography from '../components/MatchChoreography/MatchChoreography';
import InteractiveSwipePreview from '../components/Landing/InteractiveSwipePreview';
import DualPerspectiveSection from '../components/Landing/DualPerspectiveSection';
import TrustBentoGrid from '../components/Landing/TrustBentoGrid';
import LandingFAQ from '../components/Landing/LandingFAQ';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <HomeNavbar />
      <HeroSection />
      <LiveTicker />
      <MatchChoreography />
      <InteractiveSwipePreview />
      <DualPerspectiveSection />
      <TrustBentoGrid />
      <LandingFAQ />
      <Footer />
    </div>
  );
};

export default HomePage;