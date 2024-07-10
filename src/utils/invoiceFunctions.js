// import Axios from "axios";
import { db, updateFireStoreDoc } from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp } from "firebase/firestore";

const editName = (props) => {
  const { event, editedInvoice, setEditedInvoice, item, transaction } = props;

  let updatedItems = [];

  const originalName = transaction.cart.items.filter((filtered) => {
    return filtered._id === item._id;
  })[0];

  if (event.target.value.length) {
    updatedItems = [
      ...editedInvoice.cart.items.filter((filtered) => {
        return filtered._id !== item._id;
      }),
      {
        ...item,
        name: event.target.value.toString(),
      },
    ];
  } else if (!event.target.value.length) {
    updatedItems = [
      ...editedInvoice.cart.items.filter((filtered) => {
        return filtered._id !== item._id;
      }),
      {
        ...item,
        name: originalName,
      },
    ];
  }

  setEditedInvoice({
    ...editedInvoice,
    cart: {
      ...editedInvoice.cart,
      items: updatedItems,
    },
  });
};

const editQuantity = (props) => {
  const { event, editedInvoice, setEditedInvoice, item, transaction } = props;
  let updatedItems = [];

  const originalQty = transaction.cart.items.filter((filtered) => {
    return filtered._id === item._id;
  })[0].qty;

  if (event.target.value.length) {
    updatedItems = [
      ...editedInvoice.cart.items.filter((filtered) => {
        return filtered._id !== item._id;
      }),
      {
        ...item,
        qty: parseInt(event.target.value),
      },
    ];
  } else if (!event.target.value.length) {
    updatedItems = [
      ...editedInvoice.cart.items.filter((filtered) => {
        return filtered._id !== item._id;
      }),
      {
        ...item,
        qty: originalQty,
      },
    ];
  }

  const updatedQty = updatedItems.reduce((acc, cur) => acc + cur.qty, 0);
  let updatedPrice = 0;
  updatedItems.forEach((uitem) => {
    updatedPrice += +parseFloat(uitem.price) * +parseInt(uitem.qty);
  });

  setEditedInvoice({
    ...editedInvoice,
    cart: {
      ...editedInvoice.cart,
      items: [...updatedItems],
      total_quantity: +updatedQty,
      total_price: +updatedPrice.toFixed(2),
    },
  });
};

const editRate = (props) => {
  const { event, editedInvoice, setEditedInvoice, item, transaction } = props;

  let updatedItems = [];

  const originalPrice = +transaction.cart.items.filter((filtered) => {
    return filtered._id === item._id;
  })[0].price;

  if (event.target.value.length) {
    updatedItems = [
      ...editedInvoice.cart.items.filter((filtered) => {
        return filtered._id !== item._id;
      }),
      {
        ...item,
        price: +parseFloat(event.target.value).toFixed(2),
      },
    ];
  } else if (!event.target.value.length) {
    updatedItems = [
      ...editedInvoice.cart.items.filter((filtered) => {
        return filtered._id !== item._id;
      }),
      {
        ...item,
        price: +originalPrice,
      },
    ];
  }

  let updatedPrice = 0;
  updatedItems.forEach((uitem) => {
    updatedPrice += parseFloat(uitem.price) * parseInt(uitem.qty);
  });

  setEditedInvoice({
    ...editedInvoice,
    cart: {
      ...editedInvoice.cart,
      items: [...updatedItems],
      total_price: +updatedPrice.toFixed(2),
    },
  });
};

const editDescription = (props) => {
  const { event, editedInvoice, setEditedInvoice, item } = props;
  const updatedItems = [
    ...editedInvoice.cart.items.filter((filtered) => {
      return filtered._id !== item._id;
    }),
    {
      ...item,
      description: event.target.value.toString() || "No description yet",
    },
  ];

  setEditedInvoice({
    ...editedInvoice,
    cart: { ...editedInvoice.cart, items: [...updatedItems] },
  });
};

const confirmEdit = async (props) => {
  const {
    setEdit,
    editedInvoice,
    setLoading,
    setIsTransactionLoaded,
    currentUser,
  } = props;
  if (
    editedInvoice.cart.items.some((item) => {
      return item.qty < 0;
    })
  ) {
    window.alert("Quantity must be atleast 0 but not more than 5");
  } else if (
    editedInvoice.cart.items.some((item) => {
      return item.qty > 5;
    })
  ) {
    window.alert("Quantity must be atleast 0 but not more than 5");
  } else if (
    editedInvoice.cart.items.some((item) => {
      return item.price < 1;
    })
  ) {
    window.alert("Price must be more than $1");
  } else {
    editedInvoice.cart = {
      ...editedInvoice.cart,
      items: [
        ...editedInvoice.cart.items.filter((filtered) => filtered.qty !== 0),
      ],
    };
    const confirm = window.confirm("Confirm invoice edit?");
    if (confirm) {
      setLoading(true);
      if (currentUser.transactions.length > 0) {
        const res = [];
        currentUser.transactions.forEach((transaction) => {
          if (transaction.id === editedInvoice.id) res.push(transaction);
        });
        const foundTransaction = res[0];
        foundTransaction.cart = editedInvoice.cart;
        foundTransaction.manualDateAdded = editedInvoice.manualDateAdded;

        await updateFireStoreDoc(
          doc(db, "transactions", editedInvoice._id),
          { ...editedInvoice }
        );
        setEdit(false);
        setIsTransactionLoaded(false);
        setLoading(false);
        window.alert("Invoice edited!");
      }
    }
  }
};

