import React, { Component } from "react";
import MyButtonGroup from "../helpers/MyButtonGroup";

import ShoppingCart from "@material-ui/icons/ShoppingCart";

export default class Card extends Component {
  renderImage = image => {
    if (image) {
      return image;
    } else {
      return `${process.env.PUBLIC_URL}/images/image_not_available.png`;
    }
  };
  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image-card"
          style={{
            background: `url(${this.renderImage(props.photo)}) no-repeat`
          }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.name}</div>
         
          </div>

          {props.grid ? (
            <div className="description">{props.description}</div>
          ) : null}
          <div className="actions">
            <MyButtonGroup
              color="primary"
              size="small"
              variant="outlined"
              className={`bg-primary  fontFamily white-color`}
             
              label={"اطلب الان"}
              linkTo={`/shop/${props._id}`}
              onClick={() => {
                console.log("clicked");
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
