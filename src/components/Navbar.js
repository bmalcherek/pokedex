import React from "react";

import Pokeball from "../assets/pokeball.png";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header__logo--wrapper">
        <img src={Pokeball} alt="logo" className="header__logo" />
        <div className="header__name--wrapper">
          <h1 className="header__name">POKEDEX</h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
