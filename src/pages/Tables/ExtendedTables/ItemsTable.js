import React from "react";
import generateData from "../generateData";
import moment from "moment";
import AddItemsForm from "../../Forms/RegularForms/AddItemsForm";
const data = generateData(10);

class ItemsTable extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const response = await fetch("http://localhost:8000/api/items");
    const items = await response.json();
    const response2 = await fetch("http://localhost:8000/api/categories");
    const categories = await response2.json();
    // console.log(items.data);
    this.setState({
      data: items.data,
      categories: categories.data,
    });
  }
  addItem = async (e, cat_id) => {
    e.preventDefault();
    console.log("item_form", cat_id);
    console.log("item_form", e.target.name.value);
    console.log("item_form", e.target.description.value);
    console.log("item_form", e.target.price.value);
    console.log("item_form", e.target.image.value);
    const body = new FormData();
    body.append("name", e.target.name.value);
    body.append("description", e.target.description.value);
    body.append("price", e.target.price.value);
    body.append("category_id", cat_id);
    body.append("image", e.target.image.files[0]);
    const response = await fetch("http://localhost:8000/api/items", {
      method: "POST",
      body,
    });
    const result = await response.json();
    console.log(result);
    const item = {
      id: result.data.id,
      name: result.data.name,
      description: result.data.description,
      price: result.data.price,
      image: result.data.image,
      category_id: result.data.category_id,
      category: result.data.category,
      created_at: result.data.created_at,
      updated_at: result.data.updated_at,
    };
    const data = [...this.state.data];
    data.push(item);
    this.setState({ data });
  };
  render() {
    return (
      <div>
        <AddItemsForm
          categories={this.state.categories}
          addItem={this.addItem}
        />
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
                  <th className="text-center">Image</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th className="th-description">Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item) => (
                  <tr>
                    <td>
                      <div className="img-container">
                        <img
                          src={`http://localhost:8000/storage/images/${item.category_id}/${item.image}`}
                          alt={item.name}
                          style={{ width: "50px" }}
                        />
                      </div>
                    </td>
                    <td className="td-number">{item.id}</td>
                    <td className="td-name">{item.name}</td>
                    <td>{item.description}</td>
                    <td>€{item.price}</td>
                    <td>{item.category.name}</td>
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

export default ItemsTable;
