import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductByID, clearProduct } from "../../../actions";
import PageTop from "../../helpers/PageTop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProductInfo from "./ProductInfo";
class ProductDetails extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getProductByID(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.clearProduct();
  }
  bookClick = data => {
    
    console.log(data);
    this.props.history.push({ pathname: "/booking", state: { data } })
  };
  render() {
    const { productDetail } = this.props.products;
    console.log(this.props);
    return (
      <div>
        <PageTop title="تفاصيل العرض" />
        <div className="container">
          {productDetail._id ? (
            <div className="product-detail-wrapper">
              <div className="left">
                <ProductInfo
                  details={productDetail}
                  bookClick={this.bookClick}
                />
              </div>
             
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = { getProductByID, clearProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
