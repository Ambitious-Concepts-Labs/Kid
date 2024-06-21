import Button from "../Button";
// import axios from "axios";
import React from "react";
// import toast from "react-hot-toast";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const CourseEnrollButton = ({ courseId, price }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onClick = async () => {
    try {
          setIsLoading(true);
          let checkoutSessionData = {
            price: "price_1PSUdGDl9zzW61N76ZMkiOXh", // price ID from products fetch
            success_url: window.location.origin, // can set this to a custom page
            cancel_url: window.location.origin, // can set this to a custom page
          };
          const isOneTime = true;
          // if payment is a one-time payment (as opposed to subscription)
          // append mode: 'payment' to the checkout session data
          if (isOneTime) {
            checkoutSessionData["mode"] = "payment";
          }
          const checkoutSessionRef = await addDoc(
            // currentUser is provided by firebase, via getAuth().currentUser
            collection(db, `customers/${courseId}/checkout_sessions`),
            checkoutSessionData
          );

          // The Stripe extension creates a payment link for us
          onSnapshot(checkoutSessionRef, (snap) => {
            const { error, url } = snap.data();
            if (error) {
              // handle error
            }
            if (url) {
              window.location.assign(url); // redirect to payment link
            }
          });

          //   const response = await axios.post(`/api/courses/${courseId}/checkout`);

          //   window.location.assign(response.data.url);
        } catch (error) {
    //   toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-full md:w-auto"
      size={"sm"}
      disabled={isLoading}
      onClick={onClick}
    >
      Enroll for {price}
    </Button>
  );
};

export default CourseEnrollButton;
