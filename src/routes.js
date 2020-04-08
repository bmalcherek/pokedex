import React from "react";
import { Switch, Route } from "react-router-dom";

import Pokedex from "./components/Pokedex";

const Router = () => {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={Pokedex} />
      </Switch>
    </div>
  );
};

export default Router;
