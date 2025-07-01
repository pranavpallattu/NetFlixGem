import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className=" bg-black">
     <div className="mt-0 md:-mt-40 relative p-6 z-10">
       <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Popular Movies"} movies={movies?.popularMovies} />
      <MovieList title={"Action Movies"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Romantic Hits"} movies={movies?.nowPlayingMovies} />
     </div>
    </div>
  );
};

export default SecondaryContainer;

{
  /* MovieList-popular
          MovieCards*n
      MovieList-nowplaying
      MovieList-romance
      MovieList-sports */
}
