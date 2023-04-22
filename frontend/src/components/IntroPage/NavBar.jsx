import React from "react";
import "../../styles/IntroPage/navbar.scss";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="nav__links">
        <li className="nav__item">
          <a className="nav__link" href="#headq">
            自我介紹
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#section--1">
            學經歷
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#section--2">
            修課經驗
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link nav__link--btn btn--show-modal" href="#">
            Contact Me
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
