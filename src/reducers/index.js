import thunk from "redux-thunk";

import { authReducer } from "./auth-reducer";
import {productReducer} from './product-reducer'
import {brandReducer} from './brands-reducer'
import { generalReducer } from "./global-reducer";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";

export const init = () => {
  const reducers = combineReducers({
    auth: authReducer,
    products: productReducer,
    brands: brandReducer,
    general:generalReducer,

  });

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
  return store;
};
