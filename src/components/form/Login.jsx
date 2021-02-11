import React, { Component } from "react";
import MyButton from "../helpers/MyButton";
import LoginForm from "./LoginForm";

export default class login extends Component {
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="right">
              <h1>زبون جديد</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora ratione eligendi, ducimus obcaecati cum corrupti sit.
                Veniam quis sapiente error exercitationem vitae. Quis molestiae
                repudiandae minima, eum at id quasi!
              </p>
              <MyButton
                size="large"
                className={`bg-primary fontFamily white-color`}
                label={"تسجيل جديد"}
                linkTo={"/register"}
                styles={{ marginTop: "15px" }}
              />
            </div>
            <div className="left">
              <h1>مسجلين</h1>
              <p>اذا كنت مسجل ادخل البيانات</p>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
