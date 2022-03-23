import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Cart from "./core/Cart";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import { UserDashboard } from "./user/UserDashboard";
import { AdminDashboard } from "./user/AdminDashboard";
import { AddCategory } from "./admin/AddCategory";
import { ManageCategories } from "./admin/ManageCategories";
import { AddProduct } from "./admin/AddProduct";
import { ManageProducts } from "./admin/ManageProducts";
import { UpdateProduct } from "./admin/UpdateProduct";
import { UpdateCategory } from "./admin/UpdateCategory";

const EndPoints = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
      </Switch>
    </Router>
  );
};

export default EndPoints;
