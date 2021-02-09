import React from "react";
import generateData from "../generateData";
import moment from "moment";
import StackedForm from "../../Forms/RegularForms/StackedForm";
import AddCategoriesForm from "../../Forms/RegularForms/AddCategoriesForm";
const data = generateData(10);

class CategoriesTable extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const response = await fetch("http://localhost:8000/api/categories");
    const categories = await response.json();
    // console.log(items.data);
    this.setState({
      data: categories.data,
    });
  }
  addCategory = async (e) => {
    e.preventDefault();
    console.log("cat_form", e.target.name.value);
    console.log("cat_form", e.target.description.value);
    const body = new FormData();
    body.append("name", e.target.name.value);
    body.append("description", e.target.description.value);
    const response = await fetch("http://localhost:8000/api/categories", {
      method: "POST",
      body,
    });
    const result = await response.json();
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
  render() {
    return (
      <div>
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
