import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProducts from './pages/admin/UpdateProducts';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrders';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product/:slug' element={<ProductDetail />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/category/:slug' element={<CategoryProduct />}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='user' element={<Dashboard />}></Route>
            <Route path='user/profile' element={<Profile />}></Route>
            <Route path='user/orders' element={<Orders />}></Route>
          </Route>
          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />}></Route>
            <Route path='admin/create-category' element={<CreateCategory />}></Route>
            <Route path='admin/create-product' element={<CreateProduct />}></Route>
            <Route path='admin/products' element={<Products />}></Route>
            <Route path='admin/products/:slug' element={<UpdateProducts />}></Route>
            <Route path='admin/users' element={<Users />}></Route>
            <Route path='admin/orders' element={<AdminOrders />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/paymentsuccess' element={<PaymentSuccess/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
