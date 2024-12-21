import React, { useState, useEffect } from "react";

const PopupModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after a slight delay
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-[#F5E6DA] rounded-lg shadow-lg p-6 w-11/12 sm:w-1/2 md:w-1/3 transform transition-transform duration-500 scale-95"
          >
            <img
              src="https://via.placeholder.com/400x200" // Replace with your image URL
              alt="Discount"
              className="w-full rounded-t-lg object-cover"
            />
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-[#7A5F4A] mb-2">
                20% OFF on All Items!
              </h2>
              <p className="text-gray-700">
                Limited time offer! Shop now and save big on all your favorite products.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 w-full bg-[#D2BCA5] text-black font-bold py-2 px-4 rounded-2xl hover:bg-[#C5AC92] hover:scale-105 transition duration-300"
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
