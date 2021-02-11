import React, { Component } from "react";
import { connect } from "react-redux";

import PromotionSection from "./PromotionSection";
import ComponentWithStyles from "../hoc/ComponentWithStyles";
import { getGeneral,getCategories } from "./../../actions";
import HomeSlider from "./Slid";
import Card_Block from "../cards/CardBlock";

class Home extends Component {
  constructor() {
    super();

    this.imagesList = [
      { bigImage: "video-1.jpg", small: "testimonial-1.png" },
      { bigImage: "video-2jpg", small: "service-men-1.png" },
      { bigImage: "video-3.jpg", small: "water-glass-1.png" }
    ];
  }
  componentDidMount(){
    this.props.getCategories()

      this.props.getGeneral()
  
  }

  render() {
    return (
      <div className="">
        <ComponentWithStyles
          imagesList={this.imagesList}
          component={HomeSlider}
        />
        <Card_Block 
         list={this.props.brands}
         title='اصناف المياة المتوفرى'
         cat={true}
        />
        <PromotionSection />
        {/* <Card_Block 
         list={this.props.products.productsByArrival}
         title='الواصلات حديثاً'
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({brands: state.brands.categories});

const mapDispatchToProps = {getCategories,getGeneral};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
