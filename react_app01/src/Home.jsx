import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./components/Product";
import Modal from "./components/Modal";
import EmptyCart from "./images/illustration-empty-cart.svg"
import './Home.css'

const Home = () => {
  const [desserts, setDesserts] = useState([]);
  const [cart, setCart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { 
    axios.get(`${process.env.PUBLIC_URL}/data/data.json`) 
      .then(response => { 
        setDesserts(response.data); 
      }) 
      .catch(error => { 
        console.error('Error fetching data:', error); 
      }); 
    }, []);

  const addToCart = (product) => {
    const { name, price, image } = product;
    setCart((prevCart) => {
      const newCart = {
        ...prevCart,
        [name]: {
          name,
          price,
          quantity: (prevCart.quantity || 0) + 1,
          thumbnail: image.thumbnail,
        },
      };
      console.log('cart:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (product, quantity) => { 
    setCart((prevCart) => { 
      if (quantity <= 0) { 
        const { [product.name]: _, ...rest } = prevCart; 
        return rest; 
      } 
      return { 
        ...prevCart, 
        [product.name]: { 
          ...product, 
          quantity, 
          thumbnail: product.image.thumbnail, 
        }, 
      }; 
    }); 
  };

   
const handleOrderConfirm = () => {
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};

const totalQuantity = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

return (
  <div className="section-container">
    <section className="section three">
      <h1 className="header">Desserts</h1>
      <div className="desserts-container columns">
        {desserts.map((dessert) => (
          <div key={dessert.name}>
            <Product 
              key={dessert.name}
              category={dessert.category}
              name={dessert.name}
              image={dessert.image.desktop}
              thumbnail={dessert.image.thumbnail}
              price={dessert.price}
              quantity={cart[dessert.name]?.quantity || 0}
              updateQuantity={(quantity) => updateQuantity(dessert, quantity)}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </section>

    <section className="section one">
      <div className="cart-container">
        <h2 id="cart-title">Your Cart ({totalQuantity})</h2>
        {Object.keys(cart).length === 0 ? (
          <div id="empty-container">
            <img id="empty-cart-img" src={EmptyCart} alt="empty img"></img>
            <p>Your added items will appear here</p>
          </div>
          ) : (
          <ul id="cart-item-info">
            {Object.values(cart).map((item) => (
              <li key={item.name}>
                <div>{item.name}</div>
                <div id="align-cart-items">
                  <div id="quantity-cart">{item.quantity}x</div>
                  <div id="price-cart">@${item.price.toFixed(2)}</div>
                  <div id="total-price-cart">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </li>
            ))}
            <div id="confirm-order-button" onClick={handleOrderConfirm}>Confirm Order</div>
          </ul>
        )}
      </div>
    </section>
    <Modal show={isModalOpen} onClose={handleCloseModal} cart={cart} />
</div>
);
};

export default Home;