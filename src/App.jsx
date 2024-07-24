import { useState, useEffect } from 'react'
import './App.scss'

import { useCart } from './component/Bascket/CartContext'
import Header from './component/Header/Header'
import { useNavigate } from 'react-router-dom';


const App = () => {
 
  const {cartServer} = useCart();
  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(cartServer);

  const search = (e) => {
    const value = e.target.value;
    setInputSearch(value);

    const filters = cartServer.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filters);
  };

  const cartInfoPage = (id) => {
    navigate(`/cartInfo/${ parseInt(id)}`); 
  };

  useEffect(() => {
    setFilteredItems(cartServer); 
  }, [cartServer]);

  return (
    <>
      <Header />
      <main className='main'>
        <div className="search">
          <input type="text" className='search__input' value={inputSearch} onChange={search  } />
        </div>
        <div className="cart">
            <h2 className='cart__h2'>Товары</h2>
          <div className="cart__list">
             
            {filteredItems.map((item) => (
              <div className="cart__border" key={item.id} onClick={() => cartInfoPage(item.id)}>
                <img className='cart__img' src={item.img} alt={item.name} />
                <p className='cart__name'>{item.name}</p>
                <p className='cart__price'>{item.price}  руб.</p>
                <button className='button__cart'>Подробнее</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;