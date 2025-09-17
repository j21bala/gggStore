import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 w-64 min-h-screen p-6 shadow-xl">
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="flex items-center text-white hover:text-purple-400 transition duration-300">
              <span className="mr-2">🏠</span> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/products" className="flex items-center text-white hover:text-purple-400 transition duration-300">
              <span className="mr-2">👕</span> Ver Productos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;