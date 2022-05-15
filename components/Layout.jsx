import React from 'react'
import Head from 'next/head'
import Header from './Header'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <div>
        <Head>
        <title>MovieFlix</title>
        <meta name="description" content="movie description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
        {children}
      <NavBar/>
    </div>
  )
}

export default Layout