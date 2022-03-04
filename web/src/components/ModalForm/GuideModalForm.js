import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";

import "./ModalForm.css";
import "./TourModalForm.css";
import Button from "../../parts/UIElements/Button";

const baseURL = "https://agency-api31.herokuapp.com";

const fetcher = url => axios.get(url).then(res => res.data)

const GuideModalForm = (props) => {
  const { data: guide, mutate: mutateGuide } = useSWR(props.editId ? `${baseURL}/guides/${props.editId}` : null, fetcher)
  
  const createGuide = (guide) => {
    axios.post(`${baseURL}/guides`, guide || {}).then((response) => {
      mutateGuide();
      if(!props.editId && props.mutateGuides) props.mutateGuides();
      props.setGuideModal(false);
    })
  }

   const updateGuide = (guide) => {
    axios.put(`${baseURL}/guides/${props.editId || 0}`, guide || {}).then((response) => {
      mutateGuide();
      props.mutateGuides();
      props.setGuideModal(false)
    })
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Обов'язкове поле"),
    lastName: yup.string().required("Обов'язкове поле"),
    age: yup.number().typeError("Повинно бути числом").required("Обов'язкове поле"),
    experience: yup.number().typeError("Повинно бути числом").required("Обов'язкове поле"),
    about: yup.string().min(5, "Замалий опис").required("Обов'язкове поле"),
  })

  return (
    <div id="myModal" className="modal" style={{display: props.guideModal ? "block" : "none"}}>
      <div className="modal-content">
        <span 
          className="close" 
          onClick={() => props.setGuideModal(false)}
        >&times;
        </span>
      <Formik
        enableReinitialize 
        initialValues={
          guide ?
          {
            firstName: guide?.first_name || "",
            lastName: guide?.last_name || "",
            age: guide?.age || 0, 
            experience: guide?.experience || 0,
            about: guide?.about || ""
           }:{
            firstName:"",
            lastName:"",
            age:0,
            experience: 0,
            about: ""
          }
      }
        validateOnBlur
        onSubmit={(values,  {resetForm}) => {
          console.log(values, "modal");
          if(props.editId) updateGuide(values);
          else createGuide(values);
        }}
        validationSchema={validationSchema}
      >
        {({ 
            values, 
            errors, 
            touched,
            handleChange, 
            handleBlur, 
            isValid, 
            handleSubmit, 
            dirty,
            resetForm
          }) => (
            <Form className="modal-form">
  

              <div className="form__group">
                <div>
                  <label htmlFor="firstName">Ім'я</label><br/>
                  <input
                    className="form__input"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                {touched.firstName && errors.firstName && <span className="form__error">{errors.firstName}</span>}
                </div>
                <div>
                <label htmlFor="lastName">Прізвище</label><br/>
                <input
                  className="form__input"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              {touched.lastName && errors.lastName && <span className="form__error">{errors.lastName}</span>}
              </div>
              </div>


              <div className="form__group">
                <div>
                  <label htmlFor="age">Вік</label><br/>
                  <input
                    className="form__input"
                    type="number"
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                  />
                  {touched.age && errors.age && <span className="form__error">{errors.age}</span>}
                </div>
                <div>
                  <label htmlFor="experience">Досвід</label><br/>
                  <input
                    className="form__input"
                    type="number"
                    name="experience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.experience}
                  />
                  {touched.experience && errors.experience && <span className="form__error">{errors.experience}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="about">Про себе</label><br/>
                <textarea 
                  rows="5" 
                  cols="45" 
                  name="about"
                  className="form__input"
                  type="textarea"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.about}
                  />
                {touched.about && errors.about && <span className="form__error">{errors.about}</span>}
              </div>
                <Button 
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type="submit"
                  style={{marginRight: "10px", width: "80px"}}
                >
                  Зберегти
                </Button>

                <Button 
                  onClick={() => {
                    resetForm();
                    props.setGuideModal(false);
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

export default GuideModalForm;  