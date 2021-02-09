import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import renderField from "components/FormInputs/renderField";
const UpdateCategory = (props) => {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content">
            <form onSubmit={props.editCategory}>
              <div className="form-group">
                <label className="control-label">Name</label>
                <Field name="name" type="text" component={renderField} />
              </div>

              <div className="form-group">
                <label className="control-label">Description</label>
                <Field name="description" type="text" component={renderField} />
              </div>
              <div className="content buttons-with-margin">
                <button className="btn btn-fill " onClick={props.close}>
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-fill btn-info"
                  disabled={props.submitting}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal.Dialog>
    </div>
  );
};
export default reduxForm({
  form: "updateCategoryForm",
  /* validate, */
})(UpdateCategory);
