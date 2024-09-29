import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./components/Product";
import './Home.css'

const Home = () => {
  const [desserts, setDesserts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(
       "/data/data.json"
      );
      setDesserts(response.data);
    })();
  }, []);

const addToCart = (item, change) => {
  setCart((prevCart) => {
    const currentQuantity = prevCart[item.name] ? prevCart[item.name].quantity : 0;
    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) {
      const { [item.name]: _, ...rest } = prevCart;
      return rest;
    }

    return {
      ...prevCart,
      [item.name]: {...item, quantity: newQuantity,
      },
    };
  });
};

return (
  <div>
    <section className="section_one three">
      <h1 className="header">Desserts</h1>
      <div className="desserts-container columns">
        {desserts.map((dessert) => (
          <div key={dessert.name}>
          <Product 
              key={dessert.name}
              category={dessert.category}
              name={dessert.name}
              image={dessert.image.desktop}
              price={dessert.price}
              addToCart={(change) => addToCart(dessert, change)}
            />
          </div>
        ))}
      </div>
    </section>

    <section className="section_two one">
      <div className="cart-container columns">
        <h2 id="cart-title">Your Cart</h2>
        {Object.keys(cart).length === 0 ? (
          <p>Your cart is empty</p>
          ) : (
          <ul>
            {Object.values(cart).map((item) => (
              <li key={item.name}>
                <div>{item.name}</div>
                <div>{item.quantity}</div>
                <div>${item.price.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
</div>
);
};

export default Home;