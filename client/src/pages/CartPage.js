import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart.js';
import { useAuth } from '../context/auth.js';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // total price 
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            })
            // return total.toLocaleString("en-us", {
            //     style: 'currency',
            //     currency: 'USD'
            // })
            return total
        } catch (error) {
            console.log(error)
        }
    }
    // delete item 
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id == pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    // get payment gateway token 
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])
    

    // razorpay checkout function 
    const checkoutHandler = async (amount) => {
        try {
            const { data: { key } } = await axios.get(`${process.env.REACT_APP_API}/api/getkey`)
            const { data: { order } } = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment/checkout`, {
                amount
            })

            const options = {
                key: key, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "QuickShop",
                description: "Ecommerce Project Transaction",
                image: "https://cdn.vectorstock.com/i/1000x1000/70/83/shop-store-icon-vector-30737083.webp",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: `${process.env.REACT_APP_API}/api/v1/payment/paymentverification`,
                prefill: {
                    name: auth?.user?.name,
                    email: auth?.user?.email,
                    contact: auth?.user?.phone
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            var razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='container pb-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your Cart Is Empty"}
                    </h4>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-md-8 shadow-sm p-3'>
                    {
                        cart?.map((p) => (
                            <>
                                <div className='row m-2'>
                                    <div className='col-md-4'>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} style={{ width: '100px' }} />
                                    </div>
                                    <div className='col-md-8'>
                                        <h6>{p.name.substring(0, 30)}...</h6>
                                        <p>{p.description.substring(0, 30)}...</p>
                                        <h5>Price: Rs {p.price}/-</h5>
                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                                <hr />
                            </>
                        ))
                    }
                </div>
                <div className='col-md-4 text-center shadow p-3'>
                    <h2>Cart Summary</h2>
                    <p>Total | Checkout | Payment</p>
                    <hr />
                    <h4>Total: Rs {totalPrice()}/- </h4>
                    {auth?.user?.address ? (
                        <>
                            <div className='mb-3'>
                                <h6>Current Address</h6>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-success w-100' onClick={() => navigate('/dashboard/user/profile')}>
                                    Update Address
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='mb-3'>
                            {
                                auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login', {
                                        state: '/cart'
                                    })}>Please login to checkout</button>
                                )
                            }
                        </div>
                    )}
                    <div className='mt-2'>
                        {
                            !auth?.token || !cart?.length ? ("") : (
                                <button className='btn btn-primary w-100' onClick={() => checkoutHandler(totalPrice())}>Checkout</button>
                                    // <button className='btn btn-primary' onClick={handlePayment} disabled={!instance || loading || !auth?.user?.address}>{loading ? "Processing..." : "Make Payment"}</button>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
