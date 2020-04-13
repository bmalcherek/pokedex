import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonTile = (props) => {
  const [pokemon, setPokemon] = useState({ loaded: false });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(props.url).then((res) => {
      setPokemon(res.data);
      setLoaded(true);
    });
  }, [props.url]);

  const imgSrc = loaded ? pokemon.sprites.front_default : null;
  const name = loaded ? pokemon.name.toUpperCase() : null;
  const id = loaded ? pokemon.id : null;

  let types = null;
  if (loaded) {
    types = pokemon.types.map((type) => (
      <span key={type.slot} className={`pokemon-tile__type ${type.type.name}`}>
        {type.type.name}
      </span>
    ));
  }

  return (
    <div className="pokemon-tile--container col-lg-3 col-md-4 col-sm-6">
      <div className="pokemon-tile--wrapper">
        <div className="pokemon-tile__img--wrapper">
          <Link className="pokemon-tile__link" to={`/${id}`}>
            <img className="pokemon-tile__img" src={imgSrc} alt="pokemon-img" />
          </Link>
        </div>
        <div className="pokemon-tile__info--wrapper">
          <div className="pokemon-tile__title--wrapper">
            <Link className="pokemon-tile__link" to={`/${id}`}>
              <h3 className="pokemon-tile__title">{name}</h3>
            </Link>
          </div>
          <div className="pokemon-tile__id--wrapper">
            <h3 className="pokemon-tile__id">#{id}</h3>
          </div>
          <div className="pokemon-tile__type--wrapper">{types}</div>
        </div>
      </div>
    </div>
  );
};

export default PokemonTile;
