import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PokemonStats from "./PokemonStats";
import Types from "./Types";

const PokemonTile = (props) => {
  const [pokemon, setPokemon] = useState({ loaded: false });
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get(props.url).then((res) => {
      setPokemon(res.data);
      setLoaded(true);
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
  const id = loaded ? pokemon.id : null;

  return (
    <div className="pokemon--container col-lg-3 col-md-6 col-sm-12">
      <div className="pokemon--wrapper">
        <div className="pokemon__header">
          <Link to={`/${id}`}>
            <div className="pokemon__image--wrapper">
              <img
                className="pokemon__image"
                src={img_src}
                alt="pokemon-front"
              />
            </div>
          </Link>
          <div className="pokemon__name--wrapper">
            <Link to={`/${id}`}>
              <h2 className="pokemon__name">{name}</h2>
            </Link>
          </div>
        </div>

        <Types loaded={loaded} types={pokemon.types} />

        <PokemonStats stats={stats} />
      </div>
    </div>
  );
};

export default PokemonTile;
