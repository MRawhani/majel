import React, { Component } from "react";
import DashboardLayout from "../../hoc/DashboardLayout";
import ManageBrands from "./ManageBrands";
import ManageCategories from "./ManageCategories";

export default class BrandsSettings extends Component {
  render() {
    return (
      <DashboardLayout>
        <ManageBrands />
       <br/>
        <ManageCategories />
      </DashboardLayout>
    );
  }
}
