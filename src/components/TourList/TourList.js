import React, { useState } from "react";

import Tour from "../Tour/Tour";
import "./TourList.css";
import Button from "../../parts/UIElements/Button";
import TourModalForm from "../ModalForm/TourModalForm"
import CategoryModalForm from "../ModalForm/CategoryModalForm"
import axios from "axios";
import GuideModalForm from "../ModalForm/GuideModalForm";

const baseURL = "https://agency-api31.herokuapp.com";

const TourList = (props) => {
  const [modal, setModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [guideModal, setGuideModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [sortType, setSortType] = useState("def");

  const deleteTour = (id) => {
    axios.delete(`${baseURL}/tours/${id}`).then(response => props.mutateTours())
  }
  const getSortCondition = (type, first, second) =>{
    let condition = 0;

    switch (type) {
      case "price-asc":
        condition = first.price - second.price;
        break;
      default:
        condition = second.price - first.price;
        break;
    }
    return condition;
  }

  const ActionButtons = (id) => {
    return(
      <div className="tour-action">
        <Button onClick={() => {setModal(true); setEditId(id)}}>Редагувати</Button>
        <Button onClick={() => {deleteTour(id)}}>Видалити</Button>
      </div>
    );
  }

  return (
  <>
    {modal? <TourModalForm 
      modal={modal}
      setModal={setModal}
      editId={editId}
      mutateTours={props.mutateTours}
    />: null}

    {categoryModal? <CategoryModalForm 
      categoryModal={categoryModal}
      setCategoryModal={setCategoryModal}
      editId={editId}
      mutateCategories={props.mutateCategories}
    />: null}

    {guideModal? <GuideModalForm
      guideModal={guideModal}
      setGuideModal={setGuideModal}
      editId={editId}
    />: null}

    <div className="tours">
      <div className="filter-form">
        <div>
        <Button 
          onClick={() => {
            setEditId(0); 
            setModal(true);
          }}
          style={{backgroundColor: "#9ff2fc", marginRight:"10px"}}>
            Додати тур
          </Button>
          <Button 
          onClick={() => {
            setEditId(0); 
            setCategoryModal(true);
          }}
          style={{backgroundColor: "#9ff2fc", marginRight:"10px"}}>
            Додати категорію
          </Button>
          <Button 
          onClick={() => {
            setEditId(0); 
            setGuideModal(true);
          }}
          style={{backgroundColor: "#9ff2fc", marginRight:"10px"}}>
            Додати гіда
          </Button>
        </div>

        <div className="filter-action">
          <input
            type="text" 
            placeholder="Пошук..." 
            className="search-input" 
            onChange={e => setFilterValue(e.target.value)}
          />
          <select defaultValue="def" name="filter" className="filter-select" onChange={e => setSortType(e.target.value)}>
            <option value="def"> За замовчуванням</option>
            <option value="price-asc">Від найдешевшого</option>
            <option value="price-desc">Від найдорожчого</option>
          </select>
        </div>
      </div>
      <ul className="tour-list">
        { props.tours
            ?.filter((tour) => tour.name === "" || tour.name.toLowerCase().includes(filterValue.toLowerCase()))
            .sort((first, second) => getSortCondition(sortType, first, second)).map(el => 
            <li key={el.tour_id} className="tour-item">
              <Tour 
                key={el.tour_id}
                name = {el.name}
                price =  {el.price} 
                duration = {el.duration} 
                dateStart = {el.date_start} 
                dateEnd = {el.date_end} 
                description = {el.description}
              />
              { ActionButtons(el.tour_id) }
            </li>
        )}
      </ul>
    </div>
    </>
  )
}

export default TourList;