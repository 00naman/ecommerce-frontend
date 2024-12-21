import React, { useState } from "react";
import apiClient from "../api/ApiClient";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.post("/auth/signup", formData);
      if (response.status === 201) {
        setSuccess("Signup successful! You can now log in.");
        setFormData({ name: "", email: "", password: "", phone: "" });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="bg-[#F5E6DA] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h1 className="text-2xl font-bold text-[#7A5F4A] mb-6 text-center">
          Sign Up
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">{success}</p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#7A5F4A]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#7A5F4A]"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#7A5F4A]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:border-[#7A5F4A]"
        />
        <button
          type="submit"
          className="w-full bg-[#D2BCA5] text-black font-bold py-2 px-4 rounded hover:bg-[#C5AC92] hover:scale-105 transition duration-300"
        >
          Sign Up
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#7A5F4A] hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
