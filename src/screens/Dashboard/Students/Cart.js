import React, { useState, useEffect, lazy, Suspense } from "react";
import Layout from "../../../components/Dashboard/Layout";
import "./Cart.css";

const CartContent = lazy(() => import("../../../components/Transactions/CartContent"));

const Cart = (props) => {
  const { currentUser, cart, setCart } = props;
  const [edit, setEdit] = useState(false);
  const [editedCart, setEditedCart] = useState(currentUser?.cart || []);
  const [loading, setLoading] = useState(false);

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

  if (!loading && currentUser) {
    return (
      <Layout>
        <Suspense fallback={<div>Loading cart...</div>}>
          <CartContent
            currentUser={currentUser}
            cart={cart}
            setCart={setCart}
            edit={edit}
            setEdit={setEdit}
            editedCart={editedCart}
            setEditedCart={setEditedCart}
            loading={loading}
            setLoading={setLoading}
            {...props}
          />
        </Suspense>
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
