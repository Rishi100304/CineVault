import { createContext, useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_WATCHLIST":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}
const WatchListContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("watchlist")) || [],
};

export function WatchListProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToList = (movie) => {
    dispatch({
      type: "ADD_MOVIE",
      payload: movie,
    });
  };
  const removeFromList = (id) => {
    dispatch({
      type: "REMOVE_MOVIE",
      payload: id,
    });
  };
  const clearWatchList = () => {
    dispatch({
      type: "CLEAR_WATCHLIST",
    });
  };

  const isInWatchList = (id) => {
    return state.items.some((item) => item.id === id);
  };

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WatchListContext.Provider
      value={{
        state,
        addToList,
        removeFromList,
        clearWatchList,
        isInWatchList,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { WatchListContext };
