// src/components/Products/ProductForm.jsx

import { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    price: '',
    image: '',
    description: '', // <-- Agregué el campo de descripción aquí
  });

  useEffect(() => {
    if (product) {
      // Usamos el operador de propagación para asegurarnos de que el estado
      // se inicialice correctamente con todos los campos del producto,
      // incluyendo la descripción si existe.
      setFormData({
        name: product.name || '',
        artist: product.artist || '',
        price: product.price || '',
        image: product.image || '',
        description: product.description || '', // <-- Aseguramos que la descripción se inicialice
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {product ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Artista</label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {/* Campo de descripción para editar */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">URL de la Imagen</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;