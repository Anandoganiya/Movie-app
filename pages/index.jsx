import { useState, useEffect } from "react";
import { SingleMovie } from "../components";
import TrendingStyle from "../styles/TrendingStyle.module.scss";
import pagination from "../styles/pagination.module.scss";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home({ toggleModal, setToggleModal, setContent }) {
  const [trending, setTrending] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=5337a3932c7f5952d92e1ea0248df79e&page=${pageNumber}`
      );
      const { results } = await res.json();
      setTrending(results);
    };
    fetchTrending();
  }, [pageNumber]);

  const pageChange = ({ selected }) => {
    setPageNumber(selected);
    window.scroll(0, 0);
  };

  return (
    <main className={TrendingStyle.movieLayout}>
      <div className={TrendingStyle.title}>Trending</div>
      {!trending.length ? (
        <div style={{ display: "flex", justifyContent: "space-center" }}>
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
            pageCount={10}
            onPageChange={pageChange}
          />
        </div>
      ) : null}
    </main>
  );
}
