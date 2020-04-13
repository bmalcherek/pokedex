import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useHistory } from "react-router-dom";

import NameFilter from "./Autocomplete";

const Filters = (props) => {
  const [types, setTypes] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type/").then((res) => {
      setTypes(res.data.results);
    });
  }, []);

  const typesOptions = types.map((type) => {
    return {
      value: type.url,
      label: type.name.charAt(0).toUpperCase() + type.name.substring(1),
    };
  });

  return (
    <div className="filters--container">
      <div className="filters--wrapper">
        <div className="filters__title--wrapper">
          <h2 className="filters__title">Filters</h2>
        </div>
        <div className="filters__name--wrapper">
          <NameFilter history={history} />
        </div>
        <div className="filters__type--container">
          <div className="filters__type__select--wrapper">
            <Select
              isMulti
              name="type"
              options={typesOptions}
              placeholder="Type"
              value={props.filters.type.value}
              onChange={(event) => {
                if (event) {
                  Promise.all(
                    event.map((filter) => axios.get(filter.value))
                  ).then((res) => {
                    let temp = [];
                    res.map((res) => temp.push(res.data.pokemon));
                    props.filters.type.setItems(temp);
                  });
                  props.filters.type.setType(event);
                } else {
                  props.filters.type.setType([]);
                  props.filters.type.setItems([]);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
