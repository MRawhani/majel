import React from "react";
import { Route, Redirect } from "react-router-dom";
import authservice from "../../../services/auth-service";

export default props => {
  const { component: Component, ...rest } = props;
  const { state } = {...props.location}
 console.log(state);
  return (
    <Route
      {...rest}
      render={props =>
        authservice.isAuthenticated() ? (
          state ? (
            <Redirect
              to={{
                pathname: state.from.pathname,
                state: { ...state.from.state },
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                
              }}
            />
          )
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};
