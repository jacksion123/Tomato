import React, { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContexts } from '../../Context/StoreContexts'
import axios from 'axios'
const Verify = () => {
    const [searchParams,setSearchParam] = useSearchParams()
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
   const {url} = useContext(StoreContexts);
   const navigate = useNavigate()
   const verifyPayment = async()=>{
    const res = await axios.post(url+"/api/order/verify",{success,orderId})
    if(res.data.success){
     navigate("/myorders");
    }else{
        navigate("/")
    }
   }
   useEffect(()=>{
    verifyPayment()
   },[])
    
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify
