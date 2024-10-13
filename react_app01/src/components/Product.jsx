import './Product.css'
import React, { useState , useEffect } from 'react';

function Product({ category, name, image, price, addToCart }) {
  const [quantity, setQuantity] = useState(0);
  
useEffect(() => {
    addToCart({ category, name, image, price, quantity });
}, [quantity]); 

const increaseQuantity = () => {
  setQuantity((prev) => prev + 1);
};

const decreaseQuantity = () => {
  setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
};

return (
  <section id="desserts">
    <div className="img-container">
      <img src={image} alt={name} />
    </div>
    
    <div className="add-to-cart-container">
      <div className={"add-to-cart-button " + (quantity > 0 ? "hide" : "")} 
        onClick={() => increaseQuantity()}>
        <img id="cart-icon" src="/assets/images/icon-add-to-cart.svg" alt="cart icon"/>
        Add to Cart 
      </div>
    </div>

    <div className="add-to-cart-container">
      <div className={"add-to-cart-button " + (quantity > 0 ? "" : "hide")}>
        <div id="button-items">
          <div id="minus-button" onClick={() => decreaseQuantity()}>&#8854;</div>
          <div>{quantity}</div>
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