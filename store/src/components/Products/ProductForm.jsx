// src/components/Products/ProductForm.jsx
import { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    price: '',
    image: '',
    description: '',
    category: 'merchandise'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        artist: product.artist || '',
        price: product.price || '',
        image: product.image || '',
        description: product.description || '',
        category: product.category || 'merchandise'
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.artist || !formData.price) {
      setError('Nombre, artista y precio son obligatorios');
      return;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('El precio debe ser un número válido mayor a 0');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError('Error al guardar el producto. Intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {product ? 'Editar Producto' : 'Agregar Producto'}
      </h2>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading}
          />
        </div>

        {/* Artista */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">
            Artista <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Precio */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">
            Precio <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full pl-8 pr-2 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          >
            <option value="merchandise">Merchandise</option>
            <option value="camisetas">Camisetas</option>
            <option value="hoodies">Hoodies</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
      </div>

      {/* URL de la Imagen */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">URL de la Imagen</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={loading}
        />
        {formData.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </>
          ) : (
            'Guardar'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;