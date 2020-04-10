import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import ArrowRight from "../assets/arrow-right-solid.svg";

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
  const ancestorSrc = loadedAncestor ? ancestor.sprites.front_default : null;
  const ancestorArrow = loadedAncestor ? (
    <div className="ancestor__arrow--wrapper right-arrow--wrapper">
      <img
        src={ArrowRight}
        alt="arrow-right"
        className="ancestor__arrow right-arrow"
      />
    </div>
  ) : null;

  const curPokemonSrc = loadedEvolutionChain
    ? props.pokemon.sprites.front_default
    : null;
  const curPokemonName = loadedEvolutionChain
    ? props.pokemon.name.toUpperCase()
    : null;

  const successorName = loadedSuccessor ? successor.name.toUpperCase() : null;
  const successorSrc = loadedSuccessor ? successor.sprites.front_default : null;
  const successorArrow = loadedSuccessor ? (
    <div className="successor__arrow--wrapper right-arrow--wrapper">
      <img
        src={ArrowRight}
        alt="right-arrow"
        className="successor__arrow right-arrow"
      />
    </div>
  ) : null;

  const ancestorJsx = loadedAncestor ? (
    <div className="ancestor--wrapper evolution-chain__item">
      <div className="ancestor__image--wrapper">
        <img
          className="ancestor__image"
          src={ancestorSrc}
          alt="ancestor_image"
        />
      </div>
      <div className="ancestor__name--wrapper">
        <h4 className="ancestor__name evolution-chain__item__name">
          {ancestorName}
        </h4>
      </div>
    </div>
  ) : null;

  const successorJsx = loadedSuccessor ? (
    <div className="successor--wrapper evolution-chain__item">
      <div className="successor__image--wrapper">
        <img
          className="successor__image"
          src={successorSrc}
          alt="successor_image"
        />
      </div>
      <div className="successor__name--wrapper">
        <h4 className="successor__name evolution-chain__item__name">
          {successorName}
        </h4>
      </div>
    </div>
  ) : null;

  return (
    <div className="evolution-chain--wrapper">
      <div className="evolution-chain__title--wrapper">
        <h3 className="evolution-chain__title">EVOLUTION CHAIN</h3>
      </div>

      {ancestorJsx}

      {ancestorArrow}

      <div className="current-pokemon--wrapper evolution-chain__item">
        <div className="current-pokemon__image--wrapper">
          <img
            className="current-pokemon__image"
            src={curPokemonSrc}
            alt="current-pokemon_image"
          />
        </div>
        <div className="current-pokemon__name--wrapper">
          <h4 className="current-pokemon__name evolution-chain__item__name">
            {curPokemonName}
          </h4>
        </div>
      </div>

      {successorArrow}

      {successorJsx}
    </div>
  );
};

export default EvolutionChain;
