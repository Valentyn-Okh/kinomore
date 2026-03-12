import { Link } from 'react-router-dom';
import { FaFilm, FaGithub, FaTwitter, FaTelegram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-200/80 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FaFilm className="text-primary-500 text-2xl" />
              <span className="text-xl font-bold gradient-text">Kinomore</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ваш особистий гід у світі кіно. Тисячі фільмів та серіалів 
              чекають на вас. Шукайте, відкривайте нове та зберігайте улюблене.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Фільми
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Обране
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Соціальні мережі</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <FaTelegram size={20} />
              </a>
              <a
                href="mailto:info@kinomore.com"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Kinomore. Всі права захищено.</p>
          <p className="text-sm mt-2">
            Дані надані The Movie Database (TMDB)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;