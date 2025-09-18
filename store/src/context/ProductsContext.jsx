// src/context/ProductsContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const ProductsContext = createContext();

// URL base de la API (ajusta según tu configuración)
const API_URL = import.meta.env.VITE_API_URL;



export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener todos los productos
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/productos`);
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      
      // Mapear los datos de la BD al formato esperado por el frontend
      const mappedProducts = data.map(product => ({
        id: product.id,
        name: product.nombre,
        artist: product.artista,
        description: product.descripcion,
        price: product.precio,
        image: product.url,
        category: product.categoria
      }));
      
      setProducts(mappedProducts);
      setError(null);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un producto
  const addProduct = async (product) => {
    try {
      // Mapear el formato del frontend al de la BD
      const productData = {
        nombre: product.name,
        artista: product.artist,
        descripcion: product.description || '',
        precio: parseFloat(product.price),
        url: product.image || '',
        categoria: product.category || 'merchandise'
      };

      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Error al crear producto');
      }

      const result = await response.json();
      
      // Actualizar la lista de productos
      await fetchProducts();
      
      return result;
    } catch (err) {
      console.error('Error al agregar producto:', err);
      setError(err.message);
      throw err;
    }
  };

  // Función para actualizar un producto
  const updateProduct = async (updatedProduct) => {
    try {
      // Mapear el formato del frontend al de la BD
      const productData = {
        nombre: updatedProduct.name,
        artista: updatedProduct.artist,
        descripcion: updatedProduct.description || '',
        precio: parseFloat(updatedProduct.price),
        url: updatedProduct.image || '',
        categoria: updatedProduct.category || 'merchandise'
      };

      const response = await fetch(`${API_URL}/productos/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }

      const result = await response.json();
      
      // Actualizar la lista de productos
      await fetchProducts();
      
      return result;
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      setError(err.message);
      throw err;
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (productId) => {
    try {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
      if (!confirmDelete) return;

      const response = await fetch(`${API_URL}/productos/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      const result = await response.json();
      
      // Actualizar la lista de productos
      await fetchProducts();
      
      return result;
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      setError(err.message);
      throw err;
    }
  };

  // Función para refrescar los productos
  const refreshProducts = () => {
    fetchProducts();
  };

  return (
    <ProductsContext.Provider
      value={{ 
        products, 
        loading,
        error,
        addProduct, 
        updateProduct, 
        deleteProduct,
        refreshProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);