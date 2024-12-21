import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './components/Cart';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import Signup from './pages/Signup';
import HeaderCarousel from './components/HeaderCarousel';
import Footer from './components/Footer';
import PopupModal from './components/PopupModal';

const App = () => {
  return (
    <Router>
      <Navbar />
      <PopupModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <HeaderCarousel/>
      <Footer/>

    </Router>
  );
};

export default App;
