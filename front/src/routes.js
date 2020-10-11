import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/Cadastro";
import Login from "./pages/Login";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/cadastro" component={ SignUp }/>
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route path="*" component={ <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;