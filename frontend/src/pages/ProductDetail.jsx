import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../components/ProductDetail';
import '../sass/_ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
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
        <div className="product-detail__Description">
        <h3>Descripción</h3>
        {product.info.split('\n\n').map((block, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            {block.split('\n').map((line, lineIndex) => (
              <p key={lineIndex}>
                • {line} {/* Aquí agregamos el punto antes de cada línea */}
              </p>
            ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
