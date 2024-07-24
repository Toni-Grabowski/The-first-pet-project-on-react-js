import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    let local = localStorage.getItem('flag');
  return (
    <header className='header'>
        <Link to={'/'} >
            <div className="logo">
             Logo
            </div>
        </Link>


    <nav className="nav">
      <ul className="nav__list">

        <li>
            О нас
        </li>

        <li>
            Каталог
        </li>

        <li>
            Наши партнеры
        </li>

      <Link to={'/bascket'} >
        <li>
            Корзина
        </li>
      </Link>
        <li>
           {
            local ? <Link to={'/account'}> Аккаунт </Link>: <Link to={'/register'} > Войти    </Link>
           }
        </li>
   
      </ul>
    </nav>
  </header>
  )
}

export default Header