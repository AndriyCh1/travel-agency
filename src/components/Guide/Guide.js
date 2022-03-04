import React from "react";
import "./Guide.css";
const Guide = (props) => {
  return (
      <div className="guide-item__info">
        <h2>{props.firstName} {props.lastName}</h2>
        <p>Вік: {props.age}</p>
        <p>Досвід роботи: {props.experience} р.</p>
        <p>{props.about}</p>
      </div>
  )
}

export default Guide;