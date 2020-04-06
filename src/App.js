import React from "react";

import "./scss/styles.scss";

import PokemonTile from "./components/PokemonTile";

function App() {
  return (
    <div className="app">
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/1/" />
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/22/" />
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/35/" />
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/41/" />
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/49/" />
    </div>
  );
}

export default App;
