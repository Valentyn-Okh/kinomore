import HeroSection from '../components/home/HeroSection';
import FeaturedMovies from '../components/home/FeaturedMovies';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedMovies title="Популярні фільми" category="popular" />
      <FeaturedMovies title="Топ рейтингу" category="top_rated" />
      <FeaturedMovies title="Скоро в кіно" category="upcoming" />
      <FeaturedMovies title="Зараз у прокаті" category="now_playing" />
    </div>
  );
};

export default HomePage;