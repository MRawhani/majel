import React from "react";
import { connect } from "react-redux";
import DashboardLayout from "../hoc/DashboardLayout";
import MyButton from "../helpers/MyButton";
import MyButtonGroup from "../helpers/MyButtonGroup";
import { getMyBookings, cancellBooking } from "../../actions";

function UserDashboard(props) {
  const [bookings, setbookings] = React.useState([]);
  const [refresh, setrefresh] = React.useState(0);
  React.useEffect(() => {
    getMyBookings().then((e) => {
      setbookings(e.bookingsFound);
      console.log(e.bookingsFound);
    });
  }, [refresh]);
  const cancel = (id) => {
    cancellBooking(id).then((e) => {
      setrefresh(refresh + 1);
    });
  };
  const { name, lastname, email, cart, history } = props.auth.username;
  return (
    <DashboardLayout>
      <div className="user_nfo">
        <div className="user_nfo_panel">
          <h1>معلومات المستخدم</h1>
          <div>
            <span>{name}</span>
            <span>{lastname}</span>
            <span>{email}</span>
          </div>
          <MyButton
            size="large"
            className={`bg-primary fontFamily white-color`}
            label={"تعديل المعلومات"}
            linkTo={"/user/user_profile"}
            styles={{ marginTop: "15px" }}
          />
        </div>
        <div className="user_nfo_panel">
          <h1>جدول المشتروات</h1>
          <div className="user_product_block_wrapper">
            {bookings.map(
              (e, i) =>
                !e.cancelled && (
                  <div key={i} className="bookingBox">
                    <h1 className="bookingBox__product">
                      {e.product && e.product.name}
                    </h1>
                    <h4 className="bookingBox__qty">{e.quantity}</h4>
                    <MyButton
                      size="small"
                      className={`bg-primary fontFamily white-color`}
                      label={"الغاء "}
                      styles={{ marginTop: "0px", boxShadow: "none" }}
                      onClick={() => cancel(e._id)}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
const mapsStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapsStateToProps)(UserDashboard);
