import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome to My E-Commerce Store
      </h1>
      <ProductList />
    </div>
  );
};

export default Home;
