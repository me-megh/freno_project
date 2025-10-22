import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import { ToastContainer } from 'react-toastify';
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
