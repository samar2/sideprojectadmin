import React from "react";
import { Route, Switch } from "react-router-dom";
import RegularTables from "./RegularTables";
import ExtendedTables from "./ExtendedTables";
import ReactBootstrapTable from "./ReactBootstrapTable";

const Tables = ({ match }) => (
  <div className="content">
    <Switch>
      <Route path={`${match.url}/regular-tables`} component={RegularTables} />
      <Route path={`${match.url}/extended-tables-messages`}>
        <ExtendedTables title="Messages" />
      </Route>
      <Route path={`${match.url}/extended-tables-categories`}>
        <ExtendedTables title="Categories" />
      </Route>
      <Route path={`${match.url}/extended-tables-items`}>
        <ExtendedTables title="Items" />
      </Route>
      <Route
        path={`${match.url}/react-bootstrap-table`}
        component={ReactBootstrapTable}
      />
    </Switch>
  </div>
);

export default Tables;
