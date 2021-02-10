import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "components/FormInputs/renderField";

const validate = (values) => {
  const errors = {};
  if (values.email !== undefined) {
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

const LoginForm = ({ submitting, handleSubmit, setUser }) => {
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const body = new FormData();
    body.append("email", e.target.email.value);
    body.append("password", e.target.password.value);
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body,
    });
    const result = await response.json();
    //console.log("resultlogin", result);
    setUser(result);
    /* alert("You entered: " + JSON.stringify(values, 0, 2));
    return false; */
  };

  return (
    <div className="card">
      <div className="header">
        <h4>Horizontal Form</h4>
      </div>
      <div className="content">
        <form className="form-horizontal" onSubmit={submitForm}>
          <div className="form-group">
            <label className="col-md-3 control-label">Email</label>
            <div className="col-md-9">
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-3 control-label">Password</label>
            <div className="col-md-9">
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-3"></label>
            <div className="col-md-9">
              <button type="submit" className="btn btn-fill btn-info">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);
