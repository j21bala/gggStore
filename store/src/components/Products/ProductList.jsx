// src/components/Products/ProductList.jsx
import React from 'react';
import { useProducts } from '../../context/ProductsContext';

const ProductList = ({ onEdit }) => {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-600/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
        >
          {/* Product Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image || 'https://via.placeholder.com/400x300?text=Product'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              ${product.price}
            </div>

            {/* CRUD Buttons - Ahora con z-index alto para garantizar la interactividad */}
            <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center space-x-4 z-10">
              <button
                onClick={() => onEdit(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition-all duration-300"
              >
                Editar
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition-all duration-300"
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {product.description || 'Producto oficial de merchandising'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-medium text-sm uppercase tracking-wider">
                {product.category || 'Merchandise'}
              </span>
              {/* Se ha eliminado el div de las estrellas como pediste */}
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;