import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import ShoppingBasketOutlined from "@material-ui/icons/ShoppingBasketOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    fontSize: "10px"
  }
}));

export default function MyButtonGroup({
  color,
  size,
  linkTo,
  className,
  startIcon: StartIcon,
  label,
  styles,
  onClick,
  variant
}) {
  const classes = useStyles();
  const Link1 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={linkTo} {...props} />
  ));
  return (
    <div className={classes.root} style={{ display: "flex", width: "100%" }}>
      <Button
        component={Link1}
        color={color}
        className="bg-outlined-btn fontFamily"
        style={{ flex: "1", width: "75%" }}
        variant="outlined"
      >
        {label}
      </Button>
      {/* <Fab
        color={color}
        className={className}
        aria-label="cart"
        size="small"
        onClick={onClick}
      >
        <ShoppingBasketOutlined style={{ fontSize: 30 }} />
      </Fab> */}
    </div>
  );
}
