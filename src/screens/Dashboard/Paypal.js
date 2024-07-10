// Imports
import React, { useRef, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import Axios from "axios";
import "./Paypal.css";
// End
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Paypal = (props) => {
	const { transaction, setCheckUser, currentUser } = props;
	// const history = useHistory();
	const paypal = useRef();

	useEffect(() => {
		if (transaction) {
			let hasRendered = false;

			if (window.paypalButton && hasRendered) {
				window.paypalButton.close();
				hasRendered = false;
			}

			window.paypalButton = window.paypal.Buttons({
				style: {
					shape: "rect",
					color: "blue",
					layout: "vertical",
					label: "checkout",
				},
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								decription: `test`,
								amount: {
									value: parseFloat(transaction.cart.total_price).toFixed(2),
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					await actions.order.capture();
					currentUser.cart.items.forEach(async (item) => {
						if (item.type === "course") {
							const foundCourse = transaction.id;
							if (foundCourse) {
								foundCourse.num_of_students += 1;
								foundCourse.students = [...foundCourse.students, transaction.user];
								await setDoc(doc(db, "users", currentUser.id), 
							    { courses: [...foundCourse] }, { merge: true });
							}
						}
					});
					// await Axios.put("/transaction/checkout", {
					// 	transaction: transaction,
					// })
					// 	.then((res) => {
					// 		window.alert("Payment successful");
					// 		// history.push(`/transaction/${transaction._id}`);
					// 		setCheckUser(false);
					// 	})
					// 	.catch((e) => {
					// 		console.log(e);
					// 	});
				},
				onError: (err) => {
					window.alert("ERROR IN PAYMENT PROCESS");
				},
			});
			window.paypalButton
				.render(paypal.current)
				.then(() => {
					hasRendered = true;
				})
				.catch((err) => {
					let selector = document.querySelector("#paypal-container");

					if (selector && selector.children.length > 0) {
						throw new Error(err);
					}

					return;
				});
		}
	// }, [setCheckUser, history, transaction]);
	}, [setCheckUser, transaction]);

	return <div id="paypal-container" ref={paypal}></div>;
};

export default Paypal;
