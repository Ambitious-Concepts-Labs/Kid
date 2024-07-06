import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
  function createOrder() {
    window.alert("Payment successful");
    // return fetch("/my-server/create-paypal-order", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // use the "body" param to optionally pass additional order information
    //   // like product ids and quantities
    //   body: JSON.stringify({
    //     cart: [
    //       {
    //         id: "YOUR_PRODUCT_ID",
    //         quantity: "YOUR_PRODUCT_QUANTITY",
    //       },
    //     ],
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((order) => order.id);
  }
  function onApprove(data) {
    window.alert("Payment successful");
    console.log("data", data);
    // return fetch("/my-server/capture-paypal-order", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     orderID: data.orderID,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((orderData) => {
    //     const name = orderData.payer.name.given_name;
    //     alert(`Transaction completed by ${name}`);
    //   });
  }
  
    const initialOptions = {
      "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
      currency: "USD",
      intent: "capture",
    };

  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
    {/*<PayPalScriptProvider options={initialOptions}> */}
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
}
