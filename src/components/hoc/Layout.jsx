import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../header/Header";
import ComponentWithStyles from "./ComponentWithStyles";
import {checkAuth} from "./../../actions";
class Layout extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  render() {
    return (
      <div>
        <ComponentWithStyles component={Header} />
        <div className="">{this.props.children}</div>
       <footer style={{
         textAlign:'center',
         padding:'20px',
         marginTop:'20px',
         borderTop:'1px solid #ccc'
       }}>&copy;</footer>
      </div>
    );
  }
}
export default connect(null, { checkAuth })(Layout);
