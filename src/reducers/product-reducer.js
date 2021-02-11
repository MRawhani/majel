import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_TO_SHOP_FAILURE,
  GET_PRODUCTS_TO_SHOP_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  RESET_ERRORS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_SUCCESS,
  CLEAR_PRODUCT
} from "./../actions/types";
let INITIAL_STATE = {
  productsBySell: [],
  productsByArrival: [],
  productAdded: {},
  productDetail: {},
  toShop: [],
  toShopSize: 0,
  errors: {}
};
export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, productsByArrival: action.payload };
    case GET_PRODUCTS_BY_SELL:
      return { ...state, productsBySell: action.payload };
    case GET_PRODUCTS_ERROR:
      return { ...state, errors: action.payload };

    case GET_PRODUCTS_TO_SHOP_SUCCESS:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };

    case GET_PRODUCTS_TO_SHOP_FAILURE:
      return { ...state, errors: action.payload };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, productAdded: action.payload };
    case ADD_PRODUCT_FAILURE:
      return { ...state, errors: action.payload };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, productDetail: action.payload };

    case GET_PRODUCT_BY_ID_FAILURE:
      return { ...state, errors: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, productDetail: action.payload };
    case GET_PRODUCT_BY_ID_FAILURE:
    case RESET_ERRORS:
      return { ...state, errors: {} };

    default:
      return state;
  }
};
