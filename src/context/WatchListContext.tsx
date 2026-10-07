import { createContext, useEffect, useReducer, type PropsWithChildren } from "react";
import {type Movie } from "../types/movie.ts";

interface StateType {
    items: Movie[];
}
type WatchListAction = | { type: "ADD_MOVIE"; payload: Movie } | { type: "REMOVE_MOVIE"; payload: number } | { type: "CLEAR_WATCHLIST" }
interface WatchListContextTypes {
    state: {items: Movie[]};
    addToList: (movie: Movie) => void;
    removeFromList: (id: number) => void;
    clearWatchList: () => void;
    isInWatchList: (id: number) => boolean;
}

function reducer(state: StateType, action: WatchListAction): StateType {
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
const WatchListContext = createContext<WatchListContextTypes | undefined>(undefined);

const initialState: StateType = {
  items: JSON.parse(localStorage.getItem("watchlist") || "[]"),
};

export function WatchListProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToList = (movie: Movie) => {
    dispatch({
      type: "ADD_MOVIE",
      payload: movie,
    });
  };
  const removeFromList = (id: number) => {
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

  const isInWatchList = (id: number) => {
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
