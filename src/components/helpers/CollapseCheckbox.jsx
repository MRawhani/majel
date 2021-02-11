import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLessTwoToneIcon from "@material-ui/icons/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@material-ui/icons/ExpandMoreTwoTone";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default class CollapseCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      checked: [],
      value: "1"
    };
  }
  componentDidMount() {
    console.log(this.props.list);
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleAngle = () =>
    this.state.open ? (
      <ExpandLessTwoToneIcon fontSize="small" />
    ) : (
      <ExpandMoreTwoToneIcon fontSize="small" />
    );
  renderList = () => {
    if (this.props.list) {
      return this.props.list.map((value, i) => (
        <ListItem key={value._id} style={{ padding: "10px 0" }}>
          <ListItemText primary={this.props.address?value.street :value.name} className="collapse_element" />
          <ListItemSecondaryAction className="checkBox">
            <Checkbox
              color="primary"
              onChange={() => {
                this.handleCheckedChange(value._id);
              }}
              checked={this.state.checked.indexOf(value._id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ));
    } else {
      return null;
    }
  };
  renderPriceList = () => {
    if (this.props.list) {
      return this.props.list.map((value, i) => (
        <FormControlLabel
          key={value._id}
          value={`${value._id}`}
          control={<Radio />}
          label={value.name}
        />
      ));
    } else {
      return null;
    }
  };

  handleCheckedChange = valueId => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(valueId);
    const nwChecked = [...checked];
    if (currentIndex === -1) {
      nwChecked.push(valueId);
    } else {
      nwChecked.splice(currentIndex, 1);
    }
    console.log(nwChecked);
    this.setState(
      {
        checked: nwChecked
      },
      () => {
        this.props.handleFilters(nwChecked);
      }
    );
  };
  handleRadioChange = e => {
    this.setState({ value: e.target.value }, () =>
      this.props.handleFilters(this.state.value)
    );
  };
  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 0 10px 23px" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {!this.props.price && this.renderList()}
              {this.props.price && (
                <RadioGroup
                  aria-label="prices"
                  name="prices"
                  value={this.state.value}
                  onChange={this.handleRadioChange}
                >
                  {this.renderPriceList()}
                </RadioGroup>
              )}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
