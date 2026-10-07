import { useContext } from "react";
import { WatchListContext } from "../context/WatchListContext";

interface WatchListProps {
  darkMode: boolean;
}

function WatchList({ darkMode }: WatchListProps) {
  const watchlistContext = useContext(WatchListContext);

  if (!watchlistContext) {
    return null; // Or throw new Error("MovieCard must be used within WatchListProvider");
  }
  const { state, removeFromList, clearWatchList } = watchlistContext;
  return (
    <>
      {state.items.length === 0 ? (
        <p className="text-xl font-bold mt-4 pt-4">Your Watch List is empty.</p>
      ) : (
        state.items.map((item) => (
          <div key={item.id} className="flex justify-center mt-4 pt-4">
            <div
              className={` w-3xl p-4 gap-4 flex flex-col items-center rounded-lg mb-4 shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-slate-100 border border-slate-200 text-gray-700"}`}
            >
              <img
                className="w-80 h-120 object-cover shrink-0 mt-3 border border-zinc-600 rounded-md shadow-md mb-4"
                src={
                  item.poster
                    ? `https://image.tmdb.org/t/p/w500${item.poster}`
                    : "../placeholder.jpg"
                }
                alt={item.title}
              />
              <h1 className="text-xl font-bold">{item.title}</h1>
              <h2 className="font-semibold">{item.year}</h2>
              <h2>
                <span className="font-semibold">Genre:</span> {item.genre}
              </h2>
              <h2>
                <span className="font-semibold">Rating:</span> {item.rating}⭐
              </h2>
              <button
                className="bg-red-600 text-white py-1 px-4 rounded-sm shadow-md cursor-pointer hover:bg-red-700"
                onClick={() => removeFromList(item.id)}
              >
                Remove From Watch List
              </button>
            </div>
          </div>
        ))
      )}
      {state.items.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            className="text-center bg-amber-600 text-white py-1 px-4 rounded-sm shadow-md cursor-pointer hover:bg-amber-700"
            onClick={clearWatchList}
          >
            Clear Watch List
          </button>
        </div>
      )}
    </>
  );
}

export default WatchList;
