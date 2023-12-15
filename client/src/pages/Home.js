import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import {useNavigate} from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart()

  const [checked, setChecked] = useState([]);
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [radio, setRadio] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)


  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`https://quick-shop-backend.vercel.app/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  // get total count 
  const getTotal = async() =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getTotal()
  },[])

  // load more 
  const loadMore = async() =>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProduct([...product, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(page == 1) return;
    loadMore()
  },[page])

  // filter by category 
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }


  // get products 
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProduct(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
  }, [checked.length, radio.length])

  
  // get filter product 
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
      setProduct(data?.products)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])


  return (
    <div className='row mt-3 p-5'>
      <div className='col-md-2 ms-4'>
        <h4 className='text-center'>Filter By Category</h4>
        <div className='d-flex flex-column'>
          {
            categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))
          }
        </div>

        {/* price filter */}
        <h4 className='text-center mt-4'>Filter By Price</h4>
        <div className='d-flex flex-column'>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {
              Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))
            }
          </Radio.Group>
        </div>
        <div className='d-flex flex-column mt-4'>
          <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
        </div>
      </div>
      <div className='col-md-9'>
        <h1 className='text-center'>All Products</h1>
        <div className='d-flex flex-wrap justify-content-center'>
          {
            product.map(p => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name.substring(0,30)}...</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <h4 className="card-text">Rs {p.price}/-</h4>
                  <button className='btn btn-primary me-2' onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className='btn btn-secondary' onClick={()=>{
                    setCart([...cart,p])
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                    toast.success('Item added to cart')
                    }}>Add to Cart</button>
                </div>
              </div>
            ))
          }
        </div>
        <div className='m-2 p-3 text-center'>
          {
            product && product.length < total && (
              <button className='btn btn-warning' onClick={(e)=>{
                e.preventDefault();
                setPage(page + 1)
              }}>
                {loading ? "Loading...":"Loadmore"}
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
