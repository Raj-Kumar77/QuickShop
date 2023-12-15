import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment/moment';

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
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
                        <td>{o?.status}</td>
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
    </div>
  )
}

export default Orders;
