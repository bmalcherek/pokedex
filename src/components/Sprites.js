import React from "react";

import NoSprite from "../assets/question-solid.svg";

const Sprites = (props) => {
  const SPRITES_ORDER = [
    "front_default",
    "back_default",
    "front_shiny",
    "back_shiny",
    "front_female",
    "back_female",
    "front_shiny_female",
    "back_shiny_female",
  ];

  const SPRITES_NAMES = ["DEFAULT", "SHINY", "DEFAULT FEMALE", "SHINY FEMALE"];

  let sprites = [];
  let pair = [];
  if (props.loadedSpecies) {
    const multipleGenders = props.species.has_gender_differences;
    const countTo = multipleGenders ? 8 : 4;
    for (let i = 0; i < countTo; i++) {
      pair.push(
        <div key={SPRITES_ORDER[i]} className="pokemon__sprites__item">
          {props.pokemon.sprites[SPRITES_ORDER[i]] ? (
            <img src={props.pokemon.sprites[SPRITES_ORDER[i]]} alt="sprite" />
          ) : (
            <img src={NoSprite} alt="no-sprite" className="no-sprite" />
          )}
        </div>
      );
      if (i % 2 === 1) {
        sprites.push(
          <div key={Math.floor(i / 2)} className="pokemon__sprite__pair">
            <div className="pokemon__sprite__name--wrapper">
              <h4 className="pokemon__sprite__name">
                {SPRITES_NAMES[Math.floor(i / 2)]}
              </h4>
            </div>
            {pair}
          </div>
        );
        pair = [];
      }
    }
  }

  const title = props.loadedSpecies ? (
    props.species.has_gender_differences ? null : (
      <div className="pokemon__sprite__title--wrapper">
        <h2>SPRITES</h2>
      </div>
    )
  ) : null;

  return (
    <div className="sprite--container">
      {title}
      {sprites}
    </div>
  );
};

export default Sprites;
