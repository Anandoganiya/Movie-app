import React from 'react'
import Link from 'next/link';
import NavStyle from '../styles/NavStyle.module.scss';
const NavBar = () => {
  return (
    <footer className={NavStyle.footer}>
        <nav className={NavStyle.linkBar}>
            <div>
                <Link href='/'>Trending</Link>
            </div>
            <div>
                <Link href='/movies'>Movies</Link>
            </div>
            <div>
                <Link href='/series'>Series</Link>
            </div>
        </nav>
    </footer>
  )
}

export default NavBar