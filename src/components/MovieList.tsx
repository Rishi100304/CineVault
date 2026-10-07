import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  darkMode: boolean;
}

function MovieList({ movies, darkMode }: MovieListProps) {
  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} darkMode={darkMode} />
        </div>
      ))}
    </>
  );
}

export default MovieList;
