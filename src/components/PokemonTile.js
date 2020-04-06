import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonTile = (props) => {
  const [pokemon, setPokemon] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(props.url).then((res) => {
      setPokemon(res.data);
      setLoaded(true);
      console.log(res.data);
    });
  }, [props.url]);

  const name = loaded ? pokemon.name.toUpperCase() : null;
  const base_xp = loaded ? pokemon.base_experience : null;
  const height = loaded ? pokemon.height : null;
  const weight = loaded ? pokemon.weight : null;
  const img_src = loaded ? pokemon.sprites.front_default : null;

  let types = null;
  if (loaded) {
    types = pokemon.types.map((type) => (
      <span key={type.slot} className={`pokemon__type ${type.type.name}`}>
        {type.type.name}
      </span>
    ));
  }

  return (
    <div className="pokemon--container">
      <div className="pokemon__header">
        <div className="pokemon__image--wraper">
          <img className="pokemon__image" src={img_src} alt="test" />
        </div>
        <div className="pokemon__name--wrapper">
          <h1 className="pokemon__name">{name}</h1>
        </div>
      </div>

      <div className="pokemon__types--wrapper">
        <h3 className="pokemon__types--text">Types</h3>
        <div className="pokemon__types">{types}</div>
      </div>

      <div className="pokemon__stats--wrapper">
        <h3 className="pokemon__stats--text">Stats</h3>
        <ul className="pokemon__stats">
          <li className="pokemon__stats__base-xp">Base XP: {base_xp}</li>
          <li className="pokemon__stats__height">Height: {height}</li>
          <li className="pokemon__stats__weight">Weight: {weight}</li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonTile;
