import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useProductDetail } from '../components/ProductDetail';
import { addToCart } from '../redux/shopSlice';
// import '../sass/_ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // ✅ Hook para despachar acciones
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
          {/* ✅ Despachamos la acción al hacer clic */}
          <button className="button--add" onClick={() => dispatch(addToCart(product))}>
            Agregar al carrito
          </button>
        </div>
        <div className="product-detail__Description">
          <h3>Descripción</h3>
          {product.info.split('\n\n').map((block, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              {block.split('\n').map((line, lineIndex) => (
                <p key={lineIndex}>
                  • {line}
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
