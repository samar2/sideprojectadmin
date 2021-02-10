import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ls from "local-storage";
import SecuredRoute from "./SecuredRoute";
import cx from "classnames";
import { setMobileNavVisibility } from "../../reducers/Layout";
import { withRouter } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import SideBar from "../../components/SideBar";
import ThemeOptions from "../../components/ThemeOptions";
import MobileMenu from "../../components/MobileMenu";
/**
 * Pages
 */
import Dashboard from "../Dashboard";
import Components from "../Components";
import UserProfile from "../UserProfile";
import MapsPage from "../MapsPage";
import Forms from "../Forms";
import Charts from "../Charts";
import Calendar from "../Calendar";
import Tables from "../Tables";
import LoginForm from "../Forms/RegularForms/LoginForm";
import { NavItem } from "react-bootstrap";

class Main extends React.Component {
  state = {
    user: {},
    token: null,
  };
  componentDidMount() {
    this.props.history.listen(() => {
      if (this.props.mobileNavVisibility === true) {
        this.props.hideMobileMenu();
      }
    });
  }
  setUser = (props) => {
    console.log("setuser", props);
    this.setState({ user: props.success, token: props.token }, () => {
      ls.set("token", props.token);
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div
        className={cx({
          "nav-open": this.props.mobileNavVisibility === true,
        })}
      >
        <div className="wrapper">
          <div
            className="close-layer"
            onClick={this.props.hideMobileMenu}
          ></div>
          <SideBar />

          <div className="main-panel">
            <Header />
            <Switch>
              <SecuredRoute
                exact
                path="/"
                component={Dashboard}
                {...this.props}
              />
              <Route exact path="/login">
                <LoginForm setUser={this.setUser} />
              </Route>
              <SecuredRoute path="/tables" component={Tables} {...this.props} />
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false)),
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));
