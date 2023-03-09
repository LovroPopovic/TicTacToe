import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./povecalo.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=83b9c5cb";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  const searchMov = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMov("goodfellas");
  }, []);
  return (
    <div className="app">
      <h1>CinemaUniverse</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMov(term)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
