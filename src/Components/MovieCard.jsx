import React from 'react'
import { Img_CDN } from '../utils/constants'

const MovieCard = ({poster_path}) => {
  return (
    <div className='w-35 md:w-50 h-60 md:h-80 p-2'>
        <img className='w-full rounded-md' src={Img_CDN+poster_path} alt="movieimg" />
    </div>
  )
}

export default MovieCard