import React from "react";

import Pokedex from "./components/Pokedex";
import Navbar from "./components/Navbar";

import "./scss/styles.scss";

function App() {
  return (
    <div>
      <Navbar />
      <Pokedex />
    </div>
  );
}

export default App;
