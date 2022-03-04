import React from "react";
import "./Removable.css";

const Removable = (props) => {
  return(
  <div className="removable">
      <p>{props.children}</p>
      <span onClick={props.onClick}>&#10006;</span>
  </div>
  )
}

export default Removable;