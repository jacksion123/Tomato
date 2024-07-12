import React, { useContext,useEffect,useState} from 'react'
import './Placeholder.css'
import { StoreContexts } from '../../Context/StoreContexts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItem,url} = useContext(StoreContexts)

  const [data,setData] = useState({
    firstName : "",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  

  const onChangeHandla = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeorder = async(e)=>{
  e.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
  if(cartItem[item._id]>0){
    let itemInfo = item;
    itemInfo["quantity"] = cartItem[item._id]
    orderItems.push(itemInfo)
  }
  })
  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount()+2,

  }
  let res = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if(res.data.success){
    const {session_url} = res.data;
    window.location.replace(session_url);
  }
  else{
    alert("Error")
  }
  }
  const navigate = useNavigate()
  useEffect(()=>{
   if(!token){
    navigate("/cart")
   }else if(getTotalCartAmount() === 0){
    navigate("/cart")
   }
  },[token])
    return (
    <form onSubmit={placeorder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input required name='firstName' onChange={onChangeHandla} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandla} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandla} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandla} value={data.street} type="text" placeholder='Street' />

        <div className="multifields">
          <input required name='city' onChange={onChangeHandla} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandla} value={data.state} type="text" placeholder='State' />
        </div>

        <div className="multifields">
          <input required name='zipcode' onChange={onChangeHandla} value={data.zipcode} type="text" placeholder='Zip Code'/>
          <input required name='country' onChange={onChangeHandla} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandla} value={data.phone} type="text" placeholder='phone'/>
      </div>
      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
