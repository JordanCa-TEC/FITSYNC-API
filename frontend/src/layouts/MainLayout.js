import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from "../components/Cart";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Cart />
      <main>{children}</main>
      <Footer />  
    </div>
  );
};

export default MainLayout;