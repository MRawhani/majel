import React from "react";
import Slider from "react-slick";

import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MyButton from "./MyButton";

export default props => {
  const classes  = props.useStyles;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500
  };
  return (
    <div className="carrousel_wrapper">
      <Slider {...settings}>
        {props.imagesList.map((image, i) => {
          return (
            <div style={{ position: "relative" }} key={i}>
              <div
                className="backgrund_image carrousel_image"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/images/jeans/${image.bigImage})`,
                  height: `${window.innerHeight}px`
                }}
              ></div>
              <div className="home_container wrapper">
                <div className="home-base">
                  <div className="home_title tag">دائماً جديد</div>
                  <MyButton
                    color="primary"
                    size="large"
                    className={`bg-primary ${classes.button} fontFamily white-color`}
                    startIcon={<ShoppingCart />}
                    label={"تسوق"}
                    linkTo={"/login"}
                  />
                </div>
                <div className="home_content align-self-end">
                  <div className="home_items">
                    <div className="product_tag d-flex flex-column align-items-center justify-content-center">
                      <div className="price-box">
                        <div>يبدأ من</div>
                        <div>
                          1999 <span></span>
                        </div>
                        <span className="coin-sign">YRE</span>
                      </div>
                    </div>
                    <a href="product.html">
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${process.env.PUBLIC_URL}/images/jeans/${image.small})`
                        }}
                      ></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
