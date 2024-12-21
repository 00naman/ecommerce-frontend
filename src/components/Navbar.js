import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";
import { FaShoppingCart, FaUserAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/get-product");
        const productData = response.data.products;

        setProducts(productData);

        // Extract unique categories dynamically
        const uniqueCategories = Array.from(
          new Set(productData.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Check for user in localStorage or sessionStorage
    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    navigate("/search", { state: { filteredProducts } });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`bg-[#7A5F4A]/80 backdrop-blur-sm text-[#F5E6DA] shadow-lg p-4 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/3"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 rounded-l bg-[#F5E6DA] text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#D2BCA5] hover:bg-[#C5AC92] py-2 px-4 rounded-r"
          >
            Search
          </button>
        </form>

        {/* Logo */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="text-[#F5E6DA] font-extrabold text-4xl italic hover:text-[#C5AC92] transition"
          >
            M
          </Link>
        </div>

        {/* Categories Dropdown */}
        <div className="hidden md:flex relative group">
          <button className="bg-[#D2BCA5] py-2 px-4 rounded focus:outline-none hover:bg-[#C5AC92]">
            Explore Categories
          </button>
          <div className="absolute hidden group-hover:block bg-beige-100 text-gray-800 shadow-lg rounded-lg mt-2 w-96">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Links with Icons */}
        <div className="flex space-x-4 items-center">
          <Link
            to="/cart"
            className="flex items-center hover:text-[#D2BCA5] transition duration-200"
          >
            <FaShoppingCart className="mr-2" />
            <span className="hidden md:inline">Cart</span>
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
<span className="text-sm font-bold">{user.name}</span>
<button
                onClick={handleLogout}
                className="flex items-center bg-brownie-100 text-white py-1 px-3 rounded hover:bg-brownie-200 transition duration-200"
              >
                <FaSignOutAlt className="" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center hover:text-[#D2BCA5] transition duration-200"
            >
              <FaUserAlt className="mr-2" />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form onSubmit={handleSearch} className="flex md:hidden mt-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 rounded-l bg-[#F5E6DA] text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#D2BCA5] hover:bg-[#C5AC92] py-2 px-4 rounded-r"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
