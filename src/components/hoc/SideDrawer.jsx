import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import ListSubheader from "@material-ui/core/ListSubheader";
import ArrowBack from "@material-ui/icons/ArrowBack";

import IconButton from "@material-ui/core/IconButton";
  
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountButtonMenu from "./../helpers/AccountButtonMenu";
import ComponentWithStyles from "./ComponentWithStyles";
import SearchFeild from "../helpers/SearchFeild";
export default props => {
  const scrollToElement = element => {};
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={props.open}
        size={'small'}
        onClose={() => props.onClose(false)}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              رجوع
              <IconButton onClick={() => props.onClose(false)}>
        
                <ArrowBack />
              </IconButton>
            </ListSubheader>
          }
          className={props.classes.root}
        >
          <ComponentWithStyles
            component={SearchFeild}
            classValue={'drawer'}
          />
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <div className={props.classes.setWidth}>
              <p>جميع المنتجات</p>
            </div>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <div>
              {" "}
              <p>إعدادات</p>
            </div>
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <div>من نحن</div>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={props.classes.nested}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <div>تواصل</div>
              </ListItem>
            </List>
          </Collapse>
          <ComponentWithStyles
            classValue={"displayOnSmall"}
            {...props}
            component={AccountButtonMenu}
          />
        </List>
        {/* <List component="nav" className="font-medium">
        
          <ListItem button onClick={() => scrollToElement("header")}>
            موعد الفعالية
          </ListItem>
          <ListItem button onClick={() => scrollToElement("info")}>
            معلومات عن الفعالية
          </ListItem>
          <ListItem button onClick={() => scrollToElement("highlights")}>
            نبذه عن الفعالية
          </ListItem>
          <ListItem button onClick={() => scrollToElement("pricing")}>
            قدم للحضور
          </ListItem>
          <ListItem button onClick={() => scrollToElement("location")}>
            المكان
          </ListItem>
        </List> */}
      </Drawer>
    </div>
  );
};
