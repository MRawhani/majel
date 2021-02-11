import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardLayout from "../../hoc/DashboardLayout";
import FormFeild from "./../../helpers/Form/FormFeild";
import {
  getBrands,
  getCategories,
  resetErrors,
  addProduct
} from "../../../actions";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFeilds,
  reserFeildData
} from "./../../helpers/Form/FormActions";
import MyButton from "../../helpers/MyButton";
import { ResError } from "../../helpers/ResError";
import FileUpload from "../../helpers/Form/FileUpload";
import authService from "../../../services/auth-service";
class AddProduct extends Component {
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
            label: "اسم المنتج",
            name: "name_input",
            type: "text",
            placeholder: "اسم المنتج"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        description: {
          element: "textarea",
          value: "",
          config: {
            label: "الوصف",
            name: "description_input",
            type: "text",
            placeholder: "الوصف"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        price: {
          element: "input",
          value: "",
          config: {
            label: "السعر",
            name: "price_input",
            type: "number",
            placeholder: "السعر"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        quantity: {
          element: "input",
          value: "",
          config: {
            label: "الكمية",
            name: "quantity_input",
            type: "number",
            placeholder: "الكمية"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        brand: {
          element: "select",
          value: "",
          config: {
            label: "البراند",
            name: "brand_input",
            options: []
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        shipping: {
          element: "select",
          value: "",
          config: {
            label: "التوصيل",
            name: "shipping_input",
            options: [
              { key: true, value: "Yes" },
              { key: false, value: "No" }
            ]
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        available: {
          element: "select",
          value: "",
          config: {
            label: "موجود",
            name: "available_input",
            options: [
              { key: true, value: "Yes" },
              { key: false, value: "No" }
            ]
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        category: {
          element: "select",
          value: "",
          config: {
            label: "النوع",
            name: "category_input",
            options: []
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        publish: {
          element: "select",
          value: "",
          config: {
            label: "نشر",
            name: "publish_input",
            options: [
              { key: true, value: "Public" },
              { key: false, value: "Hidden" }
            ]
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: true
        },
        images: {
          
          value:[],
         
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: "",
          showLabel: false
        }
      }
    };
  }
  updateFeils = newFormData => {
    this.setState({
      formData: newFormData
    });
  };
  componentDidMount() {
    const formData = { ...this.state.formData };
    this.props
      .getBrands()
      .then(res => {
        const newFormData = populateOptionFeilds(
          formData,
          this.props.brands.brands,
          "brand"
        );
        this.updateFeils(newFormData);
      })
      .catch(err => {
        console.log(err);
      });
    this.props
      .getCategories()
      .then(res => {
        const newFormData = populateOptionFeilds(
          formData,
          this.props.brands.categories,
          "category"
        );
        this.updateFeils(newFormData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderFormFeilds = () => {
    const feilds = [
      "name",
      "description",
      "price",
      "quantity",
      "brand",
      "category",
      "shipping",
      "available",
      "publish"
    ];
    return feilds.map((feild, i) => (
      <FormFeild
        key={feild}
        id={feild}
        formData={this.state.formData[feild]}
        change={element => this.updateForm(element)}
        isError={this.state.formError}
      />
    ));
  };
  onSuccess = () => {
    setTimeout(() => {
        //don't forget to reset the redux state after you move
      //window.location = "/";
      this.setState({ formSuccess: false });
    }, 3000);
  };
  emptyErrors = () => {
    //when input change
    const { errors } = this.props.products;
    if (errors && errors.length > 0) {
      this.props.resetErrors();
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "addProduct");
    this.emptyErrors();
    this.setState({
      formError: false,
      formData: newFormData,
      formErrorMessage: ""
    });
  };
  resetFeilds = () => {
    const newFormData = reserFeildData(this.state.formData, "addProduct");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataSubmit = generateData(this.state.formData, "addProduct");
    let formIsValid = isFormValid(this.state.formData, "addProduct");
    if (formIsValid) {
      this.props.addProduct(dataSubmit).then(res => {
        this.resetFeilds();
      });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "اكتب البيانات بشكل صحيح"
      });
    }
  };
  imagesHandler =images=>{

  }
  render() {
    const { errors } = this.props.products;
    const isAdmin = authService.isAdmin() || false;
    return (
      <DashboardLayout>
        <div style={{ flexGrow: "1" }}>
          <form onSubmit={this.submitForm}>
            <FileUpload 
            imagesHandler={(images)=>this.imagesHandler(images)}
            reset={this.state.formSuccess}
            />
            {this.renderFormFeilds()}
            {this.state.formSuccess && (
              <dev className="form_success">
                Success..
                {this.onSuccess()}
              </dev>
            )}
            {this.state.formError && (
              <dev className="error_label">{this.state.formErrorMessage}</dev>
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
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  brands: state.brands,
  products: state.products
});

const mapDispatchToProps = {
  getBrands,
  getCategories,
  resetErrors,
  addProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
