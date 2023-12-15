import React from 'react'
import { Link } from 'react-router-dom';

function UserMenu() {
    return (
        <>
            <div className='text-center'>
                <h4>Dashboard</h4>
                <div class="list-group">
                    <Link to='/dashboard/user/profile' class="list-group-item">Profile</Link>
                    <Link to='/dashboard/user/orders' class="list-group-item">Orders</Link>
                </div>
            </div>
        </>
    )
}

export default UserMenu;
