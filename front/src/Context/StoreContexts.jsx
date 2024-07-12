import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContexts = createContext(null)

const StoreContextProvider = (props)=>{
    const [cartItem,setCartItem] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);


    const addToCart = async(itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{
                headers:{token}
            })
        }
    }

    const removeCart = async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const items in cartItem){
        if(cartItem[items] > 0){
        let iteminfo = food_list.find((product)=> product._id === items)
        totalAmount += iteminfo.price*cartItem[items]
        }
    }
    return totalAmount;
}

const fetchFoodList = async() => {
    const res = await axios.get(url+"/api/food/list");
    setFoodList(res.data.data)
}
const loadCartData = async(token)=>{
    const res = await axios.post(url + "/api/cart/get",{},{headers:{token}});
    setCartItem(res.data.cartData);
}


useEffect(()=>{
  
  async function loaddata(){
    await fetchFoodList()
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
  }
  loaddata()
},[])
  
    const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeCart,
    getTotalCartAmount,
    url,
    token,
    setToken
    }
    return (
        <StoreContexts.Provider value ={contextValue}>
            {props.children}
        </StoreContexts.Provider>
    )
}
export default StoreContextProvider