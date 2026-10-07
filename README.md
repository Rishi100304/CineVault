# CineVault 🎬

CineVault is a movie discovery and watchlist application built with React and the TMDB API.

Users can search for movies, browse popular movies, add movies to a personal watchlist, create their own movies, and switch between light and dark themes.

## 🚀 Features

- 🔎 Search movies using the TMDB API
- 🎬 Browse popular movies
- 📄 Paginated movie results
- ⏱️ Debounced movie search
- ⭐ Movie ratings and genres
- 📋 Add and remove movies from a watchlist
- 💾 Persist watchlist and custom movies using LocalStorage
- ➕ Add custom movies with form validation
- 🌙 Light and dark mode
- ⚠️ Loading, error, and empty states
- 📱 Responsive UI built with Tailwind CSS

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- TMDB API
- Context API
- useReducer
- Custom React Hooks
- LocalStorage

## 🧠 React Concepts Used

This project was built to practice and apply core React concepts, including:

- `useState`
- `useEffect`
- `useContext`
- `useReducer`
- `useRef`
- Custom Hooks
- Context API
- Controlled Forms
- Conditional Rendering
- Props and Component Composition
- API Data Fetching
- Debouncing
- State Management
- LocalStorage Persistence

## 🔑 TMDB API Setup

CineVault uses the TMDB API to retrieve movie data.

### 1. Get a TMDB API key

Create an account on TMDB and obtain an API key.

### 2. Create an environment file

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_api_key_here

3. Install dependencies
npm install or bun install
4. Start the development server
npm run dev or bun run dev

The application will be available at the local development URL provided by Vite.

📂 Project Structure
src/
├── components/
│   ├── AddMovieForm.jsx
│   ├── MovieCard.jsx
│   ├── MovieList.jsx
│   ├── Section.jsx
│   └── WatchList.jsx
│
├── context/
│   ├── ThemeContext.jsx
│   └── WatchlistContext.jsx
│
├── hooks/
│   ├── useDebounce.js
│   └── useFetch.js
│
│
├── App.jsx
├── main.jsx
└── index.css
```

## 🎯 Purpose

CineVault was built as a hands-on React project to consolidate concepts such as state management, Context API, reducers, custom hooks, API integration, forms, and persistent client-side data.

## 📌 Future Improvements

Possible improvements include:

Movie detail pages
React Router navigation
User authentication
Backend/database persistence
Personalized watchlists
TypeScript
Automated testing

## 📄 License

This project is for educational and portfolio purposes.