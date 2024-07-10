import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cartFunctions";
import Papa from "papaparse";
import Layout from "../../components/Dashboard/Layout";
import "./Products.css";

const ProductTable = lazy(() => import("../../components/Tables/ProductTable"));

const Products = (props) => {
  const { currentUser, cart, setCart } = props;
  const history = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsSlice, setProductsSlice] = useState([0, 10]);
  const [areProductsLoaded, setAreProductsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    let unmounted = false;
    if (!areProductsLoaded) {
      try {
        const readCsv = () => {
          fetch("/data.csv")
            .then((response) => response.text())
            .then((responseText) => {
              Papa.parse(responseText, {
                complete: function(results) {
                  const res = results.data.map((data) => ({
                    _id: data[0],
                    price: data[20],
                    name: data[19],
                  }));
                  setProducts(res);
                  setAreProductsLoaded(true);
                },
              });
            })
            .catch((error) => {
              if (!unmounted) {
                console.log(`Error loading CSV: ${error.message}`);
              }
            });
        };

        if (!unmounted) {
          readCsv();
        }
      } catch (error) {
        if (!unmounted) {
          console.log(`Error: ${error.message}`);
        }
      }
    }
    return function() {
      unmounted = true;
    };
  }, [areProductsLoaded]);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedProducts = [...products].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (!currentUser) return <h2>Loading...</h2>;
  if (!loading && areProductsLoaded) {
    return (
      <Layout>
        <div style={{ overflow: "scroll" }} className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="border p-2 mr-2"
            />
          </div>
          <Suspense fallback={<div>Loading product table...</div>}>
            <ProductTable
              filteredProducts={filteredProducts}
              productsSlice={productsSlice}
              setProductsSlice={setProductsSlice}
              currentUser={currentUser}
              handleSort={handleSort}
              addToCart={addToCart}
              setCart={setCart}
              cart={cart}
              setLoading={setLoading}
              history={history}
              {...props}
            />
          </Suspense>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Products;
