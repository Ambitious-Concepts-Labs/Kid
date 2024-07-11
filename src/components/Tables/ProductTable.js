import React from "react";

const ProductTable = ({
  filteredProducts,
  productsSlice,
  setProductsSlice,
  currentUser,
  handleSort,
  addToCart,
  setCart,
  cart,
  setLoading,
  history,
  ...props
}) => {
  return (
    <>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Item Name
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price
            </th>
            {!currentUser.isAdmin && (
              <th className="py-2 px-4 border-b">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredProducts
            .slice(productsSlice[0], productsSlice[1])
            .map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">${item.price}</td>
                {currentUser.isStudent && (
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        addToCart({
                          setCart,
                          cart,
                          item,
                          ...props,
                          setLoading,
                          history,
                        });
                      }}
                    >
                      Add to cart
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {productsSlice[0] > 0 && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() =>
              setProductsSlice([productsSlice[0] - 10, productsSlice[1] - 10])
            }
          >
            Prev
          </button>
        )}
        {productsSlice[1] < filteredProducts.length && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() =>
              setProductsSlice([productsSlice[0] + 10, productsSlice[1] + 10])
            }
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default ProductTable;
