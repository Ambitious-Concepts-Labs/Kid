import { addToCart, handleInput } from "../../utils/cartFunctions";

describe("addToCart", () => {
  let props;

  beforeEach(() => {
    props = {
      currentUser: {
        cart: {
          items: [],
        },
      },
      item: {
        _id: "123",
        type: "course",
        price: "100",
      },
      setLoading: jest.fn(),
      setCheckUser: jest.fn(),
      isLoggedin: true,
      history: jest.fn(),
      setCart: jest.fn(),
      cart: {
        items: [],
      },
    };
    global.confirm = jest.fn(() => true);
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should alert if the item is already in the cart", () => {
    props.currentUser.cart.items.push({ _id: "123" });
    addToCart(props);
    expect(window.alert).toHaveBeenCalledWith(
      "This item is already in your cart!"
    );
  });

  test("should not add item to cart if user cancels", () => {
    global.confirm = jest.fn(() => false);
    addToCart(props);
    expect(props.setLoading).not.toHaveBeenCalled();
    expect(props.setCart).not.toHaveBeenCalled();
    expect(props.history).not.toHaveBeenCalled();
  });

  test("should add item to cart if user confirms", () => {
    addToCart(props);
    expect(props.setLoading).toHaveBeenCalledWith(true);
    expect(props.setCart).toHaveBeenCalledWith({
      items: [props.item],
      total_quantity: 1,
      total_price: 100,
    });
    expect(window.alert).toHaveBeenCalledWith("Item added to cart");
    expect(props.history).toHaveBeenCalledWith("/dashboard/cart");
  });

  test("should update cart totals correctly", () => {
    props.cart.items.push({ _id: "456", price: "50" });
    addToCart(props);
    expect(props.setCart).toHaveBeenCalledWith({
      items: [props.item],
      total_quantity: 1,
      total_price: 100,
    });
  });
});

describe("handleInput", () => {
  let props;

  beforeEach(() => {
    props = {
      e: {
        target: {
          value: "2",
        },
      },
      item: {
        _id: "123",
        type: "product",
        price: 50,
      },
      setEdit: jest.fn(),
      editedCart: {
        items: [],
      },
      setEditedCart: jest.fn(),
      currentUser: {
        cart: {
          items: [
            {
              _id: "123",
              qty: 1,
            },
          ],
        },
      },
    };
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should set edit mode to true", () => {
    handleInput(props);
    expect(props.setEdit).toHaveBeenCalledWith(true);
  });

  test('should alert when item type is "course"', () => {
    props.item.type = "course";
    handleInput(props);
    expect(window.alert).toHaveBeenCalledWith(
      "Course quantity cannot be changed"
    );
  });

  test("should update item quantity and price correctly", () => {
    handleInput(props);
    expect(props.setEditedCart).toHaveBeenCalledWith({
      ...props.editedCart,
      items: [{ ...props.item, qty: 2 }],
      total_price: 100,
    });
  });

  test("should reset item quantity to original when input is empty", () => {
    props.e.target.value = "";
    handleInput(props);
    expect(props.setEditedCart).toHaveBeenCalledWith({
      ...props.editedCart,
      items: [{ ...props.item, qty: 1 }],
      total_price: 50,
    });
  });

  test("should update price correctly for multiple items", () => {
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
