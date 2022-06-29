import React, { cloneElement, useState } from "react";
import Head from "next/head";
import Header from "./Header";
import NavBar from "./NavBar";
import Modal from "./Modal";
const Layout = ({ children }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [content, setContent] = useState({});
  return (
    <div style={{ width: "100%" }}>
      <Head>
        <title>MovieFlix</title>
        <meta name="description" content="movie description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {cloneElement(children, { toggleModal, setToggleModal, setContent })}
      <NavBar />
      {toggleModal ? (
        <Modal
          content={content}
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
        />
      ) : null}
    </div>
  );
};

export default Layout;
