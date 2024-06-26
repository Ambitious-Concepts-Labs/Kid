import React, { useState, useEffect } from "react";
import {
  avail,
  editCart,
  handleInput,
  handleRemove,
} from "../../../utils/cartFunctions";
import imgPlaceholder from "../image-placeholder.png";
import "./Cart.css";
import Layout from "../../../components/Dashboard/Layout";

const Cart = (props) => {
  const { currentUser, cart, setCart } = props;
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

  if (!currentUser) return <h1 className="text-center">Loading...</h1>;

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

  if (!loading && currentUser) {
    return (
      <Layout>
        <form id="cart" className="container mx-auto p-4">
          {cart.items.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border">Product</th>
                      <th className="py-2 px-4 border">Quantity</th>
                      <th className="py-2 px-4 border text-center">Price</th>
                      <th className="py-2 px-4 border text-center">Total</th>
                      <th className="py-2 px-4 border"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => {
                      return (
                        <tr
                          key={item._id}
                          className="flex flex-col md:table-row"
                        >
                          <td className="py-2 px-4 border flex items-center">
                            <img
                              className="w-16 h-16"
                              alt={`${item._id}`}
                              src={imgPlaceholder}
                            />
                            <div className="ml-4">
                              <p>{item.name}</p>
                            </div>
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {edit ? (
                              item.type !== "course" ? (
                                <input
                                  type="number"
                                  className="w-16 p-2 border"
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
                                  className="w-16 p-2 border"
                                  id={`${item._id}-input-edit`}
                                  defaultValue={item.qty}
                                  placeholder={item.qty}
                                  disabled
                                />
                              )
                            ) : (
                              <div
                                className="w-16 p-2 border cursor-pointer"
                                onMouseDown={() => {
                                  setEdit(true);
                                }}
                                onClick={() => {
                                  setEdit(true);
                                }}
                              >
                                {item.qty || "1"}
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            <strong>${item.price}</strong>
                          </td>
                          <td className="py-2 px-4 border text-center">
                            <strong>
                              $
                              {(item.qty
                                ? item.qty * parseInt(item.price).toFixed(2)
                                : 1 * parseInt(item.price)
                              ).toFixed(2)}
                            </strong>
                          </td>
                          <td className="py-2 px-4 border text-center">
                            <button
                              type="button"
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={(e) => {
                                handleRemove({
                                  ...props,
                                  e,
                                  item,
                                  setEdit,
                                  editedCart,
                                  setEditedCart,
                                  setCart,
                                });
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <tr className="flex flex-col md:table-row">
                      <td className="py-2 px-4 border" colSpan="3"></td>
                      <td className="py-2 px-4 border text-right">
                        <h5>Subtotal</h5>
                      </td>
                      <td className="py-2 px-4 border text-right">
                        <h5>
                          <strong>
                            ${parseFloat(cart.total_price).toFixed(2)}
                          </strong>
                        </h5>
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row">
                      <td className="py-2 px-4 border" colSpan="3"></td>
                      <td className="py-2 px-4 border text-right">
                        <h5>Estimated shipping</h5>
                      </td>
                      <td className="py-2 px-4 border text-right">
                        <h5>
                          <strong>$0.00</strong>
                        </h5>
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row">
                      <td className="py-2 px-4 border" colSpan="3"></td>
                      <td className="py-2 px-4 border text-right">
                        <h3>Total</h3>
                      </td>
                      <td className="py-2 px-4 border text-right">
                        <h4>
                          <strong>
                            ${parseFloat(cart.total_price).toFixed(2)}
                          </strong>
                        </h4>
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row">
                      <td className="py-2 px-4 border" colSpan="3"></td>
                      <td className="py-2 px-4 border">
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Continue Shopping
                        </button>
                      </td>
                      <td className="py-2 px-4 border text-right">
                        {edit ? (
                          <>
                            <button
                              type="button"
                              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
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
                              className="bg-red-500 text-white px-4 py-2 rounded"
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
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => {
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
            </>
          ) : (
            <h2 className="text-center">You have no items in your cart!</h2>
          )}
        </form>
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

export default Cart;
