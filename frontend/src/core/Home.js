import React, { useState, useEffect } from "react";
import { API } from "../Backend";
import "../style.css";
import { Base } from "./Base";
import { Card } from "./Card";
import { isAddedTOCart } from "./helper/CartHelper";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="MERN practice App">
      <div className="row">
        <h1 className="text-white">All of t-shirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card
                  product={product}
                  showAddCartBtn={isAddedTOCart(product._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
