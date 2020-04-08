import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [newPokemons, setNewPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [hasMore, setHasMore] = useState(true);
  const [pokedexItems, setPokedexItems] = useState([]);

  useEffect(() => {
    const temp = newPokemons.map((pokemon) => (
      <li style={{ height: "5rem" }}>{pokemon.name}</li>
    ));
    setPokedexItems([...pokedexItems, ...temp]);
  }, [newPokemons]);

  const handleLoadMore = (pageNum) => {
    console.log(pageNum, url);
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
        <ul>{pokedexItems}</ul>
      </InfiniteScroll>
    </div>
  );
};

export default Pokedex;
