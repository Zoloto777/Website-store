import { Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Cart from './pages/cart/Cart.jsx'
import Home from './pages/home/Home.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path= '/verify' element={<Verify />}/>
          <Route path= '/myorders' element={<MyOrders />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
