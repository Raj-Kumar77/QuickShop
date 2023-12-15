import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  // context 
  const [auth, setAuth] = useAuth()
  // state 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // get user data 
  useEffect(()=>{
    const {email,name,phone,address} = auth?.user;
    setName(name)
    setPhone(phone)
    setAddress(address)
    setEmail(email)
  },[auth?.user])

  // form function  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
          <div className="py-3 py-md-4 checkout">
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="shadow bg-white p-3">
                    <h4 className="text-primary text-center">
                      User Profile
                    </h4>
                    <hr />

                    <form action="" method="POST" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label>Full Name</label>
                          <input type="text" name="fullname" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Full Name" />
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>Email Address</label>
                          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Email Address" disabled />
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>Password</label>
                          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>Phone Number</label>
                          <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter Phone Number" />
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>Full Address</label>
                          <textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" rows="2"></textarea>
                        </div>
                        <div className='col-md-12 mb-3'>
                          <button className='btn btn-primary w-100'>Update</button>
                        </div>
                      </div>
                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
