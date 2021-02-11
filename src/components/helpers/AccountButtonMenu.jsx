import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link as RouterLink } from "react-router-dom";

function AccountButtonMenu(props) {
  const { isAuth, username } = props.auth;
  const classes = props.useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [SearchOpen, setSearchOpen] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isSearchOpen = Boolean(SearchOpen);

  const getLink = link => {
    const LinkSelectd = React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={`/${link}`} {...props} />
    ));
    return LinkSelectd;
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenuArrayBeforeLogin = [
    { label: "تسجيل الدخول", link: "login",icon:<AccountCircle fontSize="small"/> },
    { label: "تسجيل جديد", link: "register", icon:<AccountCircle fontSize="small"/>}
  ];
  const renderMenuArrayafterLogin = [
    { label: "لوحة التحكم", link: "user/dashboard" ,icon:<DashboardIcon fontSize="small"/>},
    { label: "حسابي", link: "user/user_profile",icon:<AccountCircle fontSize="small"/> },
    { label: "خروج", link: "user/logout",icon:<AccountCircle fontSize="small"/> }
  ];

  const renderMenuArray = isAuth ? renderMenuArrayafterLogin:renderMenuArrayBeforeLogin;
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      nchororigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {renderMenuArray.map((item, i) => (
        <MenuItem
        key={i}
          component={getLink(item.link)}
          className={classes.menuFont}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>

          <Typography variant="inherit">{item.label}</Typography>
        </MenuItem>
      ))}

     
    </Menu>
  );
  return (
    <React.Fragment>
      <MenuItem
        onClick={e => {
          handleProfileMenuOpen(e);
        }}
        className={` ${
          props.classValue === "displayOnMedium"
            ? classes.displayOnMedium
            : classes.displayOnSmall
        }`}
      >
        <IconButton
          className={classes.smPadding}
          aria-label="account of current user"
          aria-controls={"menuId"}
          aria-haspopup="true"
          className={
            props.classValue === "displayOnMedium"
              ? classes.noHover
              : classes.smPaddingRight
          }
          onClick={e => {
            handleProfileMenuOpen(e);
          }}
        >
          <AccountCircle />
        </IconButton>
        <span
          className={
            props.classValue === "displayOnMedium" ? classes.textSettings : ""
          }
        >
          {isAuth ? username.name.split(' '): "تسجيل"}
        </span>
      </MenuItem>
      {renderMenu}
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(AccountButtonMenu);
