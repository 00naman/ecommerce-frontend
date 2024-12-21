import React, { useState } from "react";
import apiClient from "../api/ApiClient";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.post("/auth/login", formData);
      if (response.status === 200) {

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify({ userId: response.data.userId, name: response.data.name }));
        } else {
          sessionStorage.setItem("user", JSON.stringify({ userId: response.data.userId, name: response.data.name }));
        }
        

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  return (
    <div className="bg-[#F5E6DA] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h1 className="text-2xl font-bold text-[#7A5F4A] mb-6 text-center">
          Log In
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">{success}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#7A5F4A]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#7A5F4A]"
        />
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-[#7A5F4A]">
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-[#D2BCA5] text-black font-bold py-2 px-4 rounded hover:bg-[#C5AC92] hover:scale-105 transition duration-300"
        >
          Log In
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#7A5F4A] hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
