import React, { useState, useEffect } from "react";
//function
import { listProductBy } from "../functions/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";

const BestSeller = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("sold", "desc", 3)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {product.map((item, index) => (
              <div className="col-md-4">
                <ProductCard key={index} product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BestSeller;
