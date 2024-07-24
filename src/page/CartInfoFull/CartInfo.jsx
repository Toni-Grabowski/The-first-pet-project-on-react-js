import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../component/Bascket/CartContext';
import Header from '../../component/Header/Header';
import './CartInfoFull.scss'
import Comments from '../../component/Comments/Comments';

const CartInfo = () => {
  const { id } = useParams();
  const {cartServer, addToCart } = useCart();
  const serverCartInfo = cartServer.find(item => item.id === parseInt(id));

  if (!serverCartInfo) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    addToCart(serverCartInfo);
  };

  return (
    <div>
      <Header/>

    <div className="cart__info">

    <div className="div">
      <img className='cart__img' src={serverCartInfo.img} alt={serverCartInfo.name} />
      {/* <Comments /> */}
    </div>
      

      <div className="cart__info-text">
        <p className='cart__name-full'>{serverCartInfo.name}</p>
        <p className='cart__title'>{serverCartInfo.title}</p>

        <div className='Manufacturer'>
          <p className='Manufacturer__text'>Производитель</p>
          <p className='Manufacturer__brand'>{serverCartInfo.Manufacturer}</p>
        </div>
        <hr />
        <div className="price">
          <p className='price__text'>Цена: </p>
          <p className='cart__price'>{serverCartInfo.price}  руб.</p>
        </div>

        <button onClick={handleBuy} className='button__cart'>Купить</button>


      <div className='cart__description' >
        <h3 className='description__h3'>Описание</h3>
        <p className='description__text'>{serverCartInfo.description}</p>
      </div>
      
      </div>


    
    </div>
    
   
      
    </div>
  );
};

export default CartInfo;