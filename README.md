# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



Flow of project:-
Frontend (React)
1.App.js: 
  sets up the router with routes for the home page and cart page, also includes navbar component
  
2.ProductList.js:
  Fetches and displays all the products and handles "Add to cart" and "View cart".
  
3.CartPage.js:
  Dislays all the items in the cart, allows increasing and decreasing quantities and calculates price in real time.
      Discount Logic:
      Applied to individual items (10% off for 3+ items)
      Applied to the total cart (5% off when over ₹5000)
      
4.api.js
  uses axios for making API requests , CONTAINS VARIOUS functions handeling specific API calls
  
5.servers.py
  a main Flask application that setups the backend API, Cors is enabled to allow the react frontend to communicate with the API.

  







https://github.com/user-attachments/assets/30779818-8e16-485e-9801-c48df516b2e7



