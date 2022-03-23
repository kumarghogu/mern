import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { Base } from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicalls";

export const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  if (getRedirect) {
    window.setTimeout(() => {
      window.location.href = "/admin/dashboard";
    }, 2000);
  }
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
          getRedirect: true,
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created successfully</h4>
        <h2>Redirecting to dashboard in 2 seconds</h2>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Failed to create product</h4>
        <p>{error}</p>
      </div>
    );
  };

  const createProductForm = () => {
    return (
      <form>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>

            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="stock"
            value={stock}
          />
        </div>

        <button onClick={onSubmit} className="btn btn-outline-info">
          Create product
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Add a product"
      description="Product creating section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Dashboard
      </Link>
      <p>{JSON.stringify(values.getRedirect)}</p>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}

          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};
