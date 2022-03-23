import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import StripeCheckoutBtn from "react-stripe-checkout";
import { API } from "../Backend";
import { createOrder } from "./helper/orderHelper";

export const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { user, token } = isAuthenticated();

  const getFinalPrice = () => {
    let price = 0;
    products.map((product) => {
      price += product.price;
    });
    return price;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const showStripeBtn = () => {
    return isAuthenticated() ? (
      <StripeCheckoutBtn
        stripeKey="pk_test_51KJE6oSBbJSaK5qEGAu08xb8FgLdjHIoNdggJ3AggOwA8YqUWb8IBICzSTKlElOuu4Rx8GDmJBsieRccRBkfIyav00dI3V9waq"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy t-shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutBtn>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h2 className="text-white">Stripe checkout {getFinalPrice()}</h2>
      {showStripeBtn()}
    </div>
  );
};
