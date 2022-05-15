import React,{useState,useEffect} from 'react'
import GenreStyle from '../styles/GenreStyle.module.scss'
const Genre = ({mediaType,setGenre,setSelectedGenre,selectedGenre,genre,setPageNumber}) => {
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=5337a3932c7f5952d92e1ea0248df79e`)
      const {genres} = await res.json()
      setGenre(genres)
    }
    fetchData()
  },[])
  const handleAdd = (selectGenre) =>{
    setSelectedGenre([...selectedGenre,selectGenre])
    setGenre(
      genre.filter(g=>{
        if(g.id !== selectGenre.id)
          return g;
      })
    )
    setPageNumber(1)
  }
  const handleRemove = (selectGenre) =>{
    setGenre([...genre,selectGenre])
    setSelectedGenre(
      selectedGenre.filter(g=>{
        if(g.id !== selectGenre.id)
          return g;
      })
    )
  }
  return (
    <div className={GenreStyle.container}>
      {
        selectedGenre && selectedGenre.map(selected=>{
          return <div onClick={()=>{handleRemove(selected)}} key={selected.id} className={`${GenreStyle.chip} ${GenreStyle.primary}`}>{selected.name}</div>
        })
      }
      {
          genre && genre.map(genre=>{
          return <div onClick={()=>{handleAdd(genre)}} key={genre.id} className={GenreStyle.chip}>{genre.name}</div>;
        })
      }
    </div>
  )
}

export default Genre