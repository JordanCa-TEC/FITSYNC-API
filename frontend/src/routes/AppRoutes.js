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
import ChatWindowsEN from '../pages/ChatWindowsEN';
import CalendarUser from '../pages/CalendarUser';
import Profile from '../pages/ProfileScreen';
import OrdersUser from '../pages/ProfileOrders';

const AppRoutes = () => {
  return (
    <Routes>
      {/* MainLayout envuelve todo desde aquí */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeDesktop />} />
        <Route path="/about" element={<AboutDesktop />} />
        <Route path="/shop" element={<ShopDesktop />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/checkoutshop" element={<CheckoutShop />} />
        <Route path="/contact" element={<ContactDesktop />} />
        <Route path="/login" element={<LoginDesktop />} />
        <Route path="/record" element={<CreateDesktop />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path='/Entrenador' element={<ChatWindowsEN />} />
          <Route path='/nutricionista' element={<ChatWindowsEN />} />
          <Route path='/usercalendar' element={<CalendarUser />} />
          <Route path='/profileuser' element={<Profile />} />
          <Route path='/orders' element={<OrdersUser />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;



