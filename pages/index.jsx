import {useState,useEffect} from 'react';
import { SingleMovie } from '../components';
import TrendingStyle from '../styles/TrendingStyle.module.scss'
import pagination from '../styles/pagination.module.scss'
import ReactPaginate from 'react-paginate';

export default function Home({toggleModal,setToggleModal,setContent}) {
  // console.log(toggleModal);
  const [trending,setTrending] = useState(null);
  const [pageNumber,setPageNumber] = useState(1);
  
  useEffect(()=>{
    const fetchTrending = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=5337a3932c7f5952d92e1ea0248df79e&page=${pageNumber}`);
      const {results} = await res.json()
      setTrending(results);
    }
    fetchTrending();
  },[pageNumber])

  const pageChange = ({selected}) => {
    setPageNumber(selected)
    window.scroll(0,0)
  }

  return (
    <main className={TrendingStyle.movieLayout}>
      <div className={TrendingStyle.title}>Trending</div>
      {
        trending && trending.map(movie=>{
          return <SingleMovie key={movie.id}
           title={movie.title}
           id={movie.id}
           backdrop_path={movie.backdrop_path}
           media_type={movie.media_type}
           poster_path={movie.poster_path}
           release_date={movie.release_date}
           vote_average={movie.vote_average}
           setToggleModal={setToggleModal}
           toggleModal={toggleModal}
           setContent={setContent}
           />;
        })
      }
     <ReactPaginate
        className={pagination.paginate}
        previousLabel={"< previous"}
        nextLabel={"next >"}
        pageCount={10}
        onPageChange={pageChange}
      />
    </main>
  )
}
