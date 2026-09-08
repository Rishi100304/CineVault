import MovieCard from "./MovieCard";

function MovieList({ movies, darkMode }) {
  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            movie={movie}
            darkMode={darkMode}
          />
        </div>
      ))}
    </>
  );
}

export default MovieList;
