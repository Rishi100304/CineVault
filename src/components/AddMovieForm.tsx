import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieFormPropsInterface {
  setMovieList: React.Dispatch<React.SetStateAction<Movie[]>>;
  darkMode: boolean;
}
interface FormData {
  title: string;
  year: string;
  genre: string;
  rating: string;
}
function AddMovieForm({ setMovieList, darkMode }: MovieFormPropsInterface) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    year: "",
    genre: "",
    rating: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (
      Number(formData.year) < 1888 ||
      Number(formData.year) > new Date().getFullYear()
    ) {
      newErrors.year = "Enter a valid year";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    } else if (Number(formData.rating) < 0 || Number(formData.rating) > 10) {
      newErrors.rating = "Rating must be between 0 and 10";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMovieList((prevMovies) => [
        ...prevMovies,
        {
          ...formData,
          id: Date.now(),
          year: formData.year,
          rating: Number(formData.rating),
          poster: null
        },
      ]);
      setFormData({
        title: "",
        year: "",
        genre: "",
        rating: "",
      });

      setErrors({});
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className={`flex flex-col justify-center p-6 items-center gap-6 my-8 text-xl rounded-lg shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-zinc-200 text-gray-800"} `}
        >
          <div className="pt-4">
            <label className="mx-3">Title: </label>
            <input
              type="text"
              value={formData.title}
              className={`w-90 shadow-md border rounded-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="mx-3">Year: </label>
            <input
              type="number"
              value={formData.year}
              className={`w-90 shadow-md border rounded-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  year: e.target.value,
                })
              }
              min={1888}
              max={new Date().getFullYear()}
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year}</p>
            )}
          </div>
          <div className="mx-3">
            <label className="mx-3">Genre: </label>
            <input
              type="text"
              className={`w-90 shadow-md border rounded-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              value={formData.genre}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  genre: e.target.value,
                })
              }
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
            )}
          </div>
          <div className="mx-3">
            <label className="mx-3">Rating: </label>
            <input
              type="number"
              className={`w-90 shadow-md border rounded-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              value={formData.rating}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: e.target.value,
                })
              }
              min={0}
              max={10}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>
          <button
            className="bg-blue-500 text-lg text-white px-4 py-1 rounded-md shadow-md cursor-pointer hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovieForm;
