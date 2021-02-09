import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "components/FormInputs/renderField";
import { Dropdown, FormControl, MenuItem } from "react-bootstrap";

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

class AddItemsForm extends React.Component {
  state = {
    selectedCategory: 1,
  };
  setCatValue = (props) => {
    /*  e.preventDefault(); */
    console.log(props);
    this.setState({ selectedCategory: props });
  };
  /*  {
    submitting,
    handleSubmit,
    submitForm,
    addItem,
    categories,
  } */
  render() {
    return (
      <div className="card">
        <div className="header">
          <h4>Add Items Form</h4>
        </div>
        <div className="content">
          <form
            onSubmit={(e) => this.props.addItem(e, this.state.selectedCategory)}
          >
            <div className="form-group">
              <label className="control-label">Name</label>
              <Field name="name" type="text" component={renderField} />
            </div>

            <div className="form-group">
              <label className="control-label">Description</label>
              <Field name="description" type="text" component={renderField} />
            </div>
            <div className="form-group">
              <label className="control-label">Price</label>
              <Field name="price" type="text" component={renderField} />
            </div>
            <div className="form-group">
              <label className="control-label">Image</label>
              <FormControl
                id="formControlsFile"
                name="image"
                type="file"
                label="File"
                help="Example block-level help text here."
                accept="image/*"
              />
            </div>
            <div className="form-group">
              <label className="control-label">Category</label>
              {/* <Field name="description" type="text" component={renderField} /> */}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.props.categories &&
                    this.props.categories.map((category) => (
                      <MenuItem
                        onClick={() => this.setCatValue(category.id)}
                        eventKey={category.id}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  <MenuItem>Action</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
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
              disabled={this.props.submitting}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "addItemsForm",
  /* validate, */
})(AddItemsForm);
