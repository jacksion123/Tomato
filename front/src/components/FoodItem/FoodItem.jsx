import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContexts } from '../../Context/StoreContexts'
const FoodItem = ({id,name,price,description,image}) => {
  
  const {cartItem,addToCart,removeCart,url} = useContext(StoreContexts);
  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {
          !cartItem[id]
          ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
           <img onClick={()=>removeCart(id)} src={assets.remove_icon_red} alt="" />
           <p>{cartItem[id]}</p>
           <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>

      <div className="food-item-imfo">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
