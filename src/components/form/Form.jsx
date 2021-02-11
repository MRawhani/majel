import React, { Component } from "react";

import {
  generateData,
  isFormValid,
  update
} from "./../helpers/Form/FormActions";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      formErrorMessage: "",
      formSuccess: "",
      formData: { }
    };
  }

  emptyErrors = () => {
    //when input change
    const { errors } = this.props.auth;
    if (errors && errors.length > 0) {
      this.props.resetErrors();
    }
  };
  updateForm = (element,formType) => {
    const newFormData = update(element, this.state.formData, formType);
    this.emptyErrors();
    this.setState({
      formError: false,
      formData: newFormData,
      formErrorMessage: ""
    });
  };
  submitForm = (e,formType) => {
    debugger
    e.preventDefault();
    let dataSubmit = generateData(this.state.formData, formType);
    let formIsValid = isFormValid(this.state.formData, formType);
    if (formIsValid) {
     this.submitAction(dataSubmit)
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "اكتب البيانات بشكل صحيح"
      });
    }
  };

}
