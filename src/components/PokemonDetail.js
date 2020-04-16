import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import EvolutionChain from "./EvolutionChain";
import Sprites from "./Sprites";
import PokemonStats from "./PokemonStats";
import Types from "./Types";

import NoSprite from "../assets/question-solid.svg";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});
  const [species, setSpecies] = useState({});
  const [loadedPokemon, setLoadedPokemon] = useState(false);
  const [loadedSpecies, setLoadedSpecies] = useState(false);
  const [stats, setStats] = useState({ loaded: false });

  const { pokemonId } = useParams();

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then((res) => {
      setPokemon(res.data);
      setLoadedPokemon(true);
      document.title =
        res.data.name.charAt(0).toUpperCase() + res.data.name.substring(1);
    });
  }, [pokemonId]);

  useEffect(() => {
    if (loadedPokemon) {
      axios.get(pokemon.species.url).then((res) => {
        setSpecies(res.data);
        setLoadedSpecies(true);
      });
    }
    // eslint-disable-next-line
  }, [loadedPokemon, pokemonId]);

  useEffect(() => {
    if (loadedPokemon) {
      setStats({
        loaded: loadedPokemon,
        baseXp: pokemon.base_experience,
        height: pokemon.height,
        weight: pokemon.weight,
        advStats: pokemon.stats,
      });
    }
  }, [pokemon, loadedPokemon]);

  const flavourText = loadedSpecies
    ? species.flavor_text_entries.find((part) => part.language.name === "en")
        .flavor_text
    : null;

  const name = loadedPokemon ? pokemon.name.toUpperCase() : null;
  const habitat = loadedSpecies
    ? species.habitat
      ? species.habitat.name.charAt(0).toUpperCase() +
        species.habitat.name.substring(1)
      : "Unknown"
    : null;
  const shape = loadedSpecies
    ? species.shape.name.charAt(0).toUpperCase() +
      species.shape.name.substring(1)
    : null;
  const color = loadedSpecies
    ? species.color.name.charAt(0).toUpperCase() +
      species.color.name.substring(1)
    : null;
  const generation = loadedSpecies
    ? species.generation.name.charAt(0).toUpperCase() +
      species.generation.name.substring(1, 11) +
      species.generation.name.substring(11).toUpperCase()
    : null;

  const defaultSprite = loadedPokemon ? (
    <div className="pokemon__deafult__sprite--wrapper">
      {pokemon.sprites.front_default ? (
        <img
          className="pokemon__default__sprite"
          src={pokemon.sprites.front_default}
          alt="front"
        />
      ) : (
        <img
          className="pokemon__default__no-sprite"
          src={NoSprite}
          alt="front"
        />
      )}
    </div>
  ) : null;

  const id = loadedPokemon ? (
    <div className="pokemon__id--wrapper">
      <h1 className="pokemon__id">#{pokemon.id}</h1>
    </div>
  ) : null;

  return (
    <div className="pokemon-detail--container">
      <div className="pokemon-detail--wrapper">
        <div className="pokemon-detail__header--wrapper">
          <div className="pokemon__name--wrapper">
            {defaultSprite}
            <h1 className="pokemon__name">{name}</h1>
          </div>
          {id}
        </div>
        <div className="pokemon-detail__flavour-text--wrapper">
          <span className="pokemon-detail__flavour-text">"{flavourText}"</span>
        </div>
        <div className="column--container">
          <div className="content-column--wrapper col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="content-column">
              <div className="pokemon__sprite--container">
                <Sprites
                  pokemon={pokemon}
                  species={species}
                  loadedSpecies={loadedSpecies}
                />
              </div>
            </div>
          </div>
          <div className="info-column--wrapper col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="info-column">
              <div className="pokemon-detail__stats--wrapper">
                <div className="pokemon__other-info--container">
                  <div className="pokemon__habitat--wrapper">
                    <div className="pokemon__habitat__title--wrapper">
                      <h4 className="pokemon__habitat__title">HABITAT</h4>
                    </div>
                    <div className="pokemon__habitat__name--wrapper">
                      <span className="pokemon__habitat__name">{habitat}</span>
                    </div>
                  </div>
                  <div className="pokemon__shape--wrapper">
                    <div className="pokemon__shape__title--wrapper">
                      <h4 className="pokemon__shape__title">SHAPE</h4>
                    </div>
                    <div className="pokemon__shape__name--wrapper">
                      <span className="pokemon__shape__name">{shape}</span>
                    </div>
                  </div>
                  <div className="pokemon__color--wrapper">
                    <div className="pokemon__color__title--wrapper">
                      <h4 className="pokemon__color__title">COLOR</h4>
                    </div>
                    <div className="pokemon__color__name--wrapper">
                      <span className="pokemon__color__name">{color}</span>
                    </div>
                  </div>
                  <div className="pokemon__generation--wrapper">
                    <div className="pokemon__generation__title--wrapper">
                      <h4 className="pokemon__generation__title">GENERATION</h4>
                    </div>
                    <div className="pokemon__generation__name--wrapper">
                      <span className="pokemon__generation__name">
                        {generation}
                      </span>
                    </div>
                  </div>
                </div>
                <Types loaded={loadedPokemon} types={pokemon.types} />
                <PokemonStats stats={stats} />
              </div>
            </div>
          </div>
        </div>

        <EvolutionChain
          species={species}
          pokemon={pokemon}
          loaded={loadedSpecies}
        />
      </div>
    </div>
  );
};

export default PokemonDetail;
