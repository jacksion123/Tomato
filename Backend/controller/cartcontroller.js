import UserModel from "../models/Usermodel.js";

const addToCart = async(req,res)=>{
try {
    let userData = await UserModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
    }
    else{
        cartData[req.body.itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added To cart"});
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"});
}
}

 const removeToCart = async(req,res)=>{
 try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData
    if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId] -= 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed from Cart"})

 } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"});
 } 
 }

const getCart = async(req,res)=>{
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({success:true,cartData})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

export {addToCart,removeToCart,getCart};