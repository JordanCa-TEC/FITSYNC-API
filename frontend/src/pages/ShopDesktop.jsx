import React, { useEffect, useState } from 'react';
import '../sass/_shopDesktop.scss';
import axios from 'axios';
import { Banner_fitsyncMKT } from '../assets/assets';


const ShopDesktop = () => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); // URL de tu API
        setProducts(response.data); // Asume que la API devuelve un array de productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop">
      <section className="shop__desktop">
        <div className="parent">
          {/* Renderizado dinámico de productos */}
          {products.map((product, index) => (
            <div key={index} className={`shop__item--${index + 1} parent__content--div`}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <h3>{product.subCategory}</h3>
              <h2 className="item__price">s/.{product.price}</h2>
              <button>Agregar al carrito</button>
            </div>
          ))}
        </div>
      </section>
      <section className="shop__banner">
          <img src={Banner_fitsyncMKT} alt="Banner Promocional" />
      </section>
    </div>
  );
};

export default ShopDesktop;