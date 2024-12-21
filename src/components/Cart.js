import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from localStorage
  useEffect(() => {
    const fetchCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };

    fetchCart();
  }, []);

  // Calculate total price
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle item deletion
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <div className="bg-[#F5E6DA] min-h-screen p-4 pt-36">
      <h1 className="text-2xl font-bold text-[#7A5F4A] text-center mb-6">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty!</p>
      ) : (
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
          <div className="hidden md:block">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-[#7A5F4A] font-bold">
                    Product
                  </th>
                  <th className="py-3 px-4 text-[#7A5F4A] font-bold">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-[#7A5F4A] font-bold">Price</th>
                  <th className="py-3 px-4 text-[#7A5F4A] font-bold">Total</th>
                  <th className="py-3 px-4 text-[#7A5F4A] font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-[#F5E6DA]"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="text-gray-800 font-semibold">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.quantity}</td>
                    <td className="py-3 px-4 text-gray-700">₹{item.price}</td>
                    <td className="py-3 px-4 text-gray-700">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile-Friendly View */}
          <div className="md:hidden space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-[#F5E6DA] rounded-lg shadow-md p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                    <p className="text-gray-700 text-sm">
                      ₹{item.price} x {item.quantity}
                    </p>
                    <p className="text-gray-700 font-bold">
                      Total: ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-700 transition duration-200 mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <h2 className="text-lg md:text-xl font-bold text-[#7A5F4A] mb-4 md:mb-0">
              Total: ₹{calculateTotal()}
            </h2>
            <button className="bg-[#D2BCA5] text-black font-bold py-2 px-6 rounded-2xl hover:bg-[#C5AC92] hover:scale-105 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
