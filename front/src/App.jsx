import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Carts from './pages/Cart/Carts'
import PlaceOrder from './pages/Placeholder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Loginpop from './components/LoginPopup/Loginpop'
import Verify from './pages/verify/Verify'
import Myorder from './pages/Myorder/Myorder'


const App = () => {
  const [showLogin,setShowLogin]  = useState(false)
  return (
   <>
   {
    showLogin?<Loginpop setShowLogin={setShowLogin}/> : <></>
   }
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
       <Route path='/cart' element={<Carts/>}/>
       <Route path='/order' element={<PlaceOrder/>}/>
       <Route path ="/verify" element={<Verify/>}/>
       <Route path='/myorders' element={<Myorder/>}/>
      </Routes>
    </div>
    <Footer/>
   </>
  )
}

export default App
