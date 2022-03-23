import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import { ImageHelper } from "./helper/ImageHelper";

export const Card = ({
  product,
  showAddCartBtn = true,
  showRemoveCartBtn = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A photo from *";
  const cardDescription = product ? product.description : "Description";
  const cardPrice = product ? product.price : "₹₹₹";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddCartBtn) => {
    if (showAddCartBtn === "added") {
      return "";
    } else if (!showAddCartBtn) {
      return <p className="text-info">Added to cart succesfully</p>;
    } else {
      return (
        showAddCartBtn && (
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to cart
          </button>
        )
      );
    }
  };

  const showRemoveFromCart = (showRemoveCartBtn) => {
    return (
      showRemoveCartBtn && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2 "
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      {getRedirect(redirect)}
      <ImageHelper product={product} />
      <div className="card-body text-dark text-center">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="lead bg-success font-weight-normal text-wrap text-white text-center">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">₹{cardPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCart(showAddCartBtn)}
            <div className="col-12">
              {showRemoveFromCart(showRemoveCartBtn)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
