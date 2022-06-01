import React from 'react'
import SearchStyle from '../styles/SearchStyles.module.scss';
import {IoMdSearch} from 'react-icons/io'

const Search = () => {
  return (
    <div className={SearchStyle.searchContainer}>
      <form action='/search' className={SearchStyle.searchForm} method='GET'>
        <input className={SearchStyle.searchBar} autoComplete='off'
         type="text"
         placeholder='Search'
         name='search'
         id='search'
         />
        <button
         className={SearchStyle.searchIcon}>
          <IoMdSearch  />
        </button>
    </form>
    </div>
  )
}

export default Search