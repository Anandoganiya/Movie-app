import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import searchStyle from "../styles/searchStyle.module.scss";
import TrendingStyle from "../styles/TrendingStyle.module.scss";
import pagination from "../styles/pagination.module.scss";
import { SingleMovie } from "../components";
import ReactPaginate from "react-paginate";

const Search = ({ setToggleModal, toggleModal, setContent }) => {
  const { query } = useRouter();
  const [type, setType] = useState(0);
  const [trending, setTrending] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=5337a3932c7f5952d92e1ea0248df79e&page=${pageNumber}&query=${
          query.search
        }`
      );
      const { results, total_pages } = await res.json();
      setTotalPages(total_pages);
      setTrending(results);
    };
    fetchData();
  }, [pageNumber, type, query.search]);

  const pageChange = ({ selected }) => {
    setPageNumber(selected);
    window.scroll(0, 0);
  };
  const handleType = (selectedType) => {
    setType(selectedType);
  };
  return (
    <main>
      <div className={searchStyle.types}>
        <div
          onClick={() => {
            handleType(0);
          }}
          className={`${searchStyle.type} ${type ? null : searchStyle.primary}`}
        >
          Movies
        </div>
        <div
          onClick={() => {
            handleType(1);
          }}
          className={`${searchStyle.type} ${type ? searchStyle.primary : null}`}
        >
          TV series
        </div>
      </div>
      <main className={TrendingStyle.movieLayout}>
        <div className={TrendingStyle.title}>
          {!type ? "Movies" : "TV series"}
        </div>

        {trending &&
          trending.map((movie) => {
            return (
              <SingleMovie
                key={movie.id}
                title={movie.title}
                backdrop_path={movie.backdrop_path}
                media_type={type ? "tv" : "movie"}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                setToggleModal={setToggleModal}
                toggleModal={toggleModal}
                setContent={setContent}
                id={movie.id}
              />
            );
          })}
        {totalPages > 1 ? (
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
    </main>
  );
};

export default Search;
