import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import MainLayout from '../layouts/MainLayout'; // Importa MainLayout
import HomeDesktop from '../pages/HomeDesktop'; // Importa las páginas
import AboutDesktop from '../pages/AboutDesktop';
import ShopDesktop from '../pages/ShopDesktop';
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
        <Route path="/contact" element={<ContactDesktop />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;



