import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoutes.js'
import productRoute from './routes/productRoutes.js'
import paymentRoute from './routes/paymentRoute.js'
import Razorpay from 'razorpay'
// configure env 
dotenv.config();

// database config 
connectDB();

// rest object 
const app = express();

// razorpay integration 
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

// middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: 'https://quick-shop-frontend-beta.vercel.app',
        methods: ['POST','GET'],
        credentials: true
    }
));
// app.use(morgan('dev'))

// routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/payment',paymentRoute);

// rest api 
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to ecommerce</h1>')
})

app.get('/api/getkey',(req,res)=>{
    res.status(200).json({key: process.env.RAZORPAY_API_KEY})
})

// port 
const PORT = process.env.PORT || 8080;

// run listen 
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})
