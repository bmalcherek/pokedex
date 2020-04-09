import React from "react";

const Types = (props) => {
  let types = null;
  if (props.loaded) {
    types = props.types.map((type) => (
      <span key={type.slot} className={`pokemon__type ${type.type.name}`}>
        {type.type.name}
      </span>
    ));
  }
  return (
    <div className="pokemon__types--wrapper">
      <div className="pokemon__types--text--wrapper">
        <h3 className="pokemon__types--text">TYPES</h3>
      </div>
      <div className="pokemon__types">{types}</div>
    </div>
  );
};

export default Types;
