import React from "react";
import PageTop from "../../helpers/PageTop";
import { connect } from "react-redux";
import { getProductByID, clearProduct, getGeneral } from "../../../actions";
import { Chip } from "@material-ui/core";
import { addBooking } from "../../../actions";
import { faClosedCaptioning } from "@fortawesome/fontawesome-free-solid";

function BookingPage(props) {
  const [bookingData, setbookingData] = React.useState({});
  const [success, setsuccess] = React.useState(false);
  const [error, seterror] = React.useState(false);
  const [message, setmessage] = React.useState("");
  const [disabledBtn, setdisabledBtn] = React.useState(false);

  React.useEffect(() => {
    const state = props.location.state;
    debugger;
    if (state && state.data) {
      props.getProductByID(state.data.product);
      props.getGeneral();
      setbookingData(state.data);
    } else {
      debugger;
      props.history.push("/shop");
    }
  }, []);
  const sendBooking = () => {
    console.log(bookingData);
    setdisabledBtn(true);

    addBooking(bookingData)
      .then((e) => {
        setsuccess(true);
        seterror(false);
        setdisabledBtn(false);

        setmessage("تم الحجز");
        setTimeout(() => {
          props.history.push(`/productDetails/${bookingData.product}`);
        }, 2000);
      })
      .catch((er) => {
        setsuccess(false);
        setdisabledBtn(false);

        seterror(true);
        console.error(er);
        setmessage(er[0].message);
      });
  };
  const { productDetail } = props.products;

  return (
    <div>
      <PageTop title="حجز طلب " />
      <div className="container">
        {error && (
          <div
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            {message}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "green",
              color: "#fff",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            {message}
          </div>
        )}
        <h1>تفاصيل الطلب</h1>
        <div className="shopping-cart">
          <div className="column-labels">
            <label className="cart-image">Image</label>
            <label className="cart-details">cart</label>
            <label className="cart-price">السعر</label>
            <label className="cart-quantity">Quantity</label>
            <label className="cart-removal">الكمية</label>
            <label className="cart-line-price">المجموع</label>
          </div>
          {productDetail._id && (
            <div className="cart">
              <div className="cart-image">
                <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
              </div>
              <div className="cart-details">
                <div className="cart-title">{productDetail.name}</div>
                <p className="cart-description">{productDetail.description}</p>
              </div>
              <div className="cart-price">{productDetail.price + " ريال"}</div>
              <div className="cart-quantity">
                <Chip label={bookingData.quantity} color="primary" />
              </div>
              <div className="cart-removal">
                <Chip
                  variant="outlined"
                  color="secondary"
                  label={
                    bookingData.isQuarter
                      ? "ربع عبوة"
                      : bookingData.isHalf
                      ? "نصف عبوة"
                      : "عبوة كاملة"
                  }
                />
              </div>
              <div className="cart-line-price">
                <Chip
                  label={bookingData.totalPrice + " ريال"}
                  variant="outlined"
                  color="primary"
                />
              </div>
            </div>
          )}
          <div className="totals">
            <div className="totals-item">
              <label>العنوان</label>
              <div className="totals-value" id="cart-subtotal">
                {props.general.addresses &&
                  props.general.addresses.find(
                    (e) => e._id === bookingData.address
                  ).street}
              </div>
            </div>
            <div className="totals-item">
              <label>تفصيل العنوان</label>
              <div className="totals-value" id="cart-tax">
               {bookingData.addressDesc}
              </div>
            </div>
          
            
          </div>
          <button
            disabled={disabledBtn}
            onClick={sendBooking}
            className="checkout"
          >
            {disabledBtn ? "..." : "اكمال"}
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
  general: state.general,
});

const mapDispatchToProps = { getProductByID, clearProduct, getGeneral };

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
