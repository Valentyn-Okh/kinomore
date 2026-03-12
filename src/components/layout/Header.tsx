import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHeart, FaFilm, FaBars, FaTimes,FaHome, } from 'react-icons/fa';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Головна', icon: <FaHome /> },
    { path: '/movies', label: 'Фільми', icon: <FaFilm /> },
    { path: '/favorites', label: 'Обране', icon: <FaHeart /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-200/90 backdrop-blur-lg shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaFilm className="text-primary-500 text-3xl" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text">Kinomore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link flex items-center gap-2 ${
                  location.pathname === link.path ? 'active' : ''
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук фільмів..."
                className="bg-dark-300/50 border border-white/10 rounded-l-lg px-4 py-2 w-64 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-dark-300/90 backdrop-blur-lg rounded-lg p-4 space-y-4">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук фільмів..."
                    className="flex-1 bg-dark-400/50 border border-white/10 rounded-l-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                  />
                  <button
                    type="submit"
                    className="bg-primary-500 px-4 rounded-r-lg hover:bg-primary-600 transition-colors"
                  >
                    <FaSearch />
                  </button>
                </form>
                
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === link.path
                          ? 'bg-primary-500 text-white'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;