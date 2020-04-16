import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ArrowRight from "../assets/arrow-right-solid.svg";
import ArrowDown from "../assets/arrow-down-solid.svg";
import NoSprite from "../assets/question-solid.svg";

const EvolutionChain = (props) => {
  const [evolutionChain, setEvolutionChain] = useState({});
  const [ancestor, setAncestor] = useState({});
  const [successor, setSuccessor] = useState({});
  const [loadedEvolutionChain, setLoadedEvolutionChain] = useState(false);
  const [loadedAncestor, setLoadedAncestor] = useState(false);
  const [loadedSuccessor, setLoadedSuccessor] = useState(false);

  const { pokemonId } = useParams();

  const findSuccessorUrl = (chain) => {
    let next = false;
    while (chain.evolves_to.length > 0 || next) {
      if (next) {
        return chain.species.url;
      }

      if (chain.species.name === props.pokemon.name) {
        next = true;
      }

      chain = chain.evolves_to[0];
    }
    return null;
  };

  //API CALLS

  useEffect(() => {
    if (props.loaded) {
      axios.get(props.species.evolution_chain.url).then((res) => {
        setEvolutionChain(res.data);
        setLoadedEvolutionChain(true);
      });
    }
  }, [props.loaded]);

  useEffect(() => {
    if (loadedEvolutionChain) {
      //LOAD ANCESTOR
      if (props.species.evolves_from_species) {
        axios.get(props.species.evolves_from_species.url).then((res) => {
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}/`)
            .then((res) => {
              setAncestor(res.data);
              setLoadedAncestor(true);
            });
        });
      }

      //LOAD SUCCESSOR
      if (evolutionChain.chain.evolves_to.length > 0) {
        const successorUrl = findSuccessorUrl(evolutionChain.chain);
        if (successorUrl) {
          axios.get(successorUrl).then((res) => {
            axios
              .get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}/`)
              .then((res) => {
                setSuccessor(res.data);
                setLoadedSuccessor(true);
              });
          });
        }
      }
    }
  }, [loadedEvolutionChain, evolutionChain.chain, pokemonId]);

  const ancestorName = loadedAncestor ? ancestor.name.toUpperCase() : null;
  const ancestorImg = loadedAncestor ? (
    ancestor.sprites.front_default ? (
      <img
        src={ancestor.sprites.front_default}
        alt="right"
        className="evolution-chain__item__image"
      />
    ) : (
      <img
        src={NoSprite}
        alt="right"
        className="evolution-chain__item__no-sprite"
      />
    )
  ) : null;

  const ancestorArrow = loadedAncestor ? (
    <div className="evolution-chain__arrow col-xl-2 col-lg-2 col-md-12 col-sm-12">
      <div className="evolution-chain__arrow__right--wrapper">
        <img
          src={ArrowRight}
          alt="right"
          className="evolution-chain__arrow__right"
        />
      </div>
      <div className="evolution-chain__arrow__down--wrapper">
        <img
          src={ArrowDown}
          alt="down"
          className="evolution-chain__arrow__down"
        />
      </div>
    </div>
  ) : null;

  const curPokemonImg = loadedEvolutionChain ? (
    props.pokemon.sprites.front_default ? (
      <img
        src={props.pokemon.sprites.front_default}
        alt="curr-img"
        className="evolution-chain__item__image"
      />
    ) : (
      <img
        src={NoSprite}
        alt="no-sprite"
        className="evolution-chain__item__no-sprite"
      />
    )
  ) : null;
  const curPokemonName = loadedEvolutionChain
    ? props.pokemon.name.toUpperCase()
    : null;

  const successorName = loadedSuccessor ? successor.name.toUpperCase() : null;
  const successorImg = loadedSuccessor ? (
    successor.sprites.front_default ? (
      <img
        src={successor.sprites.front_default}
        alt="successor-img"
        className="evolution-chain__item__image"
      />
    ) : (
      <img
        src={NoSprite}
        alt="no-sprite"
        className="evolution-chain__item__no-sprite"
      />
    )
  ) : null;
  const successorArrow = loadedSuccessor ? (
    <div className="evolution-chain__arrow col-xl-2 col-lg-2 col-md-12 col-sm-12">
      <div className="evolution-chain__arrow__right--wrapper">
        <img
          src={ArrowRight}
          alt="right"
          className="evolution-chain__arrow__right"
        />
      </div>
      <div className="evolution-chain__arrow__down--wrapper">
        <img
          src={ArrowDown}
          alt="down"
          className="evolution-chain__arrow__down"
        />
      </div>
    </div>
  ) : null;

  const ancestorJsx = loadedAncestor ? (
    <div className="evolution-chain__item col-xl-2 col-lg-2 col-md-12 col-sm-12">
      <div className="evolution-chain__item__image--wrapper">{ancestorImg}</div>
      <div className="evolution-chain__item__name--wrapper">
        <h4 className="evolution-chain__item__name">{ancestorName}</h4>
      </div>
    </div>
  ) : null;

  const successorJsx = loadedSuccessor ? (
    <div className="evolution-chain__item col-xl-2 col-lg-2 col-md-12 col-sm-12">
      <div className="evolution-chain__item__image--wrapper">
        {successorImg}
      </div>
      <div className="evolution-chain__item__name--wrapper">
        <h4 className="evolution-chain__item__name">{successorName}</h4>
      </div>
    </div>
  ) : null;

  return (
    <div className="evolution-chain--wrapper">
      <div className="evolution-chain__title--wrapper">
        <h3 className="evolution-chain__title">EVOLUTION CHAIN</h3>
      </div>
      <div className="evolution-chain__item--container">
        {ancestorJsx}
        {ancestorArrow}

        <div className="evolution-chain__item col-xl-2 col-lg-2 col-md-12 col-sm-12">
          <div className="evolution-chain__item__image--wrapper">
            {curPokemonImg}
          </div>
          <div className="evolution-chain__item__name--wrapper">
            <h4 className="evolution-chain__item__name">{curPokemonName}</h4>
          </div>
        </div>

        {successorArrow}
        {successorJsx}
      </div>
    </div>
  );
};

export default EvolutionChain;
