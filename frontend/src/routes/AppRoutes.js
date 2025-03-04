import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MainLayout from '../layouts/MainLayout'; 
import HomeDesktop from '../pages/HomeDesktop'; 
import AboutDesktop from '../pages/AboutDesktop';
import ShopDesktop from '../pages/ShopDesktop';
import CheckoutShop from "../pages/CheckoutShop";
import ContactDesktop from '../pages/ContactDesktop';
import ProductDetail from '../pages/ProductDetail';

const AppRoutes = () => {
  return (
    <MainLayout> {/* MainLayout envuelve las rutas */}
      <Routes>
        {/* Define las rutas principales */}
        <Route path="/" element={<HomeDesktop />} />
        <Route path="/about" element={<AboutDesktop />} />
        <Route path="/shop" element={<ShopDesktop />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/checkoutshop" element={<CheckoutShop />} />
        <Route path="/contact" element={<ContactDesktop />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;



