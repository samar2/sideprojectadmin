import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "components/FormInputs/renderField";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }
  return errors;
};

const AddCategoryForm = ({
  submitting,
  handleSubmit,
  submitForm,
  addCategory,
}) => (
  <div className="card">
    <div className="header">
      <h4>Add Categories Form</h4>
    </div>
    <div className="content">
      <form onSubmit={(e) => addCategory(e)}>
        <div className="form-group">
          <label className="control-label">Name</label>
          <Field name="name" type="text" component={renderField} />
        </div>

        <div className="form-group">
          <label className="control-label">Description</label>
          <Field name="description" type="text" component={renderField} />
        </div>
        {/* 
        <Field
          name="newsletter"
          type="checkbox"
          component={renderField}
          label="Subscribe to newsletter"
        /> */}

        <button
          type="submit"
          className="btn btn-fill btn-info"
          disabled={submitting}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);

export default reduxForm({
  form: "addCategoryForm",
  /* validate, */
})(AddCategoryForm);
