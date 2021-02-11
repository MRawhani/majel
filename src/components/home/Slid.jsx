import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MyButton from "../helpers/MyButton";
import ShoppingCart from '@material-ui/icons/ShoppingCart'

const HomeSlider = props => {
 
  const imagesList = [
    {
      bigImage: "video-1.jpg", small: "blog-3.jpg" ,
      lineOne: "دائما جديد",
      lineTwo: "والأفضل",
      linkTitle: "تسوق الان",
      linkTo: "/shop"
    },
    {
      bigImage: "video-2.jpg", small: "service-men-1.png",
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop"
    },
    {
      bigImage: "video-3.jpg", small: "water-glass-1.png",
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop"
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: true
  };

  const generateSlides = () =>
    imagesList
      ? imagesList.map((item, i) => (
          <div key={i} style={{position:'relative'}}>
            <div
              className="featured_image"
              style={{
                background: `url(/images/${item.bigImage})`,
                height: `${window.innerHeight}px`
              }}
            >
              <div
                className="featured_action  container"
                style={{ minHeight: `${window.height}px` }}
              >
                <div className="header_tag">
                  <div className="tag title">{item.lineOne}</div>
                  <div className="tag low_title">{item.lineTwo}</div>
                  <div>
                    <MyButton
                      color="primary"
                      size="large"
                      className={`bg-primary fontFamily white-color`}
                      startIcon={<ShoppingCart />}
                      styles={{ marginTop: "10px" }}
                      label={"تسوق"}
                      linkTo={"/shop"}
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="home_items  container">
              <div className="product_tag d-flex flex-column align-items-center justify-content-center">
                <div className="price-box">
                  <div>يبدأ من</div>
                  <div>
                    1999 <span></span>
                  </div>
                  <span className="coin-sign">YRE</span>
                </div>
              </div>
              <Link to="/">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/${item.small})`
                  }}
                ></div>
              </Link>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
