import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div className="px-6 py-1 md:py-2">
      <h1 className="font-semibold text-xl md:text-4xl px-2 py-1 text-white">{title}</h1>

      <div className="flex overflow-x-scroll scrollbar-hide scroll-smooth">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
