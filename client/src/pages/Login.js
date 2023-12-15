import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || '/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="py-3 py-md-4 checkout">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="shadow bg-white p-3">
                            <h4 className="text-primary text-center">
                                Login Form
                            </h4>
                            <hr />

                            <form action="" method="POST" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email Address" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                                    </div>
                                    <div className='col-md-12 mb-3'>
                                        <button className='btn btn-primary w-100'>Submit</button>
                                    </div>
                                    <div className='col-md-12 mb-3'>
                                        <Link to='/forgot-password' className='btn btn-danger w-100'>Forgot Password</Link>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;
