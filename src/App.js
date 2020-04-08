import React from "react";

import Pokedex from "./components/Pokedex";

import Pokeball from "./assets/pokeball.png";

import "./scss/styles.scss";

function App() {
  return (
    <div>
      <header className="header">
        <div className="header__logo--wrapper">
          <img src={Pokeball} alt="logo" className="header__logo" />
          <div className="header__name--wrapper">
            <h1 className="header__name">POKEDEX</h1>
          </div>
        </div>
      </header>
      <Pokedex />
    </div>
  );
}

export default App;
