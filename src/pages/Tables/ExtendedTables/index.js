import React from "react";
import TableWithSwitch from "./TableWithSwitch";
import TableWithLinks from "./TableWithLinks";
import BigTable from "./BigTable";
import MessagesTable from "./MessagesTable";
import CategoriesTable from "./CategoriesTable";
import ItemsTable from "./ItemsTable";

const ExtendedTables = (props) => (
  <div className="container-fluid">
    {/* <div className="row">
      <div className="col-md-6">
        <TableWithLinks />
      </div>
      <div className="col-md-6">
        <TableWithSwitch />
      </div>
    </div> */}
    <div className="row">
      <div className="col-md-12">
        {/* <BigTable title={props.title} /> */}
        {props.title === "Messages" ? (
          <MessagesTable title={props.title} />
        ) : props.title === "Categories" ? (
          <CategoriesTable title={props.title} />
        ) : (
          <ItemsTable title={props.title} />
        )}
      </div>
    </div>
  </div>
);

export default ExtendedTables;
