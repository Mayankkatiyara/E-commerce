from flask import Flask, jsonify, url_for,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend

from flask import send_from_directory

@app.route('/static/img/<path:filename>')
def serve_static(filename):
    return send_from_directory('static/img', filename)

cart_items = []

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify([
        {"id": 1, "name": "iPhone 16", "price": 1099,"image": url_for('static', filename='img/iphone16.jpeg', _external=True)},
        {"id": 2, "name": "Google Pixel", "price": 199, "image": url_for('static', filename='img/pixel.jpeg', _external=True)},
        {"id": 3, "name": "MacBook Pro", "price": 2499, "image": url_for('static', filename='img/macbookpro.jpeg', _external=True)},
        {"id": 4, "name": "Samsung Galaxy S24", "price": 999, "image": url_for('static', filename='img/s24ultra.jpeg', _external=True)},
        {"id": 5, "name": "Nike Air Jordan Retro 6", "price": 999, "image": url_for('static', filename='img/retro6.jpeg', _external=True)},
        {"id": 6, "name": "Denim Shirt", "price": 999, "image": url_for('static', filename='img/shirt.jpeg', _external=True)},
        {"id": 7, "name": "Blazzer Men`s", "price": 999, "image": url_for('static', filename='img/blazer.jpeg', _external=True)},
        {"id": 8, "name": "Hoodie Men`s", "price": 999, "image": url_for('static', filename='img/hoodie.jpeg', _external=True)},
        {"id": 9, "name": "Bag", "price": 999, "image": url_for('static', filename='img/bag.jpeg', _external=True)},
        {"id": 10, "name": "Perfume", "price": 999, "image": url_for('static', filename='img/perfume.jpg', _external=True)},
        {"id": 11, "name": "Statue of Liberty", "price": 999, "image": url_for('static', filename='img/statue.jpeg', _external=True)},
        {"id": 12, "name": "Water Bottle", "price": 999, "image": url_for('static', filename='img/bottle.jpeg', _external=True)}
    ])

@app.route('/api/cart', methods=['GET'])
def get_cart():
    return jsonify(cart_items)

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    global cart_items
    data = request.json
    product_id = data.get('id')

    for item in cart_items:
        if item['id'] == product_id:
            item['quantity'] += 1  # Increase quantity if already in cart
            return jsonify(cart_items), 200

    # Add new item if not found
    cart_items.append({**data, "quantity": 1})
    return jsonify(cart_items), 200

@app.route('/api/cart/update', methods=['POST'])
def update_cart():
    global cart_items
    data = request.json
    product_id = data.get('id')
    action = data.get('action')  # 'increase' or 'decrease'
    
    # Find the item in the cart
    for i, item in enumerate(cart_items):
        if item['id'] == product_id:
            if action == "increase":
                cart_items[i]['quantity'] += 1
            elif action == "decrease" and cart_items[i]['quantity'] > 1:
                cart_items[i]['quantity'] -= 1
            break
    
    return jsonify(cart_items), 200

# Add a route to remove items from the cart
@app.route('/api/cart/remove', methods=['POST'])
def remove_from_cart():
    global cart_items
    data = request.json
    product_id = data.get('id')
    
    # Remove the item from the cart
    cart_items = [item for item in cart_items if item['id'] != product_id]
    
    return jsonify(cart_items), 200

@app.route('/api/cart/total', methods=['GET'])
def calculate_cart_total():
    global cart_items
    total_price = sum(item['price'] * item['quantity'] for item in cart_items)
    discount = 0

    for item in cart_items:
        if item['quantity'] >= 3:
            discount += (item['price'] * item['quantity']) * 0.10  # 10% discount on individual item

    if total_price > 5000:
        discount += (total_price - discount) * 0.05  # 5% discount on total cart

    final_price = total_price - discount

    return jsonify({
        "subtotal": total_price,
        "discount": round(discount, 2),
        "final_price": round(final_price, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)


#The current code uses local component state and API calls to manage the cart.