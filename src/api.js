import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Flask backend API

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch cart items
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// Add product to cart - fixed to send complete product data
export const addToCart = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart/add`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Remove product from cart
export const removeFromCart = async (productId) => {
  try {
    await axios.post(`${API_BASE_URL}/cart/remove`, { id: productId });
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// Update product quantity in the cart
export const updateCart = async (productId, newQuantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart/update`, {
      id: productId,
      action: newQuantity > 0 ? "increase" : "decrease",
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};
