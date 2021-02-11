import React, { Component } from "react";

import MyButton from "../helpers/MyButton";
import { Redirect } from "react-router-dom";

import authService from "../../services/auth-service";
import { connect } from "react-redux";

import { loginAction, resetErrors } from "./../../actions";

import FormFeild from "./../helpers/Form/FormFeild";
import { ResError } from "../helpers/ResError";
import Form from "./Form";
class LoginForm2 extends Form {
  constructor(props) {
    super(props);
    this.state = {
        formError: false,
        formErrorMessage: "",
        formSuccess: "",
      formData: {
        email: {
          element: "input",
          value: "",
          config: {
            name: "email_input",
            type: "email",
            placeholder: "ايميلك"
          },
          validation: {
            required: true,
            email: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        password: {
          element: "input",
          value: "",
          config: {
            name: "password_input",
            type: "password",
            placeholder: "كلمة السر"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        }
      }
    };
  }

  submitAction = data => {
    
    this.props.loginAction(data);
    
  };
  render() {
    const { errors, isAuth } = this.props.auth;
    if (authService.isAuthenticated()) {
      debugger
      const { state } = {...this.props.location}
      return <Redirect to={{     pathname: state.from&&state.from.pathname,
        state: state.from&& { ...state.from.state }, }} />;
    }
    return (
      <div className="signin_wrapper">
        <form onSubmit={this.submitForm}>
          <FormFeild
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
            isError={this.state.formError}
          />
          <FormFeild
            id={"password"}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
            isError={this.state.formError}
          />

          <ResError errors={errors} />
          <MyButton
            size="small"
            className={`bg-primary fontFamily white-color`}
            label={"تسجيل "}
            styles={{ marginTop: "15px" }}
            onClick={this.submitForm}
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
      auth: state.auth
    };
  };
  export default connect(mapStateToProps, { loginAction, resetErrors})(
    LoginForm2
  );
  