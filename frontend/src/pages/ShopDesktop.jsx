import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, addToCart, toggleCart } from "../redux/shopSlice";
import axios from "axios";
import Cart from "../components/Cart";
import "../sass/_shopDesktop.scss";
import { Banner_fitsyncMKT } from "../assets/assets";

const ShopDesktop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);

  useEffect(() => {
    if (products.length === 0) {  // Evita llamadas innecesarias
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/products");
          dispatch(setProducts(response.data));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [dispatch, products.length]);

  return (
    <div className="shop">
      <button className="cart-icon" onClick={() => dispatch(toggleCart())}>🛒</button>
      <Cart />

      <section className="shop__desktop">
        <div className="parent">
          {products?.length > 0 ? (
            products.map((product, index) =>
              product?.id ? (
                <div key={product.id} className={`shop__item--${index + 1} parent__content--div`}>
                  <Link to={`/shop/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                  </Link>
                  <h3>{product.subCategory}</h3>
                  <h2 className="item__price">s/.{product.price}</h2>
                  <button onClick={() => dispatch(addToCart(product))}>Agregar al carrito</button>
                </div>
              ) : null
            )
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </section>

      <section className="shop__banner">
        <img src={Banner_fitsyncMKT} alt="Banner Promocional" />
      </section>
    </div>
  );
};

export default ShopDesktop;
