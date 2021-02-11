import React, { Component } from "react";
import { connect } from "react-redux";
import PageTop from "../helpers/PageTop";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import { getGeneral, getCategories, getProductsToShop } from "./../../actions";
import CollapseCheckbox from "../helpers/CollapseCheckbox";
import LoadMoreCards from "./LoadMoreCards";
import ModalOfBoxes from "./ModalOfBoxes";

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      price: [
        { _id: 1, name: "الكل", array: [] },
        { _id: 2, name: "من 0 الى 5000", array: [0, 5000] },
        { _id: 3, name: "من 5000 الى 10000", array: [5000, 10000] },
        { _id: 4, name: "من 10000 الى 15000", array: [10000, 15000] },
        { _id: 5, name: "15000 فأكثر", array: [15000, 500000] }
      ],
      filters: {
        
        categoryName: [],
        address: [],
        price: []
      },
      grid: "",
      limit: 6,
      skip: 0,
      modalState: false
    };
  }
  componentDidMount() {
  this.props.getGeneral()
    this.props.getCategories();
    this.callProductsToShop(false);
    debugger

    if(this.props.match.params.cat){
      const filters = {...this.state.filters}
      filters.categoryName.push(this.props.match.params.cat)
      this.setState({
        filters
      })
    }
  }
  // here we are comining 3 calls, one when the filter changes we pass with skip=0 and reset skip to zero
  // two in the beginning with default state skip
  // three when load more> we add limit to the skip and update the new value of skip
  callProductsToShop = (isChanged, isLoadedMore) => {
    const { limit, skip, filters } = { ...this.state };
    const skipMore = !isLoadedMore ? skip : skip + limit;
    this.props
      .getProductsToShop(
        isChanged ? 0 : skipMore,
        limit,
        filters,
        isLoadedMore ? this.props.products.toShop : []
      )
      .then(res => {
        isChanged && this.setState({ skip: 0 });
        isLoadedMore && this.setState({ skip: skipMore });
      });
  };
  handlePrices = value => {
    const data = [...this.state.price];
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };
  handleFilters = (filters, type) => {
    const newFilters = { ...this.state.filters };

    if (type === "price") {
      let priceValue = this.handlePrices(filters);
      newFilters[type] = priceValue;
    } else {
      newFilters[type] = filters;
    }
    this.setState(
      {
        filters: newFilters
      },
      () => this.callProductsToShop(true)
    );
  };
  loadMoreAction = () => {
    this.callProductsToShop(false, true);
  };
  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };
  handleModal = modalState => {
    this.setState({
      modalState
    });
  };

  rednerModal = () => {
    if (this.state.modalState) {
      return (
        <ModalOfBoxes
          open={true}
          handleClose={state => this.handleModal(state)}
        >
          {this.renderFilterOptions()}
        </ModalOfBoxes>
      );
    }
  };
  renderFilterOptions = () => {
    return (
      <React.Fragment>
      
        <CollapseCheckbox
          title="العناوين"
          address={true}
          initState={false}
          list={this.props.general.addresses}
          handleFilters={filters => {
            this.handleFilters(filters, "address");
          }}
        />
        <CollapseCheckbox
          title="النوع"
          initState={true}
          list={this.props.brands.categories}
          handleFilters={filters => {
            this.handleFilters(filters, "categoryName");
          }}
        />
        <CollapseCheckbox
          title="السعر"
          initState={true}
          price={true}
          list={this.state.price}
          handleFilters={filters => {
            this.handleFilters(filters, "price");
          }}
        />
      </React.Fragment>
    );
  };
  render() {
    console.log(this.state.skip);
    return (
      <div className=" ">
        <PageTop title="تصفح المنتجات" />
        <div className="container">
          <div className="shop_wrapper">
            {this.rednerModal()}
            <div className="right">{this.renderFilterOptions()}</div>
            <div className="left">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrid}
                  >
                    <ViewColumnIcon />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrid}
                  >
                    <ViewCompactIcon />
                  </div>
                  {/* <div
                    className={`grid_btn filter_icon`}
                    onClick={this.handleGrid}
                  >
                    <FilterListIcon />
                  </div> */}
                  <IconButton
                    className={`grid_btn filter_icon`}
                    onClick={() => {
                      this.handleModal(true);
                    }}
                  >
                    <FilterListIcon />
                  </IconButton>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.products.toShopSize}
                  products={this.props.products.toShop}
                  loadMore={this.loadMoreAction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  brands: state.brands,
  general: state.general

});

const mapDispatchToProps = {
  
  getProductsToShop,
  getCategories,
  getGeneral
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
