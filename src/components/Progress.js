import React from "react";

const Progress = (props) => {
  return (
    <div className="progress--wrapper">
      <div className="progress__text--wrapper">
        <p className="progress__text">{props.text}</p>
      </div>
      <div className="progress-bar">
        <div
          className={`filler ${props.type}`}
          style={{ width: props.percentage }}
        />
      </div>
      <div className="progress__value--wrapper">
        <p className="progress__value">{props.value}</p>
      </div>
    </div>
  );
};

export default Progress;
