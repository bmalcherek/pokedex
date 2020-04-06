import React from "react";

import "./scss/styles.scss";

import PokemonTile from "./components/PokemonTile";

function App() {
  // useEffect(() => {
  //   axios
  //     .get("https://pokeapi.co/api/v2/pokemon/1/")
  //     .then((res) => console.log(res));
  // }, []);

  return (
    <div className="app">
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/292/" />
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/646/" />
      <PokemonTile url="https://pokeapi.co/api/v2/pokemon/333/" />
    </div>
  );
}

export default App;