const cancelTransaction = (props) => {
  const {
    transaction,
    setTransaction,
    currentUser,
    setLoading,
    history,
  } = props;
  const confirm = window.confirm("Proceed to cancel transaction?");
  if (confirm) {
    setLoading(true);
    // Axios.put(`/transaction/canceltransaction`, { transaction, currentUser })
    // 	.then((res) => {
    // 		if (currentUser.isAdmin) {
    // 			history.push("/admin/pendingitems");
    // 		} else {
    // 			setTransaction(res.data.transaction);
    // 		}
    // 		setLoading(false);
    // 	})
    // 	.catch((err) => {
    // 		console.log(err);
    // 	});
  }
};

const sendInvoice = async (props) => {
  const {
    transactionId,
    currentUser,
    history,
    newInvoice = { user: "" },
    isNewInvoice = false,
    currentInvoice,
    selectedStudent,
    status,
  } = props;

  if (isNewInvoice) {
    const complete =
      newInvoice.user &&
      newInvoice.manualDateAdded &&
      newInvoice.cart.items.length > 0;
    if (complete) {
      const confirm = window.confirm("Confirm to send invoice?");
      if (confirm) {
        let updatedTransactions = currentUser.transactions;
        const newTransaction = {
          cart: { ...newInvoice.cart },
          status: "for payment",
          manualDateAdded: newInvoice.manualDateAdded,
          createdAt: serverTimestamp(),
          _id: uuidv4(),
          user: selectedStudent ? selectedStudent.id : currentUser.uid,
        };
        const transactionId = uuidv4();
        updatedTransactions.push(transactionId);
        await updateFireStoreDoc(
          doc(db, "transactions", transactionId),
          { ...newTransaction }
        );
        if (selectedStudent) {
          await updateFireStoreDoc(
            doc(db, "users", selectedStudent.id),
            { transactions: updatedTransactions }
          );
        } else {
          await updateFireStoreDoc(
            doc(db, "users", currentUser.id),
            { transactions: updatedTransactions }
          );
        }
        history("/dashboard/admin/invoices/all");
      }
    } else {
      window.alert("Please fill in the required fields");
    }
  } else {
    const confirm = window.confirm("Confirm to send invoice?");

    if (confirm) {
      currentInvoice.status = status ? status : "pendnig";
      await updateFireStoreDoc(
        doc(db, "transactions", transactionId),
        { ...currentInvoice }
      );
      history("/dashboard/admin/invoices/all");
    }
  }
};

const search = (props) => {
  const { event, setSearchedItems, setSearched, items, setItemsSlice } = props;
  setItemsSlice([0, 10]);
  const filteredItems = items
    .filter((filtered) => {
      return filtered.user.username
        .toUpperCase()
        .toString()
        .includes(`${event.target.value.toUpperCase().toString()}`);
    })
    .sort((a, b) => {
      const timeA = a.createdAt.toUpperCase();
      const timeB = b.createdAt.toUpperCase();
      if (timeA < timeB) {
        return -1;
      } else if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
  if (event.target.value.length) {
    setSearchedItems(filteredItems);
    setSearched(true);
  } else {
    setSearchedItems(items);
    setSearched(false);
  }
};

const addItem = async (props) => {
  const { newInvoice, setNewItem, newItem, productIds } = props;
  const newItemId = document.querySelector("#new-item-id");
  const newItemName = document.querySelector("#new-item-name");
  const newItemQty = document.querySelector("#new-item-qty");
  const newItemPrice = document.querySelector("#new-item-price");

  if (
    newItemId.value &&
    newItemName.value &&
    newItemQty.value &&
    newItemPrice.value
  ) {
    if (
      newInvoice.cart.items.some((item) => {
        return item._id.toString() === newItem._id.toString();
      })
    ) {
      window.alert(
        "ID is already added to the invoice being created. Please add the quantity instead."
      );
    } else if (
      productIds.some((item) => {
        return item._id.toString() === newItem._id.toString();
      })
    ) {
      window.alert("ID already existing. Please use another ID.");
    } else {
      window.alert("Added to new invoice");
      newInvoice.cart.items.push(newItem);
      newInvoice.cart.total_quantity += parseInt(newItemQty.value);
      newInvoice.cart.total_price = +(
        +parseFloat(newInvoice.cart.total_price) +
        +parseFloat(newItemPrice.value * newItemQty.value)
      ).toFixed(2);
      newItemId.value = "";
      newItemName.value = "";
      newItemQty.value = "";
      newItemPrice.value = "";
      setNewItem({});
      console.log(newInvoice.cart.total_price);
    }
  } else {
    window.alert("Please fill in the item details");
  }
};

const removeItem = (props) => {
  const { setNewInvoice, newInvoice, item } = props;
  const confirm = window.confirm("Remove item?");
  if (confirm) {
    const updatedItems = newInvoice.cart.items.filter(
      (filtered) => filtered._id !== item._id
    );

    const updatedInvoice = {
      ...newInvoice,
      cart: {
        ...newInvoice.cart,
        items: updatedItems,
        total_quantity: newInvoice.cart.total_quantity - parseInt(item.qty),
        total_price: +(
          parseFloat(newInvoice.cart.total_price).toFixed(2) -
          parseFloat(item.price * item.qty).toFixed(2)
        ).toFixed(2),
      },
    };
    setNewInvoice(updatedInvoice);
  }
};

export {
  editName,
  editQuantity,
  editRate,
  editDescription,
  confirmEdit,
  cancelTransaction,
  sendInvoice,
  search,
  addItem,
  removeItem,
};
