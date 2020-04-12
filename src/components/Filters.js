import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const Filters = (props) => {
  const [types, setTypes] = useState([]);
  // const [filterTypes, setFilterTypes] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type/").then((res) => {
      setTypes(res.data.results);
    });
  }, []);

  // useEffect(() => {
  //   filterTypes.map((type) => {
  //     axios.get(type.value).then((res) => console.log(res.data));
  //   });
  // }, [filterTypes]);

  const typesOptions = types.map((type) => {
    return {
      value: type.url,
      label: type.name.charAt(0).toUpperCase() + type.name.substring(1),
    };
  });

  // console.log(filterTypes);

  return (
    <div className="filters--container">
      <div className="filters--wrapper">
        <div className="filters__title--wrapper">
          <h2 className="filters__title">Filters</h2>
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
                // console.log(event);
                if (event) {
                  Promise.all(
                    event.map((filter) => axios.get(filter.value))
                  ).then((res) => {
                    // console.log("here", res);
                    let temp = [];
                    res.map((res) => {
                      // console.log("data", res.data);
                      temp.push(res.data.pokemon);
                    });
                    props.filters.type.setItems(temp);
                    // console.log("temp", temp);
                  });
                  props.filters.type.setType(event);
                } else {
                  props.filters.type.setType([]);
                  props.filters.type.setItems([]);
                }

                // event.map((filter) => {
                //   console.log("filter", filter);
                //   axios.get(filter.value).then((res) => {
                //     console.log("items", props.filters.type.items);
                //     props.filters.type.setItems([
                //       ...props.filters.type.items,
                //       res.data.pokemon,
                //     ]);
                //   });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
