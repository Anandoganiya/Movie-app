import React, { useState } from "react";
import Link from "next/link";
import NavStyle from "../styles/NavStyle.module.scss";
const NavBar = () => {
  const [linkId, setLinkId] = useState(1);
  const linkTypes = [
    {
      id: 1,
      typeName: "Trending",
      path: "/",
    },
    {
      id: 2,
      typeName: "Movies",
      path: "/movies",
    },
    {
      id: 3,
      typeName: "Series",
      path: "/series",
    },
  ];
  return (
    <footer className={NavStyle.footer}>
      <nav className={NavStyle.linkBar}>
        {linkTypes.map((link) => {
          return (
            <div
              key={link.id}
              className={`${NavStyle.linkItem} ${
                linkId === link.id ? NavStyle.active : ""
              }`}
              onClick={() => setLinkId(link.id)}
            >
              <Link href={link.path}>{link.typeName}</Link>
            </div>
          );
        })}
      </nav>
    </footer>
  );
};

export default NavBar;
