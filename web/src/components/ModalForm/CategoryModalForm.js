import { Formik,  Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";

import "./ModalForm.css";
import Button from "../../parts/UIElements/Button";

const baseURL = "http://localhost:3001";

const fetcher = url => axios.get(url).then(res => res.data)

const CategoryModalForm = (props) => {
  const { data: category} = useSWR(props.editId ? `${baseURL}/categories/${props.editId}` : null, fetcher)
  
  const createCategory = (category) => {
    axios.post(`${baseURL}/categories`, category || {}).then((response) => {
      if(props.editId) props.mutateCategories();
      props.setCategoryModal(false)
    })
  }

   const updateCategory = (category) => {
    axios.put(`${baseURL}/categories/${props.editId || 0}`, category || {}).then((response) => {
      if(props.editId) props.mutateCategories();
      props.setCategoryModal(false);
    })
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обов'язкове поле"),
  })

  return (
    <div id="myModal" className="modal" style={{display: props.categoryModal ? "block" : "none"}}>
      <div className="modal-content">
        <span 
          className="close" 
          onClick={() => props.setCategoryModal(false)}
        >&times;
        </span>
      <Formik
        enableReinitialize 
        initialValues={
          category ? {name: category?.name || ""}
          : {name: ""}
      }
        validateOnBlur
        onSubmit={(values) => {
          if(props.editId) updateCategory(values);
          else createCategory(values);
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
              <div>
                <label htmlFor="name">Назва категорії</label><br/>
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
                    props.setCategoryModal(false);
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

export default CategoryModalForm;