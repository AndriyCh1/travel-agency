import React, { useState } from "react";
import Button from "../../parts/UIElements/Button";
import Category from "../Category/Category";
import "./CategoryList.css"
import axios from "axios";
import CategoryModalForm from "../ModalForm/CategoryModalForm";

const baseURL = "https://agency-api31.herokuapp.com";

const CategoryList = (props) =>  {
    const [categoryModal, setCategoryModal] = useState(false);
    const [editId, setEditId] = useState(0);
    const [filterValue, setFilterValue] = useState("");

    const deleteCategory = (id) =>{
      axios.delete(`${baseURL}/categories/${id}`).then((response) => {
        props.mutateCategories();
      })
    }

    const ActionButtons = (id) => {
      return(
        <div className="category-action">
          <Button onClick={() => {setCategoryModal(true); setEditId(id)}}>Edit</Button>
          <Button onClick={() => {deleteCategory(id)}}>Delete</Button>
        </div>
      );
    }
  
    return (
    <>
       {categoryModal? <CategoryModalForm 
        categoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
        editId={editId}
        mutateCategories={props.mutateCategories}
    />: null}

    <div className="categories">
     <div className="filter-form">
        <div>
          <Button 
            onClick={() => {
              setEditId(0); 
              setCategoryModal(true);
            }}
            style={{backgroundColor: "#9ff2fc", marginRight:"10px"}}>
              Додати категорію
          </Button>
        </div>

        <div className="filter-action">
          <input
            type="text" 
            placeholder="Пошук..." 
            className="search-input" 
            onChange={(e)=>{
              setFilterValue(e.target.value)
            }}
          />
          </div>
      </div>

      <ul className="category-list">
        {props.categories?.filter((category) => category.name === "" || 
         category.name.toLowerCase().includes(filterValue.toLowerCase())).map(el => 
        <li key={el.category_id} className="category-item">
            <Category 
              key={el.category_id}
              name= {el.name}
            />
          {ActionButtons(el.category_id)}
        </li>
        )}
      </ul>
      </div>
      </>
    )
}

export default CategoryList;