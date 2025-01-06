import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../components/ProductDetail';
import '../sass/_ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);

  if (loading) return <p>Cargando información del producto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail__image" />
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <h3>{product.subCategory}</h3>
        <p>{product.description}</p>
        <h2>s/.{product.price}</h2>
        <div className="product-detail__actions">
          <button className="button--add">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
