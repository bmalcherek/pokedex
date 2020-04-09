import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import EvolutionChain from "./EvolutionChain";
import Sprites from "./Sprites";
import PokemonStats from "./PokemonStats";
import Types from "./Types";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});
  const [species, setSpecies] = useState({});
  const [loadedPokemon, setLoadedPokemon] = useState(false);
  const [loadedSpecies, setLoadedSpecies] = useState(false);
  const [stats, setStats] = useState({ loaded: false });

  const { pokemonId } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then((res) => {
      setPokemon(res.data);
      setLoadedPokemon(true);
      document.title =
        res.data.name.charAt(0).toUpperCase() + res.data.name.substring(1);
      console.log("pokemon", res.data);
    });
  }, [pokemonId]);

  useEffect(() => {
    if (loadedPokemon) {
      axios.get(pokemon.species.url).then((res) => {
        setSpecies(res.data);
        setLoadedSpecies(true);
        console.log("species", res.data);
      });
    }
  }, [loadedPokemon]);

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

  const name = loadedPokemon ? pokemon.name.toUpperCase() : null;
  const habitat = loadedSpecies
    ? species.habitat.name.charAt(0).toUpperCase() +
      species.habitat.name.substring(1)
    : null;
  const shape = loadedSpecies
    ? species.shape.name.charAt(0).toUpperCase() +
      species.shape.name.substring(1)
    : null;

  return (
    <div className="pokemon-detail--container">
      <div className="pokemon-detail--wrapper">
        <div className="pokemon__name--wrapper">
          <h1 className="pokemon__name">{name}</h1>
        </div>
        <div className="column--container">
          <div className="content-column--wrapper col-lg-6 col-md-12 col-sm-12">
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
          <div className="info-column--wrapper col-lg-6 col-md-12 col-sm-12">
            <div className="info-column">
              <div className="pokemon-detail__stats--wrapper">
                <Types loaded={loadedPokemon} types={pokemon.types} />
                <PokemonStats stats={stats} />
                <div className="pokemon__habitat-shape--wrapper">
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
                </div>
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
