import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/shopSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { carrito, logo, account_login, menu_icon } from "../assets/assets";
import Cart from "../components/Cart";
import UserMenu from "../components/user/UserMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.shop.isCartOpen);
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedUser, setLoggedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleUserClick = () => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="home__header">
      <nav className="navbar">
      <Link className="navbar__logo--Link" to="/"><img src={logo} alt="Logo__gym-fitsync" className="navbar__logo" /></Link>
      
        
        {/* Menú hamburguesa para mobile */}
        <button className="navbar__mobile-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <span className="close-icon">X</span> // Letra X como botón de cerrar
          ) : (
            <img src={menu_icon} alt="Menu" /> // Icono hamburguesa
          )}
        </button>
        
        {/* Menú principal */}
        <ul className={`navbar__menu-Principal ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Quiénes somos</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
        
        <div className="navbar__menu-icon">
          <button className="cart__button" onClick={() => dispatch(toggleCart())}>
            <img src={carrito} alt="shopping cart" />
          </button>

          <button className="cart__button" onClick={handleUserClick}>
            <img src={account_login} alt="login Account" />
          </button>

          {loggedUser && isMenuOpen && <UserMenu handleLogout={handleLogout} closeMenu={() => setIsMenuOpen(false)} />}
        </div>

        {isCartOpen && (
          <div className="cart">
            <Cart />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;