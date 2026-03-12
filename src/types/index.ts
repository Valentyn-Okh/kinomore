export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
  original_title: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  similar?: {
    results: Movie[];
  };
  recommendations?: {
    results: Movie[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  gender: number;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
}

export interface MovieFilters {
  with_genres?: string;
  primary_release_year?: string;
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
  sort_by?: string;
  with_original_language?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  with_runtime_gte?: string;
  with_runtime_lte?: string;
}

export interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
}

export interface FavoriteState {
  favoriteIds: number[];
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  favorites: number[];
}

export interface FavoriteState {
  favoriteIds: number[];
}