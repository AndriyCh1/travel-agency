import React from "react";
import "./Button.css"

const Button = (props) => {
  return (
    <button 
      className={`button ${!props?.disabled || "disabled"}`}
      onClick={props.onClick || null}
      type={props.type || "button"} 
      disabled={props?.disabled || false}
      style={props.style}
    >
      {props.children || ""}
    </button>
  )
}

export default Button;