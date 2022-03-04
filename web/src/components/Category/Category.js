import React from "react";
import "./Category.css";
const Category = (props) => {
  return (
      <div className="category-item__info">
        <h2>{props.name}</h2>
        {props.children}
      </div>
  )
}

export default Category;