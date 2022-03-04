import axios from "axios";
import React, { useState } from "react";
import Button from "../../parts/UIElements/Button";
import Guide from "../Guide/Guide";
import GuideModalForm from "../ModalForm/GuideModalForm";
import "./GuideList.css"
const baseURL = "http://localhost:3001";

const GuideList = (props) =>  {
    const [guideModal, setGuideModal] = useState(false);
    const [editId, setEditId] = useState(0);
    const [filterValue, setFilterValue] = useState("");

    const deleteGuide = (id) => {
      axios.delete(`${baseURL}/guides/${id}`).then((response) => {
        props.mutateGuides();
      })
    }

    const ActionButtons = (id) => {
      return(
        <div className="guide-action">
          <Button onClick={() => {setGuideModal(true); setEditId(id);}}>Edit</Button>
          <Button onClick={() => {deleteGuide(id)}}>Delete</Button>
        </div>
      );
    }
  
  
    return (
    <>
      {guideModal? <GuideModalForm 
        guideModal={guideModal}
        setGuideModal={setGuideModal}
        editId={editId}
        mutateGuides={props.mutateGuides}
    />: null}
    
    <div className ="guides">
     <div className="filter-form">
        <div>
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
            onChange={(e) => {
              setFilterValue(e.target.value)
            }}
          />
          </div>
      </div>

      <ul className="guide-list">
        {props.guides?.filter((guide) => 
            guide?.first_name === "" || 
            guide.first_name?.toLowerCase().includes(filterValue.toLowerCase()) ||
            guide?.last_name === "" || 
            guide.last_name?.toLowerCase().includes(filterValue.toLowerCase()))
          .map(el => 
        <li key={el.guide_id} className="guide-item">
            <Guide 
              key={el.guide_id}
              firstName= {el?.first_name}
              lastName= {el?.last_name}
              age= {el.age}
              experience={el.experience}
              about={el.about}
            />
          {ActionButtons(el.guide_id)}
        </li>
        )}
      </ul>
      </div>
      </>
    )
}

export default GuideList;