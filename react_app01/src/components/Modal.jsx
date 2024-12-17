import React from 'react';
import './Modal.css';  
import orderConfirmedIcon from "../images/icon-order-confirmed.svg";

const Modal = ({ show, cart, onClose }) => {
  if (!show) {
    return null;  
  }

  const orderTotal = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
  const filteredCartItems = Object.values(cart).filter(item => item.quantity > 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={orderConfirmedIcon} alt="Confirmation Icon"></img>
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        
        <ul className="cart-item-container">
          {filteredCartItems.map((item) => (
            <li key={item.name} className="cart-item">
              <div className="cart-item-image"> 
                <img src={`${process.env.PUBLIC_URL}/${item.thumbnail}`} alt={`${item.name} thumbnail`}/> 
              </div>
              <div className="cart-item-details">
                <div>{item.name}</div>
                <div id="flex-cart-item">
                  <div>x{item.quantity}</div>
                  <div>@ ${item.price.toFixed(2)}</div>
                </div>
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
