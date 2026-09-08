import "./App.css";
import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";
import { useContext, useEffect, useRef, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import { ThemeContext } from "./context/ThemeContext";
import AddMovieForm from "./components/AddMovieForm";
import Section from "./components/Section";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const url = debouncedSearch
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedSearch}&page=${page}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

  const { data, loading, error } = useFetch(url);
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  const {
    data: genreData,
    // loading: genreLoading,
    // error: genreError,
  } = useFetch(genreUrl);
  const genreMap = Object.fromEntries(
    (genreData?.genres ?? []).map((genre) => [genre.id, genre.name]),
  );
  const apiMovies =
    data?.results?.map((result) => ({
      id: result.id,
      title: result.title,
      year: result.release_date?.slice(0, 4) || "Unknown",
      genre: result.genre_ids.map((id) => genreMap[id] || "Unknown").join(", "),
      rating: result.vote_average,
      poster: result.poster_path,
    })) ?? [];

  const [movieList, setMovieList] = useState(
    JSON.parse(localStorage.getItem("movies")) || [],
  );

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movieList));
  }, [movieList]);

  const displayMovies = debouncedSearch
    ? apiMovies
    : [...apiMovies, ...movieList];

  const { darkMode, ToggleTheme } = useContext(ThemeContext);

  const searchInputRef = useRef(null);


  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <div>
      <div
        className={`app p-8 ${darkMode ? " bg-gray-900 text-white" : "bg-linear-to-br from-blue-50 to-purple-50 text-zinc-700"}`}
      >
        <div className="text-right">
          <button
            onClick={ToggleTheme}
            className={`
        relative w-16 h-8 rounded-full transition-colors duration-300
        ${darkMode ? "bg-blue-600" : "bg-gray-300"}
      `}
          >
            <div
              className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-white
          transition-transform duration-300 flex items-center justify-center
          ${darkMode ? "transform translate-x-8" : ""}
        `}
            >
              {darkMode ? "🌙" : "☀️"}
            </div>
          </button>
        </div>

        {loading && <p>Searching...</p>}
        {error && <p>Something went wrong: {error.message}</p>}

        {!loading && !error && (
          <div>
            <h1 className="text-center text-5xl font-bold mb-10">CineVault</h1>
            <Section title="MovieList" darkMode={darkMode}>
              <div className="flex flex-row justify-center my-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search movies..."
                  type="text"
                  ref={searchInputRef}
                  className="w-2xl py-3 px-10 my-8 mx-10 rounded-md shadow-md bg-zinc-200 placeholder-black"
                />
              </div>
              <div className="flex flex-row justify-center mb-8 font-semibold ">
                <div className="text-lg mx-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-sm shadow-md"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                </div>

                <span className="text-lg mx-4 py-1">
                  Page {page} of total {data?.total_pages}
                </span>
                <div className="text-lg mx-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-sm shadow-md"
                    disabled={data?.total_pages && page >= data.total_pages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
              {displayMovies.length === 0 ? (
                <p className="text-xl font-bold mt-4 pt-4">No movies found.</p>
              ) : (
                <MovieList movies={displayMovies} darkMode={darkMode} />
              )}{" "}
            </Section>
          </div>
        )}
        <Section title="WatchList" darkMode={darkMode}>
          <WatchList darkMode={darkMode} />
        </Section>
        <Section title="Add a Movie" darkMode={darkMode}>
          <AddMovieForm setMovieList={setMovieList} darkMode={darkMode} />
        </Section>
        <div className="flex justify-center">
        <div
            className={`mt-4 inline-block px-6 py-2 rounded-full  ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <span className="font-semibold">
              Built with Bun + Vite + React + Tailwind CSS❤️
            </span>
          </div>
          </div>
      </div>
    </div>
  );
}

export default App;
