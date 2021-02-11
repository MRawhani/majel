import React from "react";
import { Route, Redirect } from "react-router-dom";
import authservice from "../../../services/auth-service";

export default props => {
  const { component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={props =>
        authservice.isAdmin() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/home", state: { message: 'انت لست ادمن' } }} />
        )
      }
    />
  );
};
