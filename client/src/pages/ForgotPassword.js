import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email,setEmail]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [answer,setAnswer]=useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newPassword});
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login')
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
                                Reset Password
                            </h4>
                            <hr />

                            <form action="" method="POST" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email Address" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Answer</label>
                                        <input type="text" name="answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" placeholder="Enter Your Favourite Sport" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>New Password</label>
                                        <input type="password" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control" placeholder="Enter New Password" />
                                    </div>
                                    <div className='col-md-12 mb-3'>
                                        <button className='btn btn-primary w-100' type='submit'>Reset</button>
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

export default ForgotPassword;
