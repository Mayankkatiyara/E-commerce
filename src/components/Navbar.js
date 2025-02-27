import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold text-yellow-400">E-Commerce</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>
        <Link to="/cart" className="hover:text-yellow-400">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
