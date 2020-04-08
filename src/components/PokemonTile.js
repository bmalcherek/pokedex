import React, { useState, useEffect } from "react";
import axios from "axios";

import PokemonStats from "./PokemonStats";

const PokemonTile = (props) => {
  const [pokemon, setPokemon] = useState({ loaded: false });
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get(props.url).then((res) => {
      setPokemon(res.data);
      setLoaded(true);
      console.log(res.data);
    });
  }, [props.url]);

  useEffect(() => {
    if (loaded) {
      setStats({
        loaded,
        baseXp: pokemon.base_experience,
        height: pokemon.height,
        weight: pokemon.weight,
        advStats: pokemon.stats,
      });
    }
  }, [pokemon, loaded]);

  const img_src = loaded ? pokemon.sprites.front_default : null;
  const name = loaded ? pokemon.name.toUpperCase() : null;

  let types = null;
  if (loaded) {
    types = pokemon.types.map((type) => (
      <span key={type.slot} className={`pokemon__type ${type.type.name}`}>
        {type.type.name}
      </span>
    ));
  }

  return (
    <div className="pokemon--container col-lg-3 col-md-6 col-sm-12">
      <div className="pokemon--wrapper">
        <div className="pokemon__header">
          <div className="pokemon__image--wrapper">
            <img className="pokemon__image" src={img_src} alt="pokemon-front" />
          </div>
          <div className="pokemon__name--wrapper">
            <h2 className="pokemon__name">{name}</h2>
          </div>
        </div>

        <div className="pokemon__types--wrapper">
          <div className="pokemon__types--text--wrapper">
            <h3 className="pokemon__types--text">Types</h3>
          </div>
          <div className="pokemon__types">{types}</div>
        </div>

        <PokemonStats stats={stats} />
      </div>
    </div>
  );
};

export default PokemonTile;
