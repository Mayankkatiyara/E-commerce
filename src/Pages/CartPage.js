import { useEffect, useState } from "react";
import { getCart, updateCart, removeFromCart } from "../api";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      console.log("Cart data:", data); // Debugging
      const updatedCart = data.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Ensure default quantity of 1
      }));
      setCart(updatedCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(id);
        setCart(cart.filter((item) => item.id !== id));
      } else {
        const action =
          newQuantity > cart.find((item) => item.id === id).quantity
            ? "increase"
            : "decrease";
        await updateCart(id, action);
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Calculate Subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Apply Discounts
  let itemDiscount = 0;
  let totalDiscount = 0;

  cart.forEach((item) => {
    if (item.quantity >= 3) {
      itemDiscount += item.price * item.quantity * 0.1; // 10% off per item
    }
  });

  if (subtotal > 5000) {
    totalDiscount = subtotal * 0.05; // 5% off on total cart
  }

  // Final Price
  const finalPrice = subtotal - itemDiscount - totalDiscount;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-4 mb-2 rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4 rounded"
                  />
                )}
                <h3>
                  {item.name} - ₹{item.price} x {item.quantity}
                </h3>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Subtotal, Discounts & Final Price */}
          <div className="mt-6 p-4 border-t">
            <p className="text-lg">Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p className="text-green-600">
              Item Discounts: -₹{itemDiscount.toFixed(2)}
            </p>
            <p className="text-green-600">
              Total Cart Discount: -₹{totalDiscount.toFixed(2)}
            </p>
            <p className="text-xl font-bold">
              Final Price: ₹{finalPrice.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
