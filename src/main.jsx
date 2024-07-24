import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import Routing from './assets/Routing.jsx'
import{ CartProvider } from './component/Bascket/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <CartProvider>
        <Routing />
      </CartProvider>
   {/* </React.StrictMode> */}
  </BrowserRouter>

)
