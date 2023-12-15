import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment/moment';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"])
    const [changeStatus, setChangeStatus] = useState('')
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleChange = async(orderId,value) =>{
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value})
            getOrders();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='row p-5'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Orders</h1>
                {
                    orders?.map((o, i) => {
                        return (
                            <div className='border shadow'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Buyer</th>
                                            <th scope='col'>Date</th>
                                            <th scope='col'>Payment</th>
                                            <th scope='col'>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                                                    {status.map((s,i)=>(
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='container'>
                                    {
                                        o?.products?.map((p, i) => (
                                            <>
                                                <div className='row m-2'>
                                                    <div className='col-md-4'>
                                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} style={{ width: '100px' }} />
                                                    </div>
                                                    <div className='col-md-8'>
                                                        <h6>{p.name}</h6>
                                                        <h6>{p.description.substring(0, 30)}</h6>
                                                        <h5>Price: {p.price}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminOrders;
