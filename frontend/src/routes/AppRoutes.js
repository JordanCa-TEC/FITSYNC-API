import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MainLayout from '../layouts/MainLayout'; 
import HomeDesktop from '../pages/HomeDesktop'; 
import AboutDesktop from '../pages/AboutDesktop';
import ShopDesktop from '../pages/ShopDesktop';
import CheckoutShop from "../pages/CheckoutShop";
import ContactDesktop from '../pages/ContactDesktop';
import ProductDetail from '../pages/ProductDetail';
import LoginDesktop from '../pages/LoginDesktop';
import CreateDesktop from '../pages/CreateDesktop';
import PrivateRoute from "../components/ProtectedRoute";
import UserDashboard from '../pages/UserDashboard';

const AppRoutes = () => {
  return (
    <MainLayout> {/* MainLayout envuelve las rutas */}
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<HomeDesktop />} />
        <Route path="/about" element={<AboutDesktop />} />
        <Route path="/shop" element={<ShopDesktop />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/checkoutshop" element={<CheckoutShop />} />
        <Route path="/contact" element={<ContactDesktop />} />
        <Route path="/login" element={<LoginDesktop />} />
        <Route path="/record" element={<CreateDesktop />} />
        {/* Rutas protegidas dentro de PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;



