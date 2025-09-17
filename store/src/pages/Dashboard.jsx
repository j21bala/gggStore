// src/pages/Dashboard.jsx
import { useState } from 'react';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import { useProducts } from '../context/ProductsContext';
import Modal from '../components/UI/Modal';

const Dashboard = () => {
  const { addProduct, updateProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
    } else {
      addProduct(productData);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-white via-purple-300 to-purple-500 bg-clip-text text-transparent">
              Gestión de Productos
            </span>
          </h2>
          <button
            onClick={() => handleOpenModal()}
            className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Agregar Nuevo Producto</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </button>
        </div>
        <ProductList onEdit={handleOpenModal} />
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;