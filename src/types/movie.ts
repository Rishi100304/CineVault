// 1. Raw shape returned by TMDB API for a single movie
export interface TMDBMovie {
  id: number;
  title: string;
  release_date?: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string | null;
}

// 2. Response shape returned by TMDB search / popular endpoints
export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

// 3. Single genre object
export interface Genre {
  id: number;
  name: string;
}

// 4. Response shape returned by TMDB genre endpoint
export interface GenreResponse {
  genres: Genre[];
}

// 5. Clean, formatted movie object used throughout our UI
export interface Movie {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: number;
  poster: string | null;
}