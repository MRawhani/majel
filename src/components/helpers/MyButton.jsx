import React from "react";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default function MyButton({
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
  const Link1 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={linkTo} {...props} />
  ));
  return (
    
    <Button
      component={Link1}
      variant={variant? variant : "contained"}
      color={color}
      size={size}
      className={className}
      startIcon={StartIcon}
      style={styles}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
