import React from "react";
import { Switch, Route } from "react-router-dom";

import Pokedex from "./components/Pokedex";
import PokemonDetail from "./components/PokemonDetail";

const Router = () => {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={Pokedex} />
        <Route exact path="/:pokemonId" component={PokemonDetail} />
      </Switch>
    </div>
  );
};

export default Router;
