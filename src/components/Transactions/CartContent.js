import React from "react";
import {
  avail,
  editCart,
  handleInput,
  handleRemove,
} from "../../utils/cartFunction";

const CartContent = ({
  currentUser,
  cart,
  setCart,
  edit,
  setEdit,
  editedCart,
  setEditedCart,
  loading,
  setLoading,
  ...props
}) => {
  return (
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
                  <th className="py-2 px-4 border"> </th>
                </tr>
              </thead>
              <tbody>
                {/* ... (keep the existing table rows for cart items) */}
                {/* ... (keep the existing table rows for subtotal, shipping, and total) */}
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
  );
};

export default CartContent;
