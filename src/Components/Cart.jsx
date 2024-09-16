import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../Context/MyContext';


const Cart = () => {
  const { items, setItems } = useContext(MyContext);
  const [localCart, setLocalCart] = useState(items);

  useEffect(() => {
    setLocalCart(items);
  }, [items]);

  const updateItemQuantity = (id, quantity) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleChange = (e, item) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > item.rating.count) {
      e.target.value = item.rating.count;
      alert(`Out of stock! Choose below ${item.rating.count}`);
      return;
    }
    updateItemQuantity(item.id, quantity);
  };

  const handleRemoveButton = (item) => {
    removeItem(item.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  

  return (
    <div className='cart-container'>
      {localCart.map((item) => (
        <div className='cart-item bg-secondary-subtle' key={item.id}>
          <form onSubmit={handleSubmit}>
            <div className="cart-item-content">
              <div className="cart-item-image">
                <img src={item.image} alt="productImg" />
              </div>
              <div className="mx-5 ms-5 cart-item-details">
                <h4>{item.title}</h4>
                <div className="cart-item-description">
                  <div><strong>Details & Core:</strong></div>
                  <br /> {item.description}
                </div>
              </div>
              <div className="cart-item-actions">
                <div>
                  <label>Avail. quantity</label>
                  <div>{item.rating.count-(item.quantity ? item.quantity :1 )}</div>
                </div>
                <br />
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    name='count'
                    value={item.quantity || 1}
                    onChange={(e) => handleChange(e, item)}
                    max={item.rating.count}
                    required
                  />
                </div>
                <br />
                <div><label>Price: </label> ${item.price}</div>
                <br />
                <div className='remove-button' onClick={() => handleRemoveButton(item)}>Remove</div>
              </div>
            </div>
            <hr />
            <div className='cart-item-summary'>
              <div className='summary-row'>
                <div className='text-secondary'>SUBTOTAL</div>
                <div className='text-secondary'>${(item.price * (item.quantity || 1)).toFixed(2)}</div>
              </div>
              <div className='summary-row'>
                <div className='text-secondary'>SHIPPING</div>
                <div className='text-secondary'>FREE</div>
              </div>
              
              <hr />
              <div className='summary-row'>
                <div>TOTAL</div>
                <div>${(item.price * (item.quantity || 1)).toFixed(2)}</div>
              </div>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Cart;
