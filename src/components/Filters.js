import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useHistory } from "react-router-dom";

import NameFilter from "./Autocomplete";

import CloseIcon from "../assets/times-solid.svg";

const Filters = (props) => {
  const [types, setTypes] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type/").then((res) => {
      setTypes(
        res.data.results.sort((type, otherType) => {
          if (type.name > otherType.name) {
            return 1;
          } else if (type.name < otherType.name) {
            return -1;
          }
          return 0;
        })
      );
    });
  }, []);

  const typesOptions = types.map((type) => {
    return {
      value: type.url,
      label: type.name.charAt(0).toUpperCase() + type.name.substring(1),
    };
  });

  const selectStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      height: "5.2rem",
    }),
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #aaa",
    }),
  };

  return (
    <div className={`${props.show ? "show--container" : "filters--container"}`}>
      <div className="filters--wrapper">
        <div className="close-btn--wrapper">
          <img
            src={CloseIcon}
            alt="close-icon"
            className="close-btn"
            onClick={() => props.closeFilters(false)}
          />
        </div>
        <div className="filters__title--wrapper">
          <h2 className="filters__title">FILTERS</h2>
        </div>
        <div className="filters__name--wrapper">
          <div className="filters__name__title--wrapper">
            <span className="filters__name__title">NAME FILTER</span>
          </div>
          <div className="filters__name__input--wrapper">
            <NameFilter history={history} />
          </div>
        </div>
        <div className="filters__type--wrapper">
          <div className="filters__type__title--wrapper">
            <span className="filters__type__title">TYPE FILTER</span>
          </div>
          <div className="filters__type__select--wrapper">
            <Select
              isMulti
              name="type"
              options={typesOptions}
              placeholder="Type"
              value={props.filters.type.value}
              styles={selectStyles}
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
        <div className="created-by--wrapper">
          <span className="created-by">Created by Bartosz Malcherek</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
