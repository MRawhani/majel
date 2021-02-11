import React from "react";

import BookingPage from "./components/product/Bookings/BookingPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/hoc/Layout";
import Home from "./components/home/Home";
import ComponentWithStyles from "./components/hoc/ComponentWithStyles";
import Login from "./components/form/Login";
import Register from "./components/form/Register";

import UserDashboard from "./components/userRoutes/UserDashboard";
import ProfileEdit from "./components/userRoutes/ProfileEdit";
import MyCart from "./components/userRoutes/MyCart";
import ProtectedRoute from "./components/helpers/auth/ProtectedRoute";
import LoggedInRoute from "./components/helpers/auth/LoggedInRoute";
import Logout from "./components/form/Logout";
import NotFound from "./components/helpers/NotFound";
import Shop from "./components/shop/Shop";
import LoginForm2 from "./components/form/LoginForm2";
import RegisterForm from "./components/form/ResgisterForm";
import AdminedRoute from "./components/helpers/auth/AdminedRoute";
import AddProduct from "./components/userRoutes/admin/AddProduct";
import ManageBrands from "./components/userRoutes/admin/BrandsSettings";
import  ProductDetails  from "./components/product/product-detail/ProductDetails";
function Routes() {
  
  return (
    <Layout>
      <Switch>
        <AdminedRoute path="/user/manage-categories" component={ManageBrands} />
        <ProtectedRoute path="/booking" component={BookingPage} />
        <AdminedRoute path="/user/add-product" component={AddProduct} />
        <ProtectedRoute path="/user/cart" component={MyCart} />
        <ProtectedRoute path="/user/user_profile" component={ProfileEdit} />
        <ProtectedRoute path="/user/dashboard" component={UserDashboard} />
        <LoggedInRoute path="/register" component={RegisterForm} />
        <Route path="/user/logout" component={props => <Logout {...props} />} />
        <LoggedInRoute path="/login" component={props => <LoginForm2 {...props} />} />
        <Route path="/productDetails/:id" component={props => <ProductDetails {...props} />} />
        <Route path="/shop/:cat" component={props => <Shop {...props} />} />
        <Route path="/shop" component={props => <Shop {...props} />} />
        <Route path="/NotFound" component={props => <NotFound {...props} />} />
        <Route path="/home" component={props => <Home {...props} />} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/NotFound" />
      </Switch>
    </Layout>
  );
}

export default Routes;
