import { useState } from "react";

function AddMovieForm({ setMovieList, darkMode }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (
      formData.year < 1888 ||
      formData.year > new Date().getFullYear()
    ) {
      newErrors.year = "Enter a valid year";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    } else if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = "Rating must be between 0 and 10";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMovieList((prevMovies) => [
        ...prevMovies,
        {
          ...formData,
          id: Date.now(),
          year: Number(formData.year),
          rating: Number(formData.rating),
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
          className={`flex flex-col justify-center p-6 items-center gap-6 my-8 text-xl rounded-lg shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
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
          </div>
          <div className="mx-3">
            <label className="mx-3">Rating: </label>
            <input
              type="text"
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
          </div>
          <button
            className="bg-blue-500 px-4 py-2 rounded-md shadow-md"
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
