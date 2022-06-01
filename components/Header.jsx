import React from 'react';
import Search from './Search';
import HeaderStyle from '../styles/Header.module.scss'
import Link from 'next/link';


const Header = () => {
  return (
   <header className={HeaderStyle.navbar}>
     <Link href={'/'} >
     <div className={HeaderStyle.logo}>MovieFlix</div>
     </Link>
     <Search/>
   </header>
  )
}

export default Header