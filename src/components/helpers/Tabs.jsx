import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link, withRouter } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function ScrollableTabsButtonForce(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={`bg-outlined fontFamily white-color`}>
        <Tabs
          value={props.history.location.pathname}
          //  onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          // textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="لوحة التحكم"
            className="fontFamily"
            value="/user/dashboard"
            component={Link}
            to={"/user/dashboard"}
            icon={<DashboardIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label="معلومات حسابي"
            className="fontFamily"
            value="/user/user_profile"
            component={Link}
            to={"/user/user_profile"}
            icon={<PersonPinIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label="سلتي"
            className="fontFamily"
            value="/user/cart"
            component={Link}
            to={"/user/cart"}
            icon={<ShoppingCartIcon />}
            {...a11yProps(2)}
          />
          {props.isAdmin && (
            <Tab
              label="اضافة منتج"
              className="fontFamily"
              value="/user/add-product"
              component={Link}
              to={"/user/add-product"}
              icon={<ShoppingCartIcon />}
              {...a11yProps(2)}
            />
          )}
           {props.isAdmin && (
            <Tab
              label="معلومات الموقع"
              className="fontFamily"
              value="/user/site-info"
              component={Link}
              to={"/user/site-info"}
              icon={<ShoppingCartIcon />}
              {...a11yProps(2)}
            />
          )}
           {props.isAdmin && (
            <Tab
              label="البراندات والأنواع"
              className="fontFamily"
              value="/user/manage-categories"
              component={Link}
              to={"/user/manage-categories"}
              icon={<ShoppingCartIcon />}
              {...a11yProps(2)}
            />
          )}
        </Tabs>
      </AppBar>
    </div>
  );
}
export default withRouter(ScrollableTabsButtonForce);
