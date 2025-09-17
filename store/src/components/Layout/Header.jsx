import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-md' 
        : 'bg-black/40 backdrop-blur-sm'
    }`}>
      <nav className="flex items-center justify-between py-4 max-w-7xl mx-auto">
        {/* Logo a la izquierda */}
        <div className="flex-shrink-0">
          <Link to="/" className="group relative">
            <span className="text-2xl font-black tracking-wider text-gray-400/70 hover:text-purple-400 transition-all duration-300" 
                  style={{fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em'}}>
              N*GGG*RVERSE
            </span>
          </Link>
        </div>
        
        {/* Enlaces de navegación en el centro */}
        <div className="flex-1 flex justify-center mx-8">
          <ul className="flex space-x-12 items-center">
            <li>
              <Link to="/products" className="text-gray-400/80 hover:text-gray-300 transition-all duration-300 font-light text-base tracking-wide"
                    style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                Tienda
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" className="text-gray-400/80 hover:text-gray-300 transition-all duration-300 font-light text-base tracking-wide"
                      style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Botones de sesión a la derecha */}
        <div className="flex-shrink-0">
          <div className="flex space-x-4 items-center">
            {user ? (
              <button
                onClick={signOut}
                className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white font-light rounded transition-all duration-300 text-sm tracking-wide backdrop-blur-sm"
                style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/signin" className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white font-light rounded transition-all duration-300 text-sm tracking-wide backdrop-blur-sm"
                      style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  Iniciar sesión
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-purple-600/60 hover:bg-purple-600/80 text-white hover:text-purple-100 font-light rounded transition-all duration-300 text-sm tracking-wide backdrop-blur-sm"
                      style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  Regístrate
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;