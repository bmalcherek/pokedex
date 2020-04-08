import React from "react";
import { Link } from "react-router-dom";

import Pokeball from "../assets/pokeball.png";

const Navbar = () => {
  return (
    <header className="header">
      <Link to="">
        <div className="header__logo--wrapper">
          <img src={Pokeball} alt="logo" className="header__logo" />
          <div className="header__name--wrapper">
            <h1 className="header__name">POKEDEX</h1>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
