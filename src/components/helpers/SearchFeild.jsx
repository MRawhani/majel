import React from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
function SearchFeild(props) {
  const classes = props.useStyles();
  const [SearchOpen, setSearchOpen] = React.useState(null);

  const renserSearch = (
    <form
      action="#"
      className={`search ${
        props.classValue === "displaySearchOnClick"
          ? classes.displaySearchOnClick
          : ""
      }`}
    >
      <input
        type="text"
        className="search__input"
        placeholder="Search Hotels"
        tabIndex="0"
      />

      <IconButton
        className={`${classes.smPadding} search__button`}
        onClick={
          props.classValue === "drawer"
            ? () => {
                console.log("searched");
              }
            : () => {
                props.toggleSearch(true);
              }
        }
      >
        <ArrowBack />
      </IconButton>
    </form>
  );
  return <React.Fragment>{renserSearch}</React.Fragment>;
}

export default SearchFeild;
