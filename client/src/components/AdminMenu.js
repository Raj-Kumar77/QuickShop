import React from 'react'
import { Link } from 'react-router-dom';

function AdminMenu() {
    return (
        <>
            <div className='text-center'>
                <h4>Admin Panel</h4>
                <div class="list-group">
                    <Link to='/dashboard/admin/create-category' class="list-group-item">Create Category</Link>
                    <Link to='/dashboard/admin/create-product' class="list-group-item">Create Product</Link>
                    <Link to='/dashboard/admin/products' class="list-group-item">Products</Link>
                    <Link to='/dashboard/admin/orders' class="list-group-item">Orders</Link>
                    <Link to='/dashboard/admin/users' class="list-group-item">Users</Link>
                </div>
            </div>
        </>
    )
}

export default AdminMenu;
