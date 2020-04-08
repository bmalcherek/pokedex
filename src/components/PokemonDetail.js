import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import EvolutionChain from "./EvolutionChain";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});
  const [species, setSpecies] = useState({});
  const [loadedPokemon, setLoadedPokemon] = useState(false);
  const [loadedSpecies, setLoadedSpecies] = useState(false);
  const [sprites, setSprites] = useState([]);

  const { pokemonId } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then((res) => {
      setPokemon(res.data);
      setLoadedPokemon(true);
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
      let temp = [];
      for (const sprite in pokemon.sprites) {
        const spriteUrl = pokemon.sprites[sprite];
        if (spriteUrl) {
          temp.push(
            <div key={sprite} className="pokemon__sprite--wrapper">
              <img src={spriteUrl} className="pokemon__sprite" alt="sprite" />
            </div>
          );
        }
      }
      setSprites(temp.reverse());
    }
  }, [loadedPokemon, pokemon]);

  const name = loadedPokemon ? pokemon.name.toUpperCase() : null;

  return (
    <div className="pokemon-detail--container">
      <div className="pokemon-detail--wrapper">
        <div className="pokemon__name--wrapper">
          <h1 className="pokemon__name">{name}</h1>
        </div>
        <div className="pokemon__sprite--container">{sprites}</div>

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
