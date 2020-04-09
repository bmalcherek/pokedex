import React from "react";

import Progress from "./Progress";

import Height from "../assets/height.svg";
import Weight from "../assets/weight-solid.svg";

const MAX_SPEED = 180;
const MAX_HP = 255;
const MAX_SP_DEFENSE = 230;
const MAX_DEFENSE = 230;
const MAX_SP_ATTACK = 194;
const MAX_ATTACK = 190;

const PokemonStats = (props) => {
  const baseXp = props.stats.loaded ? props.stats.baseXp : null;
  const height = props.stats.loaded ? props.stats.height : null;
  const weight = props.stats.loaded ? props.stats.weight : null;

  const speed = props.stats.loaded ? props.stats.advStats[0].base_stat : null;
  const spDefense = props.stats.loaded
    ? props.stats.advStats[1].base_stat
    : null;
  const spAttack = props.stats.loaded
    ? props.stats.advStats[2].base_stat
    : null;
  const defense = props.stats.loaded ? props.stats.advStats[3].base_stat : null;
  const attack = props.stats.loaded ? props.stats.advStats[2].base_stat : null;
  const hp = props.stats.loaded ? props.stats.advStats[2].base_stat : null;

  return (
    <div className="pokemon__stats--wrapper">
      <div className="pokemon__stats__text--wrapper">
        <h3 className="pokemon__stats__text">STATS</h3>
      </div>
      <div className="pokemon__stats__base-stats">
        <span>{baseXp} XP </span>
        <div className="pokemon__stats__base-stats__item">
          <img
            src={Height}
            alt="height"
            className="pokemon__stats__base-stats__icon"
          />
          {height}
        </div>
        <div className="pokemon__stats__base-stats__item">
          <img
            src={Weight}
            alt="weight"
            className="pokemon__stats__base-stats__icon weight"
          />
          {weight}
        </div>
      </div>

      <div className="pokemon__stats__advanced-stats">
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

export default PokemonStats;
