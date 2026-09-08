import { useContext } from "react";
import { WatchListContext } from "../context/WatchlistContext";

function MovieCard({ movie, darkMode }) {
  const { addToList, removeFromList, isInWatchList } =
    useContext(WatchListContext);
  return (
    <div className="flex justify-center">
      <div
        className={`w-3xl p-4 gap-4 flex flex-col items-center rounded-lg mb-4 shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-slate-100 border border-slate-200 text-gray-700"}`}
      >
        <img
          className="w-80 h-120 object-cover shrink-0 mt-3 border border-zinc-600 rounded-md shadow-md"
          src={
            movie.poster
              ? `https://image.tmdb.org/t/p/w500${movie.poster}`
              : "../placeholder.jpg"
          }
          alt={movie.title}
        />
        <h1 className="text-xl font-bold">{movie.title}</h1>
        <h2 className="font-semibold">{movie.year}</h2>
        <h2>
          <span className="font-semibold">Genre</span> : {movie.genre}
        </h2>
        <h2>
          <span className="font-semibold">Rating</span> : {movie.rating}⭐
        </h2>

        {isInWatchList(movie.id) ? (
          <button
            className="bg-red-600 text-white py-1 px-4 rounded-sm shadow-md"
            onClick={() => removeFromList(movie.id)}
          >
            Remove from WatchList
          </button>
        ) : (
          <button
            className="bg-green-600 text-white py-1 px-4 rounded-sm shadow-md"
            onClick={() => addToList(movie)}
          >
            Add to WatchList
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
