import React from "react";

import PokemonTile from "./components/PokemonTile";
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
      {/* <div className="app">
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/1/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/22/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/35/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/41/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/49/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/5/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/51/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/63/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/69/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/420/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/9/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/666/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/29/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/42/" />
        <PokemonTile url="https://pokeapi.co/api/v2/pokemon/88/" />
      </div> */}

      <Pokedex />
    </div>
  );
}

export default App;
