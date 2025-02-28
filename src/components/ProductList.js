import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching products..."); 
    getProducts()
      .then((data) => {
        console.log("Products received:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

 
  const handleAddToCart = async (product) => {
    const updatedCart = {
      ...cart,
      [product.id]: (cart[product.id] || 0) + 1,
    };

    setCart(updatedCart); 

    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      console.log(`Added ${product.name} to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-3 rounded-md"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>

            {cart[product.id] ? (
              <button
                onClick={() => navigate("/cart")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                View Cart
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:scale-105 transition-transform"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
