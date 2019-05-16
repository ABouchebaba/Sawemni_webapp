import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";

import { setCurrentUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStore,
  faPen,
  faTrash,
  faBan
} from "@fortawesome/free-solid-svg-icons";

library.add(faStore, faPen, faTrash, faBan);
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  //const decoded = jwt_decode(localStorage.jwtToken);
  //console.log(decoded);
  // Set user and isAuthenticated
  if (localStorage.user) {
    store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
  } else {
    localStorage.clear();
    setAuthToken(false);
    store.dispatch(setCurrentUser({}));
  }
}

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500"),
  loading
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            {/* TURN THIS Route COMPONENT TO PrivateRoute COMPONENT 
            TO MAKE IT ACCESSIBALE ONLY BY AUTHENTIFICATION 
            + Don't forget to change the login Route path to "/"
            */}
            {/* <PrivateRoute exact
              path="/fabricants"
              component={Fabricants}></PrivateRoute> */}
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
