import React from 'react';
import Search from './Search';
import HeaderStyle from '../styles/Header.module.scss'


const Header = () => {
  return (
   <header className={HeaderStyle.navbar}>
     <div className={HeaderStyle.logo}>MovieFlix</div>
     <Search/>
   </header>
  )
}

export default Header