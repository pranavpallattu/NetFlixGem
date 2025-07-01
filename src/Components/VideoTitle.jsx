import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";



const VideoTitle = ({ title, overview }) => {
  return (
    <>
      <div className="w-full aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-xl md:text-5xl font-bold w-1/3">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/3 text-justify">{overview}</p>
        <div>
            <button className="bg-white p-1 md:p-4 px-6 text-lg md:text-xl font-bold text-black bg-opacity-30 rounded-lg hover:opacity-75 cursor-pointer"><FontAwesomeIcon icon={faPlay} /> Play</button>
            <button className="bg-gray-600 p-1 md:p-4 px-6 text-lg md:text-xl font-bold text-white bg-opacity-50 rounded-lg mx-4 hover:opacity-75 cursor-pointer">More Info</button>
        </div>
      </div>
    </>  
  );
};

export default VideoTitle;
