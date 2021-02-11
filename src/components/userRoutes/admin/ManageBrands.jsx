import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardLayout from "../../hoc/DashboardLayout";
import FormFeild from "./../../helpers/Form/FormFeild";
import { getBrands, addBrand } from "../../../actions";
import {
  update,
  generateData,
  isFormValid,
  reserFeildData
} from "./../../helpers/Form/FormActions";
import MyButton from "../../helpers/MyButton";
import { ResError } from "../../helpers/ResError";

export class ManageBrands extends Component {
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
            name: "brand_input",
            type: "text",
            placeholder: "ادخل الماركة"
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
  showBrands = () =>
    this.props.brands.brands
      ? this.props.brands.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  componentDidMount() {
    this.props.getBrands();
  }
  emptyErrors = () => {
    //when input change
    const { errors } = this.props.brands;
    if (errors && errors.length > 0) {
      // this.props.resetErrors();
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "brands");
    this.emptyErrors();
    this.setState({
      formError: false,
      formData: newFormData,
      formErrorMessage: ""
    });
  };
  resetFeilds = () => {
    const newFormData = reserFeildData(this.state.formData, "brands");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataSubmit = generateData(this.state.formData, "brands");
    let formIsValid = isFormValid(this.state.formData, "brands");
    if (formIsValid) {
      this.props.addBrand(dataSubmit, this.props.brands.brands).then(res => {
        this.setState({ formSuccess: true });
      });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "اكتب البيانات بشكل صحيح"
      });
    }
  };
  onSuccess = () => {
    setTimeout(() => {
      //don't forget to reset the redux state after you move
      //window.location = "/";
      this.setState({ formSuccess: false });
    }, 3000);
  };
  render() {
    const { errors } = this.props.brands;
    return (
      <div className="admin_category_wrapper">
        <h1></h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showBrands()}</div>
          </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <FormFeild
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
                isError={this.state.formError}
              />
              {this.state.formSuccess && (
                <div className="form_success">
                  Success..
                  {this.onSuccess()}
                </div>
              )}
              {this.state.formError && (
                <div className="error_label">{this.state.formErrorMessage}</div>
              )}
              <ResError errors={errors} />
              <MyButton
                size="small"
                className={`bg-primary fontFamily white-color`}
                label={"حفظ "}
                styles={{ marginTop: "15px" }}
                onClick={this.submitForm}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  brands: state.brands
});

const mapDispatchToProps = { getBrands, addBrand };

export default connect(mapStateToProps, mapDispatchToProps)(ManageBrands);
