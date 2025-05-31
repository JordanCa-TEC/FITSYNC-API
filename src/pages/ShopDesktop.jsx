import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../sass/_shopDesktop.scss";
import { Banner_fitsyncMKT } from "../assets/assets";
import { addToCart } from "../redux/shopSlice";

const ShopDesktop = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [products.length]);

  return (
    <div className="shop">
      <section className="shop__desktop">
        <div className="parent">
          {products?.length > 0 ? (
            products.map((product, index) =>
              product?.id ? (
                <div
                  key={product.id}
                  className={`shop__item--${index + 1} parent__content--div`}
                >
                  <Link to={`/shop/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                  </Link>
                  <h3>{product.subCategory}</h3>
                  <h2 className="item__price">s/.{product.price}</h2>

                  {/* BOTÓN AGREGAR AL CARRITO */}
                  <button
                    className="add-to-cart-btn"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Agregar al carrito
                  </button>
                </div>
              ) : null
            )
          ) : (
            <p>Cargando productos...</p>
          )}

          {/* --- BANNER  --- */}
          <div className="shop__item--10 parent__content--div">
            <img src={Banner_fitsyncMKT} alt="Banner Promocional" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopDesktop;
