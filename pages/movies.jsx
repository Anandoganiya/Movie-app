import React, { useEffect, useState } from "react";
import TrendingStyle from "../styles/TrendingStyle.module.scss";
import pagination from "../styles/pagination.module.scss";
import { SingleMovie, Genre } from "../components";
import ReactPaginate from "react-paginate";
import useGenre from "../hooks/useGenre";
import ClipLoader from "react-spinners/ClipLoader";
const Movies = ({ toggleModal, setToggleModal, setContent }) => {
  const [trending, setTrending] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const genreURL = useGenre(selectedGenre);
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=5337a3932c7f5952d92e1ea0248df79e&page=${pageNumber}&with_genres=${genreURL}`
      );
      const { results, total_pages } = await res.json();
      setTotalPages(total_pages);
      setTrending(results);
    };
    fetchTrending();
  }, [pageNumber, selectedGenre]);

  const pageChange = ({ selected }) => {
    setPageNumber(selected);
    window.scroll(0, 0);
  };

  return (
    <main className={TrendingStyle.movieLayout}>
      <div className={TrendingStyle.title}>Movies</div>
      <Genre
        mediaType={"movie"}
        setGenre={setGenre}
        genre={genre}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
        setPageNumber={setPageNumber}
      />
      {!trending.length ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <ClipLoader></ClipLoader>
        </div>
      ) : (
        trending.map((movie) => {
          return (
            <SingleMovie
              key={movie.id}
              title={
                movie.media_type === "movie" ? movie.title : movie.original_name
              }
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              media_type={movie.media_type}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              setToggleModal={setToggleModal}
              toggleModal={toggleModal}
              setContent={setContent}
            />
          );
        })
      )}
      {trending.length ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <ReactPaginate
            className={pagination.paginate}
            previousLabel={"< previous"}
            nextLabel={"next >"}
            pageCount={totalPages}
            onPageChange={pageChange}
          />
        </div>
      ) : null}
    </main>
  );
};

export default Movies;
