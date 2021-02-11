import React from "react";
import ScrollableTabsButtonForce from "../helpers/Tabs";
import  authService from "./../../services/auth-service";

const DashboardLayout = props => {
  const isAdmin = authService.isAdmin();
  return (
    <div className="wrapper">
      <ScrollableTabsButtonForce isAdmin={isAdmin}/>
        {console.log(props)}
      <div className="user_container">{props.children}</div>
    </div>
  );
};
export default DashboardLayout;
