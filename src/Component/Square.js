import React from "react";

function Square(props) {
  const { onClick, value, highlight } = props;
  const className = "square" + (highlight ? " highlight" : "");
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
