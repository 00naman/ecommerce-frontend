import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscription = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Thank you for subscribing!");
      setEmail("");
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <footer className="bg-[#7A5F4A] text-[#F5E6DA] py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* About Us Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">About Us</h2>
          <p className="text-sm">
            Welcome to Mytalorzone By Sahiba! We are a clothing brand that offers creative, unique, and diverse clothing for girls, including traditional, western, and trendy styles.
          </p>
        </div>

        {/* Connect With Us Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Connect With Us</h2>
          <form onSubmit={handleSubscription} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 rounded bg-[#F5E6DA] text-black focus:outline-none focus:ring-2 focus:ring-[#C5AC92]"
            />
            <button
              type="submit"
              className="py-2 px-4 rounded bg-[#D2BCA5] text-black font-bold hover:bg-[#C5AC92] hover:scale-105 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="text-sm">{message}</p>}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center border-t border-[#C5AC92] pt-4">
        <p className="text-sm">© 2024 Mytalorzone By Sahiba. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
