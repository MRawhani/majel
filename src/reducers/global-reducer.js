import {
  GENERAL_FAILURE,
  GENERAL_INIT,
  GENERAL_SUCCESS,
} from "../actions/types";
let INITIAL_STATE = {
  loading: false,
  error: false,
};
export const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GENERAL_INIT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GENERAL_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case GENERAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,

        ...action.payload,
      };

    default:
      return state;
  }
};
