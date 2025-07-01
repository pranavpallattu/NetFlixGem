import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {

  const gpt=useSelector((store)=>store.gpt)

  const {movieNames,movieResults}=gpt
  console.log(movieNames,movieResults);

  if(!movieNames) return null
  

  return (
    <div className='p-4 m-4 text-white bg-black rounded-3xl'>

      {
        movieNames?.map((movie,index)=> <MovieList title={movie} movies={movieResults[index]}/>)
      }

    </div>
  )
}

export default GptMovieSuggestions