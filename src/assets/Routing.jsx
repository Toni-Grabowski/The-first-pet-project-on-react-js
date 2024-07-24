import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Bascket from '../component/Bascket/Bascket'
import App from '../App'
import Register from '../page/Register/Register'
import Account from '../page/Account/Account'
import Autorization from '../page/Authorization/Autorization'
import CartInfo from '../page/CartInfoFull/CartInfo'

const Routing = () => {
  return (
    <div>
   <Routes>
   <Route path='/bascket' element={<Bascket />} />
        <Route path='/register' element={<Register />} />
        <Route path='/autorization' element={<Autorization />} />
        <Route path='/account' element={<Account />} />
        <Route path='/cartInfo/:id' element={<CartInfo />} />
        <Route path='*' element={<App />} />
    </Routes>

    </div>
  )
}

export default Routing