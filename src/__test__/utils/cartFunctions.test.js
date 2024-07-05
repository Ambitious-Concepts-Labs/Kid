import {
  addToCart,
  handleInput,
  handleRemove,
  editCart,
  avail,
} from "../../utils/cartFunctions";
import { db } from "../../lib/firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

jest.mock("../../lib/firebase", () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn()
      }))
    })),
    doc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
  },
}));

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("unique-id"),
}));

describe("Cart Functions", () => {
  let props;

  beforeEach(() => {
    props = {
      currentUser: {
        cart: {
          items: [{ _id: "123", qty: 1, price: 50, type: "product" }],
        },
      },
      item: { _id: "123", type: "product", price: 50 },
      setLoading: jest.fn(),
      setCheckUser: jest.fn(),
      isLoggedin: true,
      history: jest.fn(),
      setCart: jest.fn(),
      cart: { items: [] },
      e: {
        target: {
          value: "2",
        },
      },
      setEdit: jest.fn(),
      editedCart: { items: [] },
      setEditedCart: jest.fn(),
      id: "unique-id",
      event: {
        preventDefault: jest.fn(),
      },
    };
    global.alert = jest.fn();
    global.confirm = jest.fn(() => true);
    // global.window.location.reload = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe("addToCart", () => {
  //   it("should alert if item is already in cart", async () => {
  //     props.currentUser.cart.items = [{ _id: "123", type: "course" }];
  //     await addToCart(props);
  //     expect(global.alert).toHaveBeenCalledWith('This item is already in your cart!');
  //   });

  //   it("should add item to cart and navigate to cart page", async () => {
  //     await addToCart(props);
  //     expect(props.setLoading).toHaveBeenCalledWith(true);
  //     expect(setDoc).toHaveBeenCalledWith(
  //       doc(db, "transactions", "unique-id"),
  //       expect.objectContaining({
  //         items: [{ _id: "123", type: "product", price: 50 }],
  //         total_price: 50,
  //         total_quantity: 1,
  //         createdAt: expect.any(Object),
  //         id: "unique-id",
  //       })
  //     );
  //     expect(props.setCart).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         items: [{ _id: "123", type: "product", price: 50 }],
  //         total_price: 50,
  //       })
  //     );
  //     expect(global.alert).toHaveBeenCalledWith("Item added to cart");
  //     expect(props.history).toHaveBeenCalledWith("/dashboard/cart");
  //   });
  // });

  describe("handleInput", () => {
    it("should set edit mode to true", () => {
      handleInput(props);
      expect(props.setEdit).toHaveBeenCalledWith(true);
    });

    it('should alert when item type is "course"', () => {
      props.item.type = "course";
      handleInput(props);
      expect(global.alert).toHaveBeenCalledWith(
        "Course quantity cannot be changed"
      );
    });

    it("should update item quantity and price correctly", () => {
      handleInput(props);
      expect(props.setEditedCart).toHaveBeenCalledWith({
        ...props.editedCart,
        items: [{ ...props.item, qty: 2 }],
        total_price: 100,
      });
    });

    it("should reset item quantity to original when input is empty", () => {
      props.e.target.value = "";
      handleInput(props);
      expect(props.setEditedCart).toHaveBeenCalledWith({
        ...props.editedCart,
        items: [{ ...props.item, qty: 1 }],
        total_price: 50,
      });
    });

    it("should update price correctly for multiple items", () => {
      props.editedCart.items.push({
        _id: "456",
        price: 30,
        qty: 1,
      });
      handleInput(props);
      expect(props.setEditedCart).toHaveBeenCalledWith({
        ...props.editedCart,
        items: [
          { _id: "456", price: 30, qty: 1 },
          { ...props.item, qty: 2 },
        ],
        total_price: 130,
      });
    });
  });

  // describe("handleRemove", () => {
  //   it("should remove item from cart and reset cart state", () => {
  //     props.editedCart.items = [
  //       { _id: "123", price: 50, qty: 1 },
  //       { _id: "456", price: 30, qty: 1 },
  //     ];
  //     props.item = { _id: "123", price: 50, qty: 1 };
  //     handleRemove(props);
  //     expect(global.confirm).toHaveBeenCalledWith("Remove item?");
  //     expect(props.setEdit).toHaveBeenCalledWith(true);
  //     expect(props.setEditedCart).toHaveBeenCalledWith({
  //       ...props.editedCart,
  //       items: [{ _id: "456", price: 30, qty: 1 }],
  //       total_price: 30,
  //     });
  //     expect(props.setCart).toHaveBeenCalledWith({
  //       items: [],
  //       total_price: 0,
  //       total_quantity: 0,
  //     });
  //     expect(global.window.location.reload).toHaveBeenCalled();
  //   });
  // });

  // describe("editCart", () => {
  //   it("should alert if quantity is less than 1 or more than 5", async () => {
  //     props.editedCart.items = [{ _id: "123", qty: 6, price: 50 }];
  //     await editCart(props);
  //     expect(global.alert).toHaveBeenCalledWith(
  //       "Quantity must be atleast 1 but not more than 5"
  //     );
  //   });

  //   it("should update cart in the database", async () => {
  //     props.editedCart.items = [{ _id: "123", qty: 2, price: 50 }];
  //     await editCart(props);
  //     expect(props.setLoading).toHaveBeenCalledWith(true);
  //     expect(updateDoc).toHaveBeenCalledWith(
  //       doc(db, "transactions", props.id),
  //       {
  //         cart: props.editedCart,
  //       },
  //       { merge: true }
  //     );
  //   });
  // });

  // describe("avail", () => {
  //   it("should update cart in the database when confirmation is true", async () => {
  //     await avail(props);

  //     expect(global.confirm).toHaveBeenCalledWith("Proceed to avail items?");
  //     expect(props.setLoading).toHaveBeenCalledWith(true);
  //     expect(updateDoc).toHaveBeenCalledWith(
  //       doc(db, "transactions", "unique-id"),
  //       {
  //         cart: props.item,
  //       },
  //       { merge: true }
  //     );
  //   });

  //   it("should not update cart in the database when confirmation is false", async () => {
  //     global.confirm.mockReturnValueOnce(false); // Mock window.confirm to return false

  //     await avail(props);

  //     expect(global.confirm).toHaveBeenCalledWith("Proceed to avail items?");
  //     expect(props.setLoading).not.toHaveBeenCalled();
  //     expect(updateDoc).not.toHaveBeenCalled();
  //   });
  // });
});
