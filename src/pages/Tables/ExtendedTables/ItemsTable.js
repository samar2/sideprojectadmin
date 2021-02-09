import React from "react";
import generateData from "../generateData";
import moment from "moment";
const data = generateData(10);

class ItemsTable extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const response = await fetch("http://localhost:8000/api/items");
    const items = await response.json();
    // console.log(items.data);
    this.setState({
      data: items.data,
    });
  }
  render() {
    return (
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
                        src={item.image}
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
    );
  }
}

export default ItemsTable;
