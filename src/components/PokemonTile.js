import React, { useState, useEffect } from "react";
import axios from "axios";

import Progress from "./Progress";

const MAX_SPEED = 180;
const MAX_HP = 255;
const MAX_SP_DEFENSE = 230;
const MAX_DEFENSE = 230;
const MAX_SP_ATTACK = 194;
const MAX_ATTACK = 190;

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

  const img_src = loaded ? pokemon.sprites.front_default : null;
  const name = loaded ? pokemon.name.toUpperCase() : null;

  const base_xp = loaded ? pokemon.base_experience : null;
  const height = loaded ? pokemon.height : null;
  const weight = loaded ? pokemon.weight : null;

  const speed = loaded ? pokemon.stats[0].base_stat : null;
  const spDefense = loaded ? pokemon.stats[1].base_stat : null;
  const spAttack = loaded ? pokemon.stats[2].base_stat : null;
  const defense = loaded ? pokemon.stats[3].base_stat : null;
  const attack = loaded ? pokemon.stats[2].base_stat : null;
  const hp = loaded ? pokemon.stats[2].base_stat : null;

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
        <Progress
          percentage={`${(speed / MAX_SPEED) * 100}%`}
          type="speed"
          text="Speed"
          value={speed}
        />

        <Progress
          percentage={`${(hp / MAX_HP) * 100}%`}
          type="hp"
          text="HP"
          value={hp}
        />

        <Progress
          percentage={`${(spDefense / MAX_SP_DEFENSE) * 100}%`}
          type="special-defense"
          text="Sp. Defense"
          value={spDefense}
        />

        <Progress
          percentage={`${(defense / MAX_DEFENSE) * 100}%`}
          type="defense"
          text="Defense"
          value={defense}
        />

        <Progress
          percentage={`${(spAttack / MAX_SP_ATTACK) * 100}%`}
          type="special-attack"
          text="Sp. Attack"
          value={spAttack}
        />

        <Progress
          percentage={`${(attack / MAX_ATTACK) * 100}%`}
          type="attack"
          text="Attack"
          value={attack}
        />
      </div>
    </div>
  );
};

export default PokemonTile;
