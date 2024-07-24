import React, { useEffect , useState} from 'react'
import { useCart } from './CartContext'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom';
import './Bascket.scss'
const Bascket = () => {
    const { cartItems,  removeFromCart } = useCart()
    const [count, setCount] = useState(null)

    const navigate = useNavigate();
    const cartInfoPage = (id) => {
      navigate(`/cartInfo/${ parseInt(id)}`); 
    };
  
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0)
        setCount(total)
    }, [cartItems])
  
    return (
      <div>
        <Header/>
       
        <div className="cart__list">
          {
            cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div className="cart__border" key={index} onClick={() => cartInfoPage(item.id) }>
                  <img className='cart__img' src={item.img} alt={item.name} />
                  <p className='cart__name'>{item.name}</p>
                  <p className='cart__price'>{item.price} руб.</p>
                  <button className='button__cart' onClick={(e) =>{    e.preventDefault();
    e.stopPropagation(); removeFromCart(item.id)}}>Удалить</button>
                </div>
              ))
            ) : (
              <p className='basket__err'>Корзина пуста</p>
            )
          }
        </div>

         <p className='sum'> Цена покупки: {count}</p>
        
      </div>
    )
  }

export default Bascket