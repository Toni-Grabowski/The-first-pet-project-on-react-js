import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartServer, setCartServer] = useState([]);
  useEffect(() => {
    fetch('') // получение данных  и сохранение с корзины
      .then((response) => response.json())
      .then((data) => setCartItems(data));
  }, []);

  useEffect(() => {
    fetch('') // получение карточек с сервера и последующее отображениена старницах
      .then((response) => response.json())
      .then((data) => setCartServer(data));
  }, []);

  const addToCart = async (item) => {
    const response = await fetch('', { // добавление товара в корзину
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    if (response.ok) {
      const newItem = await response.json();
      setCartItems((prevItems) => [...prevItems, newItem]);
    } else {
      console.error('Failed to add item to the server');
    }
  };
  const removeFromCart = async (itemId) => {
    const response = await fetch(``, { //удаление товара из корзины по itemId
      method:'DELETE'
    })

    if(response.ok) {
      setCartItems((filterItem) => filterItem.filter((item)  => item.id !== itemId)) // фильтрация для нахождения нужной карточки
    } else{
      alert(`ERROR`)
    }
  }
  return (
    <CartContext.Provider value={{ cartItems, cartServer, addToCart, removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};
