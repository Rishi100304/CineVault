import { describe, it, expect } from "bun:test";

// Mock localStorage globally before importing the module
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
};

// Import after the mock is set up
import { reducer } from "./WatchListContext";
import type { Movie } from "../types/movie";

describe("WatchList Reducer", () => {
  const mockMovie: Movie = {
    id: 42,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
    rating: 8.7,
    poster: "/path.jpg",
  };

  it("should handle ADD_MOVIE correctly", () => {
    const initialState = { items: [] };
    
    const nextState = reducer(initialState, {
      type: "ADD_MOVIE",
      payload: mockMovie,
    });

    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0]).toEqual(mockMovie);
  });

  it("should handle REMOVE_MOVIE correctly", () => {
    const initialState = { items: [mockMovie] };

    const nextState = reducer(initialState, {
      type: "REMOVE_MOVIE",
      payload: 42,
    });

    expect(nextState.items.length).toBe(0);
  });

  it("should handle CLEAR_WATCHLIST correctly", () => {
    const initialState = { items: [mockMovie] };

    const nextState = reducer(initialState, {
      type: "CLEAR_WATCHLIST",
    });

    expect(nextState.items.length).toBe(0);
  });
});