import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');
    const [answer,setAnswer]=useState('');

    const navigate = useNavigate();

    // form function  
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    return (
        <div className="py-3 py-md-4 checkout">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="shadow bg-white p-3">
                            <h4 className="text-primary text-center">
                                SignUp Form
                            </h4>
                            <hr />

                            <form action="" method="POST" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="fullname" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Enter Full Name" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email Address" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" placeholder="Enter Phone Number" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Full Address</label>
                                        <textarea name="address" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" rows="2"></textarea>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Question (Required for password reset)</label>
                                        <textarea name="answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" rows="2" placeholder='What is your favourite sport?'></textarea>
                                    </div>
                                    <div className='col-md-12 mb-3'>
                                        <button className='btn btn-primary w-100'>Submit</button>
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

export default Register;
