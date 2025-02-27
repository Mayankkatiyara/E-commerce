// import React, { useEffect, useState } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState({
//     subtotal: 0,
//     discount: 0,
//     final_price: 0,
//   });

//   // useEffect(() => {
//   //   fetchCart();
//   //   fetchTotal();
//   // }, []);
//   useEffect(() => {
//     getCart().then((data) => {
//       console.log("Cart data received:", data); // Debugging
//       const updatedCart = data.map((item) => ({
//         ...item,
//         quantity: item.quantity || 1, // Ensure quantity exists
//       }));
//       setCart(updatedCart);
//     });
//   }, []);

//   const fetchCart = async () => {
//     const response = await fetch("http://127.0.0.1:5000/api/cart");
//     const data = await response.json();
//     setCart(data);
//   };

//   const fetchTotal = async () => {
//     const response = await fetch("http://127.0.0.1:5000/api/cart/total");
//     const data = await response.json();
//     setTotal(data);
//   };

//   const updateCart = async (id, action) => {
//     await fetch("http://127.0.0.1:5000/api/cart/update", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, action }),
//     });
//     fetchCart();
//     fetchTotal();
//   };

//   return (
//     <div className="p-5 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-4">Your Shopping Cart</h2>
//       {cart.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center p-3 bg-white shadow rounded mb-2"
//         >
//           <span>
//             {item.name} - ₹{item.price} x {item.quantity}
//           </span>
//           <div>
//             <button
//               className="bg-red-500 text-white px-3 py-1 rounded"
//               onClick={() => updateCart(item.id, "decrease")}
//             >
//               -
//             </button>
//             <button
//               className="bg-green-500 text-white px-3 py-1 rounded ml-2"
//               onClick={() => updateCart(item.id, "increase")}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className="mt-5 p-5 bg-white shadow rounded">
//         <h3 className="text-xl font-semibold">Cart Summary</h3>
//         <p>Subtotal: ₹{total.subtotal}</p>
//         <p className="text-green-600">Discount: -₹{total.discount}</p>
//         <h2 className="text-2xl font-bold">
//           Final Price: ₹{total.final_price}
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default Cart;
