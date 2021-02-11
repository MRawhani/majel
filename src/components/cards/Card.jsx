import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyButtonGroup from "../helpers/MyButtonGroup";

import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { parse } from "@fortawesome/fontawesome";

export default class Card extends Component {
  renderImage = images => {
    if (images&& images.length > 0) {
      return images[0];
    } else {
      return `${process.env.PUBLIC_URL}/images/image_not_available.png`;
    }
  };
  render() {
    const props = this.props;
    return (
      <div class="product-card">
      <div class="badge">{props.categoryName.name}</div>
      <div class="product-tumb">
        <img src={`${this.renderImage(props.photos)}`} alt="" />
      </div>
      <div class="product-details">
        <span class="product-catagory">{props.company.name}</span>
        <h4><Link to={`/productDetails/${props._id}`}>{props.name}</Link></h4>
        <p>{props.description}</p>
       { <div className="icon" href=""><i class="fa fa-thermometer-full"></i></div>}
       {props.hasHalf && <div className="icon" href=""><i class="fa fa-thermometer-half"></i></div>}
        {props.hasQuarter &&<div className="icon" href=""><i class="fa fa-thermometer-quarter"></i></div>}
      {/* { props.hasBig && <div className="icon big" href=""><i class="fa fa-square"></i></div>}
      {props.hasMiddle &&  <div className="icon middle" href=""><i class="fa fa-square"></i></div>}
       {props.hasSmall && <div className="icon small" href=""><i class="fa fa-square"></i></div>} */}

        <div class="product-bottom-details">
          <div class="product-price"><small>{parseInt(props.price)+2000}</small>YR{props.price}</div>
          <div class="product-links">
            <a href=""><i class="fa fa-heart"></i></a>
            <a href=""><i class="fa fa-shopping-cart"></i></a>
          </div>
        </div>
      </div>
    </div>
       );
  }
}
