import React from "react";
import { Route } from "react-router-dom";
import ls from "local-storage";

import LoginForm from "../Forms/RegularForms/LoginForm";
const SecuredRoute = ({ component, render, path }) => {
  const renderIf = (props) => {
    const token = ls.get("token");
    console.log(props);
    if (!token) {
      props.history.push("/login");
    }
    if (render) {
      return render(props);
    }
    const Component = component;
    return <Component {...props} />;
  };
  return <Route path={path} render={renderIf} />;
};
export default SecuredRoute;
