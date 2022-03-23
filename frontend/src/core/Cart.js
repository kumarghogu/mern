import React, { useState, useEffect } from "react";
import { API } from "../Backend";
import "../style.css";
import { Base } from "./Base";
import { Card } from "./Card";
import { loadCart } from "./helper/CartHelper";
import { PaymentB } from "./PaymentB";
import { StripeCheckout } from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              showAddCartBtn={"added"}
              showRemoveCartBtn={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckOut = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts()
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        <div className="col-6">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
