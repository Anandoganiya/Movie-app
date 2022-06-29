import React from "react";
import { img_300 } from "../config/config";
import Movie from "../styles/Movie.module.scss";
const SingleMovie = ({
  title,
  poster_path,
  media_type,
  vote_average,
  setToggleModal,
  toggleModal,
  setContent,
  id,
}) => {
  const handleContent = (media_type, id) => {
    setContent({ media_type, id });
    setToggleModal(!toggleModal);
  };
  return (
    <div
      className={Movie.movieContent}
      onClick={() => {
        handleContent(media_type, id);
      }}
    >
      <img src={`${img_300}/${poster_path}`} width={200} height={300}></img>
      <div className={Movie.movieDetail}>
        <div>{title}</div>
        <div className={vote_average > 6 ? Movie.primary : Movie.secondary}>
          {vote_average}
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
