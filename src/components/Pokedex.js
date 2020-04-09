import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import PokemonTile from "./PokemonTile";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [newPokemons, setNewPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [hasMore, setHasMore] = useState(true);
  const [pokedexItems, setPokedexItems] = useState([]);

  useEffect(() => {
    const temp = newPokemons.map((pokemon) => (
      <PokemonTile url={pokemon.url} key={pokemon.name} />
    ));
    setPokedexItems([...pokedexItems, ...temp]);
  }, [newPokemons]);

  useEffect(() => {
    document.title = "Pokedex";
  }, []);

  const handleLoadMore = (pageNum) => {
    setHasMore(false);
    axios.get(url).then((res) => {
      setPokemons([...pokemons, ...res.data.results]);
      setNewPokemons(res.data.results);
      setUrl(res.data.next);
      setHasMore(res.data.next ? true : false);
    });
  };

  return (
    <div className="pokedex--container">
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
  );
};

export default Pokedex;
