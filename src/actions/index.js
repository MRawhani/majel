import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GENERAL_SUCCESS,
  GENERAL_FAILURE,

  GENERAL_INIT,
  RESET_ERRORS,
  LOGOUT,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_ERROR,
  GET_BRANDS_FAILURE,
  GET_BRANDS_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCTS_TO_SHOP_SUCCESS,
  GET_PRODUCTS_TO_SHOP_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_BRANDS_FAILURE,
  ADD_BRANDS_SUCCESS,
  ADD_CATEGORIES_FAILURE,
  ADD_CATEGORIES_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_SUCCESS,
  CLEAR_PRODUCT
} from "./types";
import axios from "axios";
import authService from "./../services/auth-service";
import axiosService from "../services/axios-service";

const axiosInstance = axiosService.getInstance();
const apiUrl = "http://localhost:3002/api/v1";

const returnError = (err) => {
  return err.response
    ? err.response.data.errors
      ? err.response.data.errors.length >0?err.response.data.errors:[{message:"خطأ غير معروف"}]
      : [{ message: err.message }]
    : [{ message: err.message }];
};
///////general
export const getGeneral = () => (dispatch) => {
  dispatch({ type: GENERAL_INIT });
console.log(apiUrl);
  return axiosInstance
    .get(`${apiUrl}/general`)
    .then((res) => {
      dispatch({
        type: GENERAL_SUCCESS,
        payload: res.data,
      });
     return res.data
    })
    .catch((err) => {
      dispatch({
        type: GENERAL_FAILURE,
        payload: returnError(err),
      });
     
    });
};
export const loginAction = data => dispatch => {
  axios
    .post(`${apiUrl}/customers/login`, data)
    .then(res => {
      authService.saveToken(res.data.token);
      dispatch(loginSuccess());
    })
    .catch(err => {
      console.log(err);
      debugger;

      dispatch(loginfailure(returnError(err)));
    });
};
export const checkAuth = () => dispatch => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
};
const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    payload: username
  };
};
const loginfailure = errors => {
  return {
    type: LOGIN_FAILURE,
    payload: errors
  };
};
export const registerAction = data => dispatch => {
  axios
    .post(`${apiUrl}/customers/register`, data)
    .then(res => {
      authService.saveToken(res.data.token);
      dispatch(loginSuccess());
    })
    .catch(err => {
      console.log(err);
      debugger;

      dispatch(loginfailure(returnError(err)));
    });
};
export const logout = () => {
  authService.removeToken();
  return {
    type: LOGOUT
  };
};

export const resetErrors = () => {
  return { type: RESET_ERRORS };
};

//get products by sel and arrival
//get-products?
export const getProducts = type => dispatch => {
  const getBy = type.toLowerCase() === "sell" ? "sold" : "createdAt";
  const reducerType =
    getBy === "sold" ? GET_PRODUCTS_BY_SELL : GET_PRODUCTS_BY_ARRIVAL;
  axios
    .get(`${apiUrl}/products/get-products?sortBy=${getBy}&order=desc&limit=4`)
    .then(res => {
      dispatch({ type: reducerType, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PRODUCTS_ERROR, payload: err }));
};
export const getBrands = () => dispatch => {
  return axios
    .get(`${apiUrl}/brands/get-brands`)
    .then(res => {
      dispatch({ type: GET_BRANDS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_BRANDS_FAILURE, payload: err });
      return Promise.reject(err);
    });
};
export const getCategories = () => dispatch => {
  return axios
    .get(`${apiUrl}/categories`)
    .then(res => {
      dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_CATEGORIES_FAILURE, payload: err });
      return Promise.reject(returnError(err));
    });
};
export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  previousState
) => dispatch => {
  console.log(previousState);
  const data = {
    skip,
    limit,
    filters
  };
  debugger
  return axios
    .post(`${apiUrl}/products/getAll`, data)
    .then(res => {
      let newState = [...previousState, ...res.data.data.products];
      dispatch({
        type: GET_PRODUCTS_TO_SHOP_SUCCESS,
        payload: { size: res.data.data.size, articles: newState }
      });
      return Promise.resolve(res.data.data.products);
    })
    .catch(err =>
      dispatch({ type: GET_PRODUCTS_TO_SHOP_FAILURE, payload: returnError(err) })
    );
};
export const addProduct = data => dispatch => {
  return axiosInstance
    .post(`${apiUrl}/products/create-product`, data)
    .then(res => {
      debugger;
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
      return res.data;
    })
    .catch(err => {
      debugger;
      dispatch({
        type: ADD_PRODUCT_FAILURE,
        payload: err.response.data.errors || err
      });
      return Promise.reject(err);
    });
};
export const addBrand = (data, existingBrands) => dispatch => {
  return axiosInstance
    .post(`${apiUrl}/brands/create-brand`, data)
    .then(res => {
      debugger;
      let newState = [...existingBrands, res.data.savedBrand];
      dispatch({
        type: ADD_BRANDS_SUCCESS,
        payload: newState
      });
      return Promise.resolve(newState);
    })
    .catch(err => {
      debugger;
      dispatch({
        type: ADD_BRANDS_FAILURE,
        payload: err.response ? err.response.data.errors : err
      });
      return Promise.reject(err);
    });
};
export const addCategory = (data, existingBrands) => dispatch => {
  return axiosInstance
    .post(`${apiUrl}/categories/create-category`, data)
    .then(res => {
      debugger;
      let newState = [...existingBrands, res.data.savedcategory];
      dispatch({
        type: ADD_CATEGORIES_SUCCESS,
        payload: newState
      });
      return Promise.resolve(newState);
    })
    .catch(err => {
      debugger;
      dispatch({
        type: ADD_CATEGORIES_FAILURE,
        payload: err.response ? err : err
      });
      return Promise.reject(err);
    });
};
export const uploadImage = image => {
  const formData = new FormData();
  formData.append("file", image);
  const config = { header: { "content-type": "multipart/form-data" } };
  return axiosInstance
    .post(`${apiUrl}/products/image-upload`, formData, config)
    .then(json => {
      debugger;
      return json.data;
    })
    .catch(response => {
      debugger;
      Promise.reject(response.response.data.errors[0]);
    });
};

export const getProductByID = id => dispatch => {
  return axios
    .get(`${apiUrl}/products/getById/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT_BY_ID_SUCCESS,
        payload: res.data.foundProduct
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PRODUCT_BY_ID_FAILURE,
        payload: returnError(err)
      });
      return Promise.reject( returnError(err));
    });
};
export const clearProduct = () => dispatch => {
  dispatch({
    type: CLEAR_PRODUCT,
    payload: {}
  });
};


//bookings

export const addBooking = data  => {
  return axiosInstance
    .post(`${apiUrl}/bookings/create-booking`, data)
    .then(res => {
    
      return res;
    })
    .catch(err => {
   
      return Promise.reject(returnError(err));
    });
};

export const getMyBookings = () => {
  return axiosInstance
    .get(`${apiUrl}/customers/getMyBookings`)
    .then(res => {
      return res.data
    })
    .catch(err => {
     
      return Promise.reject(returnError(err));
    });
};
export const cancellBooking = (id) => {
  debugger
  return axiosInstance
    .patch(`${apiUrl}/bookings/editBookingCustomer/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
     
      return Promise.reject(returnError(err));
    });
};