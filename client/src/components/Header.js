import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import SearchInput from './Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from '../context/cart';
import { Avatar, Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logout Successfully')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">Quick<span className='text-warning'>Shop</span></Link>
                <div className='d-flex gap-4'> 
                    <Link className="nav-link d-none cart-icon-mobile" to="/cart">
                        <Badge count={cart?.length} showZero>
                            <Avatar shape="square" size="large"><strong><i className="bi bi-cart3"></i></strong></Avatar>
                        </Badge>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav" style={{zIndex:'2'}}>
                    <ul className="navbar-nav ms-auto w-100">
                        <SearchInput />
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/categories" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/categories'>All Categories</Link></li>
                                {
                                    categories?.map((c) => (
                                        <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </li>


                        {
                            !auth.user ? (<>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">SignUp</Link>
                                </li></>) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
                                            <li><Link className="dropdown-item" to="/login" onClick={handleLogOut}>Logout</Link></li>
                                        </ul>
                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item cart-icon">
                            <Link className="nav-link" to="/cart">
                                <Badge count={cart?.length} showZero>
                                    <Avatar shape="square" size="large"><strong><i className="bi bi-cart3"></i></strong></Avatar>
                                </Badge>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;
