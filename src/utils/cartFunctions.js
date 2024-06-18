import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const addToCart = (props) => {
  const {
    currentUser,
    item,
    setLoading,
    setCheckUser,
    isLoggedin,
    history,
    setCart,
    cart
  } = props;

  if (
    item.type === "course" &&
    currentUser.cart.items.some((i) => {
      return i._id === item._id;
    })
  ) {
    window.alert("This item is already in your cart!");
  } else {
    const confirm = window.confirm("Add to cart?");
    if (confirm) {
      setLoading(true);
      // await setDoc(doc(db, "transactions", uid), {
      //   ...newCourse,
      //   createdAt: serverTimestamp(),
      //   id: uuidv4(),
      // });
      const items = [item];

      const updatedCart = { ...cart, items };
      const total_price = 0;
      const total_quantity = 1;
      updatedCart.total_quantity = total_quantity; 
      updatedCart.total_price = items.reduce((acc, item) => {
        return total_price + parseInt(item.price);
      }, 0);
      setCart({ ...updatedCart, items });
      console.log({ ...updatedCart, items });
      // Axios.put("/cart/addtocart", { item: { ...item, qty: 1 } })
      // 	.then((res) => {
      // 		if (res.data.msg === "Added to cart") {
      // 			setCheckUser(false);
      // 			setLoading(false);
      // 			window.alert(res.data.msg);
      // 		} else {
      // 			window.alert(`${res.data.msg}`);
      // 			setLoading(false);
      // 		}
      // 		console.log(res.data.msg);
      // 	})
      // 	.catch((err) => {
      // 		console.log(err);
      // 	});
      alert("Item added to cart");
      history("/dashboard/cart")
    }
  }
};

const handleInput = (props) => {
  const { e, item, setEdit, editedCart, setEditedCart, currentUser } = props;

  setEdit(true);

  if (item.type === "course") {
    window.alert("Course quantity cannot be changed");
  } else {
    const originalQty = currentUser.cart.items.filter((filtered) => {
      return filtered._id === item._id;
    })[0].qty;

    let updatedItems = [];
    if (e.target.value.length > 0) {
      updatedItems = [
        ...editedCart.items.filter((filtered) => {
          return filtered._id !== item._id;
        }),
        {
          ...item,
          qty: parseInt(e.target.value),
        },
      ];
    } else if (!e.target.value.length) {
      updatedItems = [
        ...editedCart.items.filter((filtered) => {
          return filtered._id !== item._id;
        }),
        {
          ...item,
          qty: originalQty,
        },
      ];
    }

    let updatedPrice = 0;
    updatedItems.forEach((uitem) => {
      updatedPrice += uitem.price * uitem.qty;
    });
    setEditedCart({
      ...editedCart,
      items: updatedItems,
      total_price: +updatedPrice,
    });
  }
};

const handleRemove = (props) => {
  const { item, setEdit, editedCart, setEditedCart } = props;

  let updatedItems = [
    ...editedCart.items.filter((filtered) => {
      return filtered._id !== item._id;
    }),
  ];

  let updatedPrice = 0;
  updatedItems.forEach((uitem) => {
    updatedPrice += uitem.price * uitem.qty;
  });
  const confirm = window.confirm("Remove item?");
  if (confirm) {
    setEdit(true);
    setEditedCart({
      ...editedCart,
      items: updatedItems,
      total_price: +updatedPrice,
    });
  }
};

const editCart = (props) => {
  const {
    event,

    setLoading,
    editedCart,
    setEditedCart,
    setEdit,
    setCheckUser,
  } = props;
  event.preventDefault();

  if (
    editedCart.items.some((item) => {
      return item.qty < 1;
    }) ||
    editedCart.items.some((item) => {
      return item.qty > 5;
    }) ||
    editedCart.items.some((item) => {
      return isNaN(parseInt(item.qty));
    })
  ) {
    window.alert("Quantity must be atleast 1 but not more than 5");
  } else {
    const confirm = window.confirm("Proceed to apply changes?");
    if (confirm) {
      setLoading(true);
      // Axios.put("/cart/editcart", {
      // 	cart: editedCart,
      // })
      // 	.then((res) => {
      // 		setCheckUser(false);
      // 		setLoading(false);
      // 		setEditedCart(res.data.user.cart);
      // 		setEdit(false);
      // 		console.log(res.data.msg);
      // 	})
      // 	.catch((err) => {
      // 		console.log(err);
      // 	});
    }
  }
};

const avail = (props) => {
  const { setLoading, setCheckUser } = props;
  const confirm = window.confirm("Proceed to avail items?");
  if (confirm) {
    setLoading(true);
    // Axios.post("/cart/avail")
    // 	.then((res) => {
    // 		window.alert("Item successfully availed!");
    // 		setCheckUser(false);
    // 		setLoading(false);
    // 	})
    // 	.catch((e) => {
    // 		console.log(e);
    // 	});
  }
};

export { addToCart, editCart, avail, handleInput, handleRemove };
