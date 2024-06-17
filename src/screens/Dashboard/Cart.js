import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { avail, editCart, handleInput, handleRemove } from "./cartFunctions";
import imgPlaceholder from "./image-placeholder.png";
import "./Cart.css";
import Layout from "../../components/Dashboard/Layout";

const Cart = (props) => {
  // const history = useHistory();
  const { currentUser, isLoggedin } = props;
  const [edit, setEdit] = useState(false);
  const [editedCart, setEditedCart] = useState(currentUser?.cart || []);
  const [loading, setLoading] = useState(false);

  let sortedCart = [];
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      if (!edit && currentUser) {
        setEditedCart(currentUser.cart);
      }
    }

    return function() {
      unmounted = true;
    };
  }, [loading, edit, currentUser]);
  if (!currentUser) return <h1>Loading...</h1>;
  if (currentUser.cart.items && currentUser.cart.items.length > 0) {
    sortedCart = editedCart.items.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
  }

  // useEffect(() => {
  // 	if (!isLoggedin) {
  // 		// history.push("/login");
  // 	}
  // }, [isLoggedin, history]);

  if (!loading && currentUser) {
    return (
      <Layout>
        <form id="cart">
          {currentUser.cart.items && currentUser.cart.items.length > 0 ? (
            <>
              <div className="row">
                <div className="col-sm-12 col-md-offset-1">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCart.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td className="col-sm-8 col-md-6">
                              <div className="media">
                                <img
                                  className="media-object"
                                  alt={`${item._id}`}
                                  src={imgPlaceholder}
                                  style={{
                                    width: "72px",
                                    height: "72px",
                                  }}
                                />
                                <div className="media-body">
                                  <p className="media-heading">{item.name}</p>
                                </div>
                              </div>
                            </td>
                            <td
                              className="col-sm-1 col-md-1"
                              style={{ textAlign: "center" }}
                            >
                              {edit ? (
                                item.type !== "course" ? (
                                  <input
                                    type="number"
                                    className="form-control"
                                    id={`${item._id}-input-edit`}
                                    defaultValue={item.qty}
                                    placeholder={item.qty}
                                    min="1"
                                    max="5"
                                    onChange={(e) => {
                                      handleInput({
                                        ...props,
                                        e,
                                        item,
                                        setEdit,
                                        editedCart,
                                        setEditedCart,
                                      });
                                    }}
                                  />
                                ) : (
                                  <input
                                    type="number"
                                    className="form-control"
                                    id={`${item._id}-input-edit`}
                                    defaultValue={item.qty}
                                    placeholder={item.qty}
                                    disabled
                                  />
                                )
                              ) : (
                                <div
                                  className="form-control"
                                  onMouseDown={() => {
                                    setEdit(true);
                                  }}
                                  onClick={() => {
                                    setEdit(true);
                                  }}
                                >
                                  {item.qty}
                                </div>
                              )}
                            </td>
                            <td className="col-sm-1 col-md-1 text-center">
                              <strong>${item.price}</strong>
                            </td>
                            <td className="col-sm-1 col-md-1 text-center">
                              <strong>
                                ${(item.qty * item.price).toFixed(2)}
                              </strong>
                            </td>
                            <td className="col-sm-1 col-md-1">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={(e) => {
                                  handleRemove({
                                    ...props,
                                    e,
                                    item,
                                    setEdit,
                                    editedCart,
                                    setEditedCart,
                                  });
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td className="text-right">
                          <h5>
                            <strong>
                              ${parseFloat(editedCart.total_price).toFixed(2)}
                            </strong>
                          </h5>
                        </td>
                      </tr>
                      <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                          <h5>Estimated shipping</h5>
                        </td>
                        <td className="text-right">
                          <h5>
                            <strong>$0.00</strong>
                          </h5>
                        </td>
                      </tr>
                      <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                          <h3>Total</h3>
                        </td>
                        <td className="text-right">
                          <h4>
                            <strong>
                              ${parseFloat(editedCart.total_price).toFixed(2)}
                            </strong>
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                          <button type="button" className="btn btn-default">
                            Continue Shopping
                          </button>
                        </td>
                        <td className="avail">
                          {edit ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={(event) => {
                                  editCart({
                                    ...props,
                                    event,
                                    setLoading,
                                    editedCart,
                                    setEditedCart,
                                    setEdit,
                                  });
                                }}
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={(e) => {
                                  setEdit(false);
                                  setEditedCart(currentUser.cart);
                                  e.preventDefault();
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => {
                                // avail({ ...props, setLoading, history });
                                avail({ ...props, setLoading });
                              }}
                            >
                              Avail
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <h2 style={{ textAlign: "center" }}>
              You have no items in your cart!
            </h2>
          )}
        </form>
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

export default Cart;
