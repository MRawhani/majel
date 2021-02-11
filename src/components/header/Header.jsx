import React from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import SideDrawer from "../hoc/SideDrawer";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import AccountButtonMenu from "./../helpers/AccountButtonMenu";
import ComponentWithStyles from "../hoc/ComponentWithStyles";
import SearchFeild from "../helpers/SearchFeild";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";

const Header = props => {
  const { cart } = props.auth.username;
  const [drawerOpen, setDrawOpen] = React.useState(null);
  const [SearchOpen, setSearchOpen] = React.useState(null);
  const toggleDrawer = values => {
    setDrawOpen(values);
  };
  const toggleSearch = values => {
    setSearchOpen(!values);
  };
  const isDrawOpen = Boolean(drawerOpen);
  const isSearchOpen = Boolean(SearchOpen);
  const menuId = "primary-search-account-menu";
  const classes = props.useStyles();
  const getLink = link => {
    const LinkSelectd = React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={`/${link}`} {...props} />
    ));
    return LinkSelectd;
  };
  return (
    <div className="  ">
      <header className="header container nav-padding">
        <React.Fragment>
          <div className="logo-box">
            <div className="logo">
              <IconButton
                className={classes.smPadding}
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon className={classes.iconSettings} aria-label="Menu" />
              </IconButton>
              {!isSearchOpen && (
                <RouterLink to="/">
                  <div className="d-flex flex-row align-items-center justify-content-start">
                    <div
                      className="title"
                     
                    >
                      {" ماجل"}
                    </div>
                    {/* <IconButton
                      className={classes.smPadding}
                      component={getLink('home')}
                    > */}
                     
                    {/* </IconButton> */}
                  </div>
                </RouterLink>
              )}
            </div>

            <SideDrawer
              open={isDrawOpen}
              onClose={values => toggleDrawer(values)}
              classes={classes}
            />
          </div>

          {isSearchOpen && (
            <ComponentWithStyles
              component={SearchFeild}
              toggleSearch={e => {
                toggleSearch(e);
              }}
              classValue={"displaySearchOnClick"}
            />
          )}
          {!isSearchOpen && (
            <nav className="user-nav">
              <IconButton
                className={classes.smPadding}
                onClick={() => toggleSearch(isSearchOpen)}
              >
                <SearchIcon
                  className={classes.iconSettings}
                  aria-label={menuId}
                />
              </IconButton>
              <Button
                className={classes.smPadding}
                onClick={() => toggleDrawer(true)}
              >
              تسجيل شركة
              </Button>
              <ComponentWithStyles
                classValue={"displayOnMedium"}
                {...props}
                component={AccountButtonMenu}
              />
            </nav>
          )}
        </React.Fragment>
      </header>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Header);
