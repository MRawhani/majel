import React, { Component } from "react";

import MyButton from "../helpers/MyButton";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { registerAction, resetErrors,getGeneral } from "./../../actions";

import FormFeild from "./../helpers/Form/FormFeild";
import { ResError } from "../helpers/ResError";
import Form from "./Form";
class RegisterForm extends Form {
  constructor(props) {
    super(props);
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
            placeholder: "اسمك "
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
        },
        address: {
          element: "select",
          value: "",
          config: {
            name: "address",
            type: "select",
            options: []
          },
          validation: {
            required: true,
           
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        phone: {
          element: "input",
          value: "",
          config: {
            name: "phone_input",
            type: "text",
            placeholder: "تلفونك "
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
      }
    };
  }
componentDidMount(){
  this.props.getGeneral().then(e=>{
  let formData = {...this.state.formData}
  formData.address.config.options= e.addresses
    this.setState({
      formData
    })
  })
}
  submitAction = data => {
    console.log(data);
    this.props.registerAction(data);
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
                  <FormFeild
                  id={"address"}
                  formData={this.state.formData.address}
                  change={element => this.updateForm(element)}
                  isError={this.state.formError}
                />
                    <FormFeild
                  id={"phone"}
                  formData={this.state.formData.phone}
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
export default connect(mapStateToProps, { registerAction, resetErrors,getGeneral })(
  RegisterForm
);
