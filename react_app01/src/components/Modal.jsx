import React from 'react';
import './Modal.css';  

const Modal = ({ show, onClose, cart }) => {
  if (!show) {
    return null;  
  }

  const orderTotal = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src="/assets/images/icon-order-confirmed.svg" alt="Confirmation Icon"></img>
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        
        <ul className="cart-item-container">
          {Object.values(cart).map((item) => (
            <li key={item.name} className="cart-item">
              <div>{item.name}</div>
              <div id="flex-cart-item">
                <div>x{item.quantity}</div>
                <div>@ ${item.price.toFixed(2)}</div>
              </div>
            </li>
          ))}
          <div id="order-total">Order Total: ${orderTotal.toFixed(2)}</div>
        </ul>
        <div id="new-order-button" onClick={onClose}>Start New Order</div>
      </div>
    </div>
  );
};

export default Modal;
