import React from "react";
import generateData from "../generateData";
import axios from "axios";
import moment from "moment";
import ls from "local-storage";
import StackedForm from "../../Forms/RegularForms/StackedForm";
import AddCategoriesForm from "../../Forms/RegularForms/AddCategoriesForm";
import UpdateCategory from "./UpdateCategory";
const data = generateData(10);

class CategoriesTable extends React.Component {
  state = {
    data: [],
    displayModal: false,
  };
  async componentDidMount() {
    const response = await fetch("http://localhost:8000/api/categories");
    const categories = await response.json();
    // console.log(items.data);
    this.setState({
      data: categories.data,
    });
  }
  close = (e) => {
    e.preventDefault();
    this.setState({ displayModal: false });
  };
  addCategory = async (e) => {
    e.preventDefault();
    console.log("cat_form", e.target.name.value);
    console.log("cat_form", e.target.description.value);
    const body = new FormData();
    body.append("name", e.target.name.value);
    body.append("description", e.target.description.value);
    const token = ls.get("token");
    const result = await axios.post(
      "http://localhost:8000/api/categories",
      body,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    /*  const response = await fetch("http://localhost:8000/api/categories", {
      method: "POST",
      headers: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          /* "Content-Type": "application/x-www-form-urlencoded",
        },
      },
      body,
    }); */
    //const result = await response.json();
    console.log(result);
    const category = {
      id: result.data.id,
      name: result.data.name,
      description: result.data.description,
      created_at: result.data.created_at,
      updated_at: result.data.updated_at,
    };
    const data = [...this.state.data];
    data.push(category);
    this.setState({ data });
  };
  deleteItem = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
    if (result) {
      const originalData = [...this.state.data];
      const data = originalData.filter((item) => item.id !== id);
      this.setState({ data });
    }
  };
  updateItem = (e, id) => {
    e.preventDefault();
    console.log(id);
    const result = this.state.data.find((item) => {
      return item.id === id;
    });
    console.log(result);
    this.setState({ displayModal: true, selectedItem: result });
  };
  editCategory = async (e) => {
    e.preventDefault();
    console.log(this.state.selectedItem);
    const body = new FormData();
    body.append("name", e.target.name.value);
    body.append("description", e.target.description.value);
    const response = await fetch(
      `http://localhost:8000/api/categories/${this.state.selectedItem.id}?_method=PUT`,
      {
        method: "POST",
        body,
      }
    );
    const result = await response.json();
    console.log(
      "result",
      result
    ); /* 
    const oldData = [...this.state.data]; */

    //const data = oldData.filter((item) => item.id !== result.data.id);
    const data = this.state.data.map((cat) => {
      if (cat.id === result.data.id) {
        return result.data;
      } else return cat;
    });
    /*  data.push(result.data); */
    this.setState({ data });
  };
  render() {
    return (
      <div>
        {this.state.displayModal && (
          <UpdateCategory
            close={this.close}
            editCategory={this.editCategory}
            initialValues={{
              name: this.state.selectedItem.name,
              description: this.state.selectedItem.description,
            }}
          />
        )}

        <AddCategoriesForm addCategory={this.addCategory} />
        <div className="card">
          <div className="header text-center">
            <h4 className="title">{this.props.title}</h4>
            <p className="category">A table for content management</p>
            <br />
          </div>
          <div className="content table-responsive table-full-width">
            <table className="table table-bigboy">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="th-description">Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item) => (
                  <tr>
                    <td className="td-name">{item.name}</td>
                    <td>{item.description}</td>

                    <td className="td-actions">
                      <button
                        type="button"
                        rel="tooltip"
                        data-placement="left"
                        title=""
                        className="btn btn-info btn-simple btn-icon"
                        data-original-title="View Post"
                      >
                        <i className="fa fa-image"></i>
                      </button>
                      <button
                        type="button"
                        rel="tooltip"
                        data-placement="left"
                        title=""
                        className="btn btn-success btn-simple btn-icon"
                        data-original-title="Edit Post"
                        onClick={(e) => this.updateItem(e, item.id)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        rel="tooltip"
                        data-placement="left"
                        title=""
                        className="btn btn-danger btn-simple btn-icon "
                        data-original-title="Remove Post"
                        onClick={(e) => this.deleteItem(e, item.id)}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesTable;
