import './Product.css'
import React, { useState , useEffect } from 'react';
import addToCartIcon from "../images/icon-add-to-cart.svg";

const Product = ({ category, name, image, thumbnail, price, quantity, updateQuantity, addToCart }) => {
 
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity); 
    console.log('increaseQuantity - new quantity:', newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0; 
    updateQuantity(newQuantity); 
    console.log('decreaseQuantity - new quantity:', newQuantity);
  };

  const handleAddToCart = () => {
    addToCart({ 
      name, 
      price, 
      thumbnail
    });
    console.log('addToCart called for:', name);
    console.log('addToCart - image:', thumbnail);
  };

  return (
    <section id="dessert-details">
      <div className="img-container">
        <img src={`${process.env.PUBLIC_URL}/${image}`} alt={name} />
      </div>
      
      <div className="add-to-cart-container">
        <div className={"add-to-cart-button " + (quantity > 0 ? "hide" : "")} 
          onClick={handleAddToCart}>
            <div>
              <img id="cart-icon" src={addToCartIcon} alt="cart icon"/>
            </div>
            <div>Add to Cart </div>
        </div>
      </div>

      <div className="add-to-cart-container">
        <div className={"add-to-cart-button " + (quantity > 0 ? "" : "hide")}>
          <div id="button-items">
            <div id="minus-button" onClick={() => decreaseQuantity()}>&#8854;</div>
            <div id="quantity">{quantity}</div>
            <div id="plus-button" onClick={() => increaseQuantity()}>&#8853;</div>
          </div>
        </div>
      </div>

      <div className="item-details">
        <h4>{category}</h4>
        <h3>{name}</h3>
        <p id="formatted-price">${price.toFixed(2)}</p>
      </div>
    </section>
  );
}

export default Product;