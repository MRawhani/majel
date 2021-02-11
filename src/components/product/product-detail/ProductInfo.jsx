import React from "react";
import { getGeneral } from "../../../actions";
import { connect } from "react-redux";

const ProductInfo = (props) => {
  const [qty, setQty] = React.useState(1);
  const [price, setprice] = React.useState(1);
  const [size, setsize] = React.useState("full");
  const [address, setaddress] = React.useState("");
  const [addressDesc, setaddressDesc] = React.useState("");
 
  const { details, bookClick } = props;

  React.useEffect(() => {
    props.getGeneral();
  }, []);
  const minusQty = (e) => {
    qty > 1 && setQty(qty - 1);
  };
  const plusQty = (e) => {
    qty < 100 && setQty(qty + 1);
  };
  const submitBookingInfo = (e) => {
    e.preventDefault();
    const data = {};
    data.product = details._id;
    data.quantity = qty;
    data.address = address;
    data.addressDesc = addressDesc;
    data.totalPrice = (details.price / price) * qty;
    data.isFull = size === "full";
    data.isQuarter = size === "quarter";
    data.isHalf = size === "half";
    bookClick(data);
    console.log(data);
  };
  const renderImages = (imgs) => (
    <div className="thumbs">
      {imgs.map((v, i) => (
        <a
          key={i}
          className="thumb-image"
          href="//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_1024x1024.jpg?v=1447104179"
          data-index={1}
        >
          <span>
            <img src={`${v}`} alt="image" />
          </span>
        </a>
      ))}
    </div>
  );
  const renderImage = (images) => {
    if (images && images.length > 0) {
      return images[0];
    } else {
      return `${process.env.PUBLIC_URL}/images/image_not_available.png`;
    }
  };
  console.log(details.brand);
  return (
    <div>
      <section aria-label="Main content" role="main" className="product-detail">
        <div itemScope itemType="http://schema.org/Product">
          <meta
            itemProp="url"
            content="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york"
          />
          <meta
            itemProp="image"
            content="//cdn.shopify.com/s/files/1/1047/6452/products/product_grande.png?v=1446769025"
          />
          <div className="shadow">
            <div className="_cont detail-top">
              <div className="cols">
                <div className="left-col">
                  {renderImages(details.photos)}
                  <div className="big">
                    <span
                      id="big-image"
                      className="img"
                      quickbeam="image"
                      style={{
                        backgroundImage: `url(${renderImage(details.photos)})`,
                      }}
                      data-src="//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025"
                    />
                    <div id="banner-gallery" className="swipe">
                      <div className="swipe-wrap">
                        <div
                          style={{
                            backgroundImage: `url(${renderImage(
                              details.photos
                            )})`,
                          }}
                        />
                        <div
                          style={{
                            backgroundImage:
                              'url("//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_large.jpg?v=1447104179")',
                          }}
                        />
                        <div
                          style={{
                            backgroundImage:
                              'url("//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_large.jpg?v=1447104180")',
                          }}
                        />
                        <div
                          style={{
                            backgroundImage:
                              'url("//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_large.jpg?v=1447104182")',
                          }}
                        />
                      </div>
                    </div>
                    <div className="detail-socials">
                      <div
                        className="social-sharing"
                        data-permalink="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york"
                      >
                        <a
                          target="_blank"
                          className="share-facebook"
                          title="Share"
                        />
                        <a
                          target="_blank"
                          className="share-twitter"
                          title="Tweet"
                        />
                        <a
                          target="_blank"
                          className="share-pinterest"
                          title="Pin it"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-col">
                  <h1 itemProp="name">{details.name}</h1>
                  <div
                    itemProp="offers"
                    itemScope
                    itemType="http://schema.org/Offer"
                  >
                    <meta itemProp="priceCurrency" content="YR" />
                    <link
                      itemProp="availability"
                      href="http://schema.org/InStock"
                    />
                    <div className="price-shipping">
                      <div
                        className="price"
                        id="price-preview"
                        quickbeam="price"
                        quickbeam-price={800}
                      >
                        {(details.price / price) * qty + "YR"}
                      </div>
                      <a>توصيل مجاني</a>
                    </div>
                    <div className="swatches">
                      <div className="swatch clearfix" data-option-index={0}>
                        <div className="header">كم العبوة</div>
                        <div
                          data-value="full"
                          className="swatch-element plain l available"
                        >
                          <input
                            id="swatch-0-l"
                            type="radio"
                            onChange={(e) => {
                              setprice(1);
                              setsize(e.target.value);
                            }}
                            name="option-0"
                            defaultChecked
                            defaultValue="full"
                          />
                          <label htmlFor="swatch-0-l">
                            كامل
                            <img
                              className="crossed-out"
                              src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                            />
                          </label>
                        </div>
                        {details.hasHalf && (
                          <div
                            data-value="half"
                            className="swatch-element plain xl available"
                          >
                            <input
                              id="swatch-0-xl"
                              type="radio"
                              onChange={(e) => {
                                setprice(2);
                                setsize(e.target.value);
                              }}
                              name="option-0"
                              defaultValue="half"
                            />
                            <label htmlFor="swatch-0-xl">
                              نصف
                              <img
                                className="crossed-out"
                                src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                              />
                            </label>
                          </div>
                        )}
                        {details.hasQuarter && (
                          <div
                            data-value="quarter"
                            className="swatch-element plain xxl available"
                          >
                            <input
                              id="swatch-0-xxl"
                              type="radio"
                              name="option-0"
                              onChange={(e) => {
                                setprice(4);
                                setsize(e.target.value);
                              }}
                              defaultValue="quarter"
                            />
                            <label htmlFor="swatch-0-xxl">
                              ربع
                              <img
                                className="crossed-out"
                                src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                     
                    </div>
                    {/* <form method="post" enctype="multipart/form-data" id="AddToCartForm"> */}
                    <form id="AddToCartForm">
                      {
                        <select
                          style={{
                            height: "50px",

                            width: "200px",
                            margin: "25px 0",
                          }}
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          className={`form__input 
                           `}
                        >
                          <option value="">اختار عنوان</option>
                          {props.general.addresses &&
                            props.general.addresses.map((option, i) => (
                              <option key={option._id} value={option._id}>
                                {option.street}
                              </option>
                            ))}
                        </select>
                      }
                       <input
   style={{
    height: "50px",

    width: "70%",
    margin: "25px 0",
  }}
  value={addressDesc}
 placeholder="ادخل وصف دقيق للعنوان"
  onChange={event => setaddressDesc(event.target.value)}
  // onChange={event => change({ event, id })}
  className={`form__input `}

/>
                      <div className="btn-and-quantity-wrap">
                        <div className="btn-and-quantity">
                          <div className="spinner">
                            <span
                              className="btn minus"
                              onClick={minusQty}
                              data-id={2721888517}
                            />

                            <input
                              type="hidden"
                              id="product_id"
                              name="product_id"
                              defaultValue={2721888517}
                            />
                            <span className="q">الكمبة.</span>
                            <input
                              type="text"
                              id="updates_2721888517"
                              name="quantity"
                              defaultValue={qty}
                              value={qty}
                              disabled={true}
                              className="quantity-selector"
                            />
                            <span
                              className="btn plus"
                              onClick={plusQty}
                              data-id={2721888517}
                            />
                          </div>
                          <div
                            id="AddToCart"
                            quickbeam="add-to-cart"
                            onClick={submitBookingInfo}
                          >
                            <span id="AddToCartText">قم بالطلب</span>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="tabs">
                      <div className="tab-labels">
                        <span data-id={1} className="active">
                          Info
                        </span>
                        <span data-id={2}>Brand</span>
                      </div>
                      <div className="tab-slides">
                        <div
                          id="tab-slide-1"
                          itemProp="description"
                          className="slide active"
                        >
                          We open source it for you
                          https://github.com/greenwoodents/quickbeam.js if you
                          want to use it on your ecommerce.
                        </div>
                        <div id="tab-slide-2" className="slide">
                          Tony Hunfinger
                        </div>
                      </div>
                    </div>
                    <div className="social-sharing-btn-wrapper">
                      <span id="social_sharing_btn">Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="related">
            <div className="_cont">
              <h2>You might also like</h2>
              <div
                className="collection-list cols-4"
                id="collection-list"
                data-products-per-page={4}
              ></div>
              <div className="more-products" id="more-products-wrap">
                <span id="more-products" data-rows_per_page={1}>
                  More products
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  general: state.general,
});

const mapDispatchToProps = {
  getGeneral,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
