import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_Options} from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config?.lang);
  console.log(lang);

  const dispatch = useDispatch();

  const searchText = useRef();

  // search movie in tmdb

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_Options
    );
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to OpenAi GPT Apis to get movies results

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead Thanmathra,Bramaram,Drishyam,Thalapathy,Swades";

    // Example: Inside a component or useEffect
    const result = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        import.meta.env.VITE_GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: gptQuery }] }],
        }),
      }
    );
    const json = await result.json();

    const gptMoviesList = json.candidates[0].content.parts[0].text.split(",");
    console.log(gptMoviesList);

    // for each movie i will search tmdb api

    const promiseArray = gptMoviesList.map((movie) => searchMovieTmdb(movie));
    // as time tide and javscript waits for none this exection takes place as fast and doesnt get the time to resolve the promise so it returns an array of promises

    console.log(promiseArray);
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGPTMovieResult({
        movieNames: gptMoviesList,
        movieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="pt-[50%] md:pt-[10%]  m-2 md:m-0 rounded-2xl md:rounded-none flex justify-center items-center md:justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          className="col-span-9 p-4 m-4 bg-white rounded-2xl"
          type="text"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-2xl cursor-pointer"
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
