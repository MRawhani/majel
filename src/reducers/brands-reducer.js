import {
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAILURE,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  ADD_BRANDS_FAILURE,
  ADD_BRANDS_SUCCESS,
  ADD_CATEGORIES_FAILURE,
  ADD_CATEGORIES_SUCCESS
} from "./../actions/types";
let INITIAL_STATE = {
  brands: [],
  categories: [],
  errors: {}
};
export const brandReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BRANDS_SUCCESS:
      return { ...state, brands: action.payload };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case ADD_BRANDS_SUCCESS:
      return { ...state, brands: action.payload };
    case ADD_BRANDS_FAILURE:
      return { ...state, errors: action.payload };
    case ADD_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case ADD_CATEGORIES_FAILURE:
      return { ...state, errors: action.payload };
    case GET_CATEGORIES_FAILURE:
      return { ...state, errors: action.payload };
    case GET_BRANDS_FAILURE:
      return { ...state, errors: action.payload };

    default:
      return state;
  }
};
