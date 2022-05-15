import React from 'react'
import { Image } from 'next/image'
import { img_300 } from '../config/config'
import Movie from '../styles/Movie.module.scss'
const SingleMovie = ({
    title,
    poster_path,
    backdrop_path,
    media_type,
    release_date,
    vote_average    
}) => {
  return (
    <div className={Movie.movieContent}>
        {/* <Image src={`${img_300}/${poster_path}`} width={50} height={200}></Image> */}
        <img src={`${img_300}/${poster_path}`} width={200} height={300}></img>
        <div className={Movie.movieDetail}>
            <div>{title}</div>
            <div>{media_type}</div>
            <div>{release_date}</div>
            <div className={vote_average > 6 ? Movie.primary:Movie.secondary}>{vote_average}</div>
        </div>
    </div>
  )
}

export default SingleMovie