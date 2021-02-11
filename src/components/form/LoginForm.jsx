import React, { Component } from "react";
import { connect } from "react-redux";
import MyButton from "../helpers/MyButton";
import { Redirect } from "react-router-dom";
import { loginAction, resetErrors } from "./../../actions";
import authService from '../../services/auth-service'
import {
  generateData,
  isFormValid,
  update
} from "./../helpers/Form/FormActions";
import FormFeild from "./../helpers/Form/FormFeild";
import { ResError } from "../helpers/ResError";
class LoginForm extends Component {
  constructor() {
    super();
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

  emptyErrors = () => {
    //when input change
    const { errors } = this.props.auth;
    if (errors && errors.length > 0) {
      this.props.resetErrors();
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "Login");
    this.emptyErrors();
    this.setState({
      formError: false,
      formData: newFormData,
      formErrorMessage: ""
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataSubmit = generateData(this.state.formData, "Login");
    let formIsValid = isFormValid(this.state.formData, "Login");
    if (formIsValid) {
      debugger;
      this.props.loginAction(dataSubmit);
      console.log(dataSubmit);
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "اكتب البيانات بشكل صحيح"
      });
    }
  };
  render() {
    const { errors, isAuth } = this.props.auth;
    if (authService.isAuthenticated()) {
      debugger
      const { state } = {...this.props.location}
      return <Redirect to={{     pathname: state.from.pathname,
        state: { ...state.from.state }, }} />;
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
export default connect(mapStateToProps, { loginAction, resetErrors })(
  LoginForm
);
