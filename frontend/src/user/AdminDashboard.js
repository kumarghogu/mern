import React from "react";
import { Base } from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger mr-2">Admin area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};
