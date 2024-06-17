// Imports
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { addToCart } from "./cartFunctions";
import * as Papa from "papaparse";

// import Axios from "axios";
import "./Products.css";
import Layout from "../../components/Dashboard/Layout";
// End

const Products = (props) => {
  // const history = useHistory();
  const { currentUser } = props;
  const [products, setProducts] = useState([]);
  const [productsSlice, setProductsSlice] = useState([0, 10]);
  const [areProductsLoaded, setAreProductsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  //To load products list from dataset
  useEffect(() => {
    // let source = Axios.CancelToken.source();
    let unmounted = false;
    if (!areProductsLoaded) {
      try {
        const readCsv = () => {
          fetch("data.csv")
            .then((response) => response.text())
            .then((responseText) => {
              var data = Papa.parse(responseText, {
                complete: function(results) {
                  console.log("results: ", results.data);
                  let res = [];
                  for (const data of results.data) {
                    // if (res.length === 0) {
                    res.push({
                      _id: data[0],
                      price: data[20],
                      name: data[19],
                    });
                    // } else {
                    // 	// if (
                    // 	// 	!res.some(
                    // 	// 		(result) => result._id.toString() === data.id.toString()
                    // 	// 	)
                    // 	// ) {
                    // 		res.push({
                    // 			_id: data[0],
                    // 			price: data[20],
                    // 			name: data[19],
                    // 		});
                    // 	// }
                    // }
                  }
                  console.log("results: ", results.data);
                  console.log({ res });

                  // const test = res.slice(0, 100).sort((a, b) => {
                  // 		if (a.name.toUpperCase() < b.name.toUpperCase()) {
                  // 			return -1;
                  // 		}
                  // 		if (a.name.toUpperCase() > b.name.toUpperCase()) {
                  // 			return 1;
                  // 		}
                  // 		return 0;
                  // 	})

                  // console.log({test})
                  setProducts(res);
                },
              });
              return data;
              // setProducts( responseText );
            });
        };

        if (!unmounted) {
          // const productsData = readCsv()
          // setProducts(productsData)
          readCsv();
          setAreProductsLoaded(true);
        }
      } catch (error) {
        if (!unmounted) {
          console.log(`request cancelled:${error.message}`);
        }
      }

      // Axios.get("/product/products", {
      // 		cancelToken: source.token,
      // 	})
      // 		.then((res) => {
      // 				if (!unmounted) {
      // 						setProducts(res.data);
      // 						setAreProductsLoaded(true);
      // 					}
      // 				})
      // 				.catch((err) => {
      // 						if (!unmounted) {
      // 								if (Axios.isCancel(err)) {
      // 										console.log(`request cancelled:${err.message}`);
      // 									} else {
      // 											console.log("another error happened:" + err.message);
      // 										}
      // 									}
      // 								});
    }
    return function() {
      unmounted = true;
      // source.cancel("Cancelling in cleanup");
    };
  }, [areProductsLoaded]);

  if (!currentUser) return <h2>Loading...</h2>;
  if (!loading && areProductsLoaded) {
    return (
      <Layout>
        <div id="products">
          <>
            <h2 className="title">Products</h2>
            <div className="row">
              <h2 className="col-8">Item Name</h2>
              <h2 className="col">Price</h2>
              {!currentUser.isAdmin && (
                <h2 className="col" style={{ visibility: "hidden" }}>
                  Filler
                </h2>
              )}
            </div>
            {products.slice(productsSlice[0], productsSlice[1]).map((item) => {
              return (
                <div className="row item" key={item._id}>
                  <p className="col-8" style={{ display: "inline" }}>
                    {item.name}
                  </p>
                  <p className="col" style={{ display: "inline" }}>
                    ${item.price}
                  </p>
                  {currentUser.isStudent && (
                    <div className="col">
                      <button
                        className="btn btn-primary"
                        style={{ display: "inline" }}
                        onClick={() => {
                          addToCart({
                            item,
                            ...props,
                            // history,
                            setLoading,
                          });
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="div" style={{ textAlign: "center" }}>
              {productsSlice[0] === 0 ? (
                ""
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setProductsSlice([
                      productsSlice[0] - 10,
                      productsSlice[1] - 10,
                    ])
                  }
                >
                  Prev
                </button>
              )}
              {productsSlice[1] === 100 ? (
                ""
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setProductsSlice([
                      productsSlice[0] + 10,
                      productsSlice[1] + 10,
                    ])
                  }
                >
                  Next
                </button>
              )}
            </div>
          </>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="spinner-border-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Products;
