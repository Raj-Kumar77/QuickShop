import React from 'react'
import AdminMenu from '../../components/AdminMenu';

const Users = () => {
  return (
    <div className='container-fluid'>
      <div className='row p-5'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1>Users</h1>
        </div>
      </div>
    </div>
  )
}

export default Users;
