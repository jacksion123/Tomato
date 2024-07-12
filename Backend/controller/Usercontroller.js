import UserModel from "../models/Usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import validator from "validator"
// login

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"user not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// register User

const registerUser = async(req,res)=>{
const {name,password,email} = req.body;
try {
    // checking is user Already exist
    const exists = await UserModel.findOne({email});
    if(exists){
        return res.json({success:false,message:"user Already exist"});
    }
    // validating email format & strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter your valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"Please enter strong password"})

    }
    // Hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new UserModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    const user =  await newUser.save()
    const token = createToken(user._id)
     res.json({success:true,token})

} catch (error) {
   console.log(error);    
   res.json({success:false,message:"Error"})
}
}

export {loginUser,registerUser};