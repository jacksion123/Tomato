import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/OrderRoutes.js";

// app congif
const app = express();
const port = process.env.PORT ||  4000;


// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB()

// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port,()=>{
    console.log(`Server is running ${port}`);
})


// mongodb+srv://nakul:nakul1234@cluster0.wx5kngk.mongodb.net/?