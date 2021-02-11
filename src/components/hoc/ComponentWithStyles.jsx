import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  iconSettings: {
    fontSize: "2.5rem",
    color: "#000"
  },
  textSettings: {
    fontSize: "1.3rem",
    color: "#000",
    padding: 0
  },
  noHover: {
    color: "#000",
    "&:hover": { background: "transparent" }
  },
  button: {
    margin: theme.spacing(1),
  },
  smPaddingRight: {
    paddingRight: theme.spacing(0)
  },
  smPadding: { 
    padding: theme.spacing(1)
  },

  menuFont: {
    fontSize: "1rem"
  },
  menuiconWidth: {
    minWidth: "20px"
  },
  root: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingRight: theme.spacing(6),
  },
  setWidth:{
    minWidth:160
  },
  displayOnSmall:{
    [theme.breakpoints.up('md')]: {
      display:"none"
    },
  },
  displayOnMedium:{
    display:"flex",
    [theme.breakpoints.down('sm')]: {
      display:"none"
    },
    
},
displaySearchOnClick:{
  display:"flex",
  transform: 'translateX(0)',
  transition:'all .3s', 
  [theme.breakpoints.down('sm')]: {
    //display:"none"
  }
},
}));
export default (props)=> {
  const {component:Component} = props;
  return (
    <>
    <Component useStyles={useStyles} {...props}/>
    </>
  );
}
