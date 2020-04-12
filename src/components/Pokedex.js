import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { intersectionWith } from "lodash";

import PokemonTile from "./PokemonTile";
import Filters from "./Filters";

const PAGE_SIZE = 20;

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [newPokemons, setNewPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [hasMore, setHasMore] = useState(true);
  const [pokedexItems, setPokedexItems] = useState([]);

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [typeFilterItems, setTypeFilterItems] = useState([]);
  const [filteredPageNum, setFilteredPageNum] = useState(0);

  useEffect(() => {
    let temp;
    if (isFiltered) {
      temp = newPokemons.map((pokemon) => (
        <PokemonTile url={pokemon.pokemon.url} key={pokemon.pokemon.name} />
      ));
    } else {
      temp = newPokemons.map((pokemon) => (
        <PokemonTile url={pokemon.url} key={pokemon.name} />
      ));
    }
    setPokedexItems([...pokedexItems, ...temp]);
  }, [newPokemons]);

  useEffect(() => {
    document.title = "Pokedex";
  }, []);

  //FILTERS

  useEffect(() => {
    if (typeFilter.length > 0) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
      setPokedexItems([]);
      setUrl("https://pokeapi.co/api/v2/pokemon/");
    }
  }, [typeFilter, isFiltered]);

  useEffect(() => {
    let result = [];
    if (typeFilterItems.length > 0) {
      result = typeFilterItems[0];
      for (let i = 1; i < typeFilterItems.length; i++) {
        result = intersectionWith(
          result,
          typeFilterItems[i],
          (object, other) => object.pokemon.name === other.pokemon.name
        );
      }
      setFilteredPokemons(result);
      setPokedexItems([]);
      setHasMore(true);
      setFilteredPageNum(0);
    }
  }, [typeFilterItems]);

  //END FILTERS

  const handleLoadMore = (pageNum) => {
    setHasMore(false);
    if (isFiltered) {
      const sliceBegin = filteredPageNum * PAGE_SIZE;
      const sliceEnd =
        filteredPokemons.length > sliceBegin + PAGE_SIZE
          ? sliceBegin + PAGE_SIZE
          : filteredPokemons.length;

      setFilteredPageNum(filteredPageNum + 1);

      setNewPokemons(filteredPokemons.slice(sliceBegin, sliceEnd));
      if (filteredPokemons.length > sliceBegin + PAGE_SIZE) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } else {
      axios.get(url).then((res) => {
        setPokemons([...pokemons, ...res.data.results]);
        setNewPokemons(res.data.results);
        setUrl(res.data.next);
        setHasMore(res.data.next ? true : false);
      });
    }
  };

  const filters = {
    type: {
      value: typeFilter,
      setType: setTypeFilter,
      items: typeFilterItems,
      setItems: setTypeFilterItems,
    },
  };

  // console.log(typeFilter, typeFilterItems, isFiltered);

  return (
    <div className="pokedex--container">
      <div className="pokedex--wrapper">
        <Filters filters={filters} />
        <div className="pokedex__item--container">
          <InfiniteScroll
            className="pokedex"
            loadMore={handleLoadMore}
            pageStart={0}
            hasMore={hasMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            {pokedexItems}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
