import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart

  const calculateTotalAmount = () => {
    let total = 0;

    // Loop through the cart items and calculate the total
    cart.forEach((item) => {
      const cost = parseFloat(item.cost.substring(1)); // Convert cost from "$10.00" to 10.00
      total += cost * item.quantity; // Add the cost * quantity to total
    });

    return total;
  };

  const handleContinueShopping = (e) => {
    // Prevent default behavior if needed (e.g., for form submission)
    e.preventDefault();

    // Call the onContinueShopping function passed from the parent component
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

   // Increment quantity of a plant
   const handleIncrement = (name) => {
    const item = cart.find(item => item.name === name);
    if (item) {
      dispatch(updateQuantity({ name, quantity: item.quantity + 1 }));
    }
  };

  // Decrement quantity of a plant
  const handleDecrement = (name) => {
    const item = cart.find(item => item.name === name);
    if (item) {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ name, quantity: item.quantity - 1 }));
      } else {
        // If quantity would drop to 0, remove the item from the cart
        dispatch(removeItem(name));
      }
    }
  };

  // Function to remove an item from the cart
  const handleRemove = (name) => {
    dispatch(removeItem(name)); // Dispatch removeItem to remove the item from the cart
  };

  // Calculate the total cost for an individual item (quantity * unit price)
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // Extract numeric value from "$xx.xx"
    return unitPrice * item.quantity; // Multiply unit price with quantity
  };



  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


