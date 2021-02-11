import React, { Component } from "react";
import { connect } from "react-redux";
import MyButton from "../helpers/MyButton";
import { Redirect } from "react-router-dom";
import { registerAction, resetErrors } from "./../../actions";
import authService from '../../services/auth-service'
import {
  generateData,
  isFormValid,
  update
} from "./../helpers/Form/FormActions";
import FormFeild from "./../helpers/Form/FormFeild";
import { ResError } from "../helpers/ResError";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      formError: false,
      formErrorMessage: "",
      formSuccess: "",
      formData: {
        name: {
          element: "input",
          value: "",
          config: {
            name: "name_input",
            type: "text",
            placeholder: "اسمك الأول"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        lastname: {
          element: "input",
          value: "",
          config: {
            name: "name_input",
            type: "text",
            placeholder: "اسمك الأخير"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
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
        },
        confirmPassword: {
          element: "input",
          value: "",
          config: {
            name: "confirmPassword_input",
            type: "password",
            placeholder: "تأكيد كلمة السر"
          },
          validation: {
            required: true,
            confirm: "password"
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
    const newFormData = update(element, this.state.formData, "register");
    this.emptyErrors();
    this.setState({
      formError: false,
      formData: newFormData,
      formErrorMessage: ""
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataSubmit = generateData(this.state.formData, "register");
    let formIsValid = isFormValid(this.state.formData, "register");
    if (formIsValid) {
      this.props.registerAction(dataSubmit);
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
    if (isAuth) {
      return <Redirect to={{ pathname: "/user/dashboard" }} />;
    }
    return ( 
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="signin_wrapper">
              <form onSubmit={this.submitForm}>
                <FormFeild
                  id={"name"}
                  formData={this.state.formData.name}
                  change={element => this.updateForm(element)}
                  isError={this.state.formError}
                />
                <FormFeild
                  id={"lastname"}
                  formData={this.state.formData.lastname}
                  change={element => this.updateForm(element)}
                  isError={this.state.formError}
                />
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
                <FormFeild
                  id={"confirmPassword"}
                  formData={this.state.formData.confirmPassword}
                  change={element => this.updateForm(element)}
                  isError={this.state.formError}
                />
               
                {this.state.formError &&  <dev className="error_label">
                  this.state.formErrorMessage</dev>}
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
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { registerAction, resetErrors })(
  Register
);
