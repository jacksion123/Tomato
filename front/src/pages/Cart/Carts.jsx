import React, { useContext } from 'react'
import './Cart.css';
import { StoreContexts } from '../../Context/StoreContexts';
import { useNavigate } from 'react-router-dom';
const Carts = () => {
  const {cartItem,food_list,removeCart,getTotalCartAmount,url} = useContext(StoreContexts)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cartItems">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItem[item._id] >0)
          {
            return (
              <div>
            <div className="cart-item-title cart-items-item">
             <img src={url+"/images/"+item.image} alt="" />
             <p>{item.name}</p>
             <p>Rs {item.price}</p>
             <p>{cartItem[item._id]}</p>
             <p>Rs {item.price*cartItem[item._id]}</p>
             <p onClick={()=> removeCart(item._id)} className='cross'>x</p>
            </div>
            <hr />
            </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
             <p>Subtotal</p>
             <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            
          </div>
          <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Carts
