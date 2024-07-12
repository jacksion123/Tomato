import mongoose from "mongoose";

 export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://nakul:nakul1234@cluster0.wx5kngk.mongodb.net/Food-del').then(()=> console.log("DB Connected"));

}