import React, { useEffect, useState } from "react"

import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";

import "./ModalForm.css";
import "./TourModalForm.css";
import Button from "../../parts/UIElements/Button";
import Removable from "../../parts/UIElements/Removable";

const baseURL = "https://agency-api31.herokuapp.com";

const fetcher = url => axios.get(url).then(res => res.data)

const TourModalForm = (props) => {
  const { data: categories, mutate: mutateCategory } = useSWR(`${baseURL}/categories`, fetcher);
  const { data: guides } = useSWR(`${baseURL}/guides`, fetcher);
  const { data: tourGuides, mutate: mutateTourGuides } = useSWR(props.editId ? `${baseURL}/tours/${props.editId}/guides` : null, fetcher)
  const { data: tour } = useSWR(props.editId ? `${baseURL}/tours/${props.editId}` : null, fetcher)

  const [addingCategory, setAddingCategory] = useState(false);

  const createTour = (tour) => {
    axios.post(`${baseURL}/tours`, tour || {}).then((response) => {
      props.mutateTours();
      props.setModal(false);
    })
  }

   const updateTour = (tour) => {
    axios.put(`${baseURL}/tours/${props.editId || 0}`, tour || {}).then((response) => {
      props.mutateTours();
      props.setModal(false);
    })
  }

  const createCategory = (name) => {
    axios.post(`${baseURL}/categories`, {name} || {}).then((response) => {
      mutateCategory();
    })
  }

  const removeGuide = (id) => {
    axios.delete(`${baseURL}/tours/guide`, {data: {tourId: props.editId, guideId: id}}).then((response) => {
      mutateTourGuides();
    })
  }

  const assignTourToGuide = (id) => {
    axios.post(`${baseURL}/tours/guide`, {tourId: props.editId, guideId: id}).then((response) => {
      mutateTourGuides();
    })
  }

  useEffect(() => mutateCategory(), [addingCategory]);
  
  const validationSchema = yup.object().shape({
    name: yup.string().required("Обов'язкове поле"),
    categoryId: yup.number().min(1, "Обов'язкове поле").required("Обов'язкове поле"),
    newCategory: addingCategory ? yup.string().required("Обов'язкове поле") : yup.string(), 
    price: yup.number().typeError("Повинно бути числом").required("Обов'язкове поле"),
    duration: yup.number().typeError("Повинно бути числом").required("Обов'язкове поле"),
    dateStart: yup.date().required("Обов'язкове поле"),
    dateEnd: yup.date().required("Обов'язкове поле"),
    description: yup.string().min(5, "Замалий опис").required("Обов'язкове поле"),
  })

  return (
    <div id="myModal" className="modal" style={{display: props.modal ? "block" : "none"}}>
      <div className="modal-content">
        <span 
          className="close" 
          onClick={() => props.setModal(false)}
        >&times;
        </span>
      <Formik
        enableReinitialize 
        initialValues={
          tour ?
          {
            newCategory: "",
            categoryId: tour?.category_id || 0,
            guideId: 0,
            name: tour?.name || "", 
            price: tour?.price || 0, 
            duration: tour?.duration || 0, 
            dateStart: tour?.date_start.split("T")[0], 
            dateEnd: tour?.date_end.split("T")[0],
            description: tour?.description
           }:{
            newCategory: "",
            categoryId: 0,
            guideId: 0,
            name: "", 
            price: 0, 
            duration: 0, 
            dateStart: "", 
            dateEnd: "", 
            description: ""
          }
      }
        validateOnBlur
        onSubmit={(values) => {
          if(props.editId) updateTour(values);
          else createTour(values);
        }}
        validationSchema={validationSchema}
      >
        {({ 
            values, 
            errors, 
            touched,
            handleChange, 
            handleBlur, 
            handleSubmit, 
            resetForm
          }) => (
            <Form className="modal-form">
              <div>
                {!addingCategory ?
                <>
                  <label htmlFor="categoryId">Категорія</label><br/>
                  <div>
                    <Field as="select" name="categoryId" value={values.categoryId} className="form__select" onChange={handleChange} onBlur={handleBlur}>
                      <option value="" label="Виберіть категорію"/>
                      {categories?.map(el => <option key={el.category_id} value={el.category_id}>{el.name}</option>)}
                    </Field>

                  <Button
                    onClick={() => {
                      setAddingCategory(true);
                    }}
                    > 
                    Додати категорію
                  </Button> 
                  </div>
                  {touched.categoryId && errors.categoryId && <span className="form__error">{errors.categoryId}</span>}
                </>:
                <>
                <label htmlFor="newCategory">Назва категорії</label><br/>
                <div className="new-category">
                  <input
                    className="new-category__input"
                    type="text"
                    name="newCategory"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newCategory}
                  />
                  <Button
                    onClick={() => {
                      setAddingCategory(false);
                      mutateCategory();
                      createCategory(values.newCategory)
                    }}
                    style={{marginRight: "10px"}}
                  > 
                    Зберегти
                  </Button> 
                  <Button
                    onClick={() => {
                      setAddingCategory(false);
                      values.newCategory = "";
                    }}
                    > 
                    Скасувати
                  </Button> 
                </div>
                {touched.newCategory && errors.newCategory && <span className="form__error">{errors.newCategory}</span>}
                </>
              }
              </div>

              <div>
                <label htmlFor="name">Назва туру</label><br/>
                <input
                  className="form__input"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              {touched.name && errors.name && <span className="form__error">{errors.name}</span>}
              </div>

              <div className="form__group">
                <div>
                  <label htmlFor="price">Вартість</label><br/>
                  <input
                    className="form__input"
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                {touched.price && errors.price && <span className="form__error">{errors.price}</span>}
                </div>

                <div>
                  <label htmlFor="duration">Тривалість</label><br/>
                  <input
                    className="form__input"
                    type="text"
                    name="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                  />
                {touched.duration && errors.duration && <span className="form__error">{errors.duration}</span>}
                </div>
              </div>


              <div className="form__group">
                <div>
                  <label htmlFor="dateStart">Дата початку</label><br/>
                  <input
                    className="form__input"
                    type="date"
                    name="dateStart"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateStart}
                  />
                  {touched.dateStart && errors.dateStart && <span className="form__error">{errors.dateStart}</span>}
                </div>
                <div>
                  <label htmlFor="dateEnd">Дата кінця</label><br/>
                  <input
                    className="form__input"
                    type="date"
                    name="dateEnd"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateEnd}
                  />
                  {touched.dateEnd && errors.dateEnd && <span className="form__error">{errors.dateEnd}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="description">Опис</label><br/>
                <textarea 
                  rows="5" 
                  cols="45" 
                  name="description"
                  className="form__input"
                  type="textarea"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  />
                {touched.description && errors.description && <span className="form__error">{errors.description}</span>}
              </div>
              {props.editId ?
              <> 
              <div>
                <label htmlFor="guideId">Гід</label><br/>
                  <Field as="select" name="guideId" className="form__select">
                    {guides?.map(el => (
                      <option key={el.guide_id} value={el.guide_id}>{el.first_name} {el.last_name}</option>
                    ))}
                  </Field>
                <Button
                  onClick={() => {
                    assignTourToGuide(values.guideId)
                  }}
                > 
                  Призначити
                </Button>
              </div> 
              <div className="assigned-guides">
                {tourGuides?.map((el, index) =>(
                  <Removable 
                    key={index}
                    onClick={() => removeGuide(el.guide_id)}
                  >
                    {el.first_name} {el.last_name}
                  </Removable>
                ))}
              </div></>: null}
                <Button 
                  onClick={handleSubmit}
                  type="submit"
                  style={{marginRight: "10px", width: "80px"}}
                >
                  Зберегти
                </Button>

                <Button 
                  onClick={() => {
                    resetForm();
                    props.setModal(false);
                  }}
                  style={{width: "90px"}}
                >
                  Скасувати
                </Button>
            </Form>
          )}
      </Formik>
    </div>
    </div>
    );
}

export default TourModalForm;