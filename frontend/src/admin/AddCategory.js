import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { Base } from "../core/Base";
import { createCategory } from "./helper/adminapicalls";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, seterror] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Admin Dashboard
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    seterror("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    seterror("");
    setSuccess(false);

    // api call
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        seterror(true);
      } else {
        seterror("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For ex- Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new t-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};
