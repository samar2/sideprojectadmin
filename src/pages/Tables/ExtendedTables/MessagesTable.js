import React from "react";
import generateData from "../generateData";
import moment from "moment";
const data = generateData(10);

class MessagesTable extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const response = await fetch("http://localhost:8000/api/messages");
    const messages = await response.json();
    // console.log(items.data);
    this.setState({
      data: messages.data,
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
                <th>Email</th>
                <th className="th-description">Content</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr>
                  {/* <td>
                    <div className="img-container">
                      <img src={item.avatar} alt={item.name} />
                    </div>
                  </td> */}
                  <td className="td-name">{item.email}</td>
                  <td>{item.content}</td>
                  <td className="td-number">
                    {moment(item.created_at).format("YYYY-MM-DD")}
                  </td>
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

export default MessagesTable;
