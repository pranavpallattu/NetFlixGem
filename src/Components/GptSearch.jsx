import React from "react";
import GptSearchBar from "./GptSearchBar";
import { Background_IMG } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
  return (
    <div>
          <div className="fixed -z-10">
              <img
              className="h-screen md:h-full object-cover"
                src={Background_IMG}
                alt=""
              />
            </div>
        <GptSearchBar />
      <GptMovieSuggestions />
      </div>
  );
};

export default GptSearch;
