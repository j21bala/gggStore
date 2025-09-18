// src/components/UI/Loading.jsx
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-600/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-purple-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-400 mt-4">Cargando productos...</p>
    </div>
  );
};

export default Loading;