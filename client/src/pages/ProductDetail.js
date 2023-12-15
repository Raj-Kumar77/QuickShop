import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart()

  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProduct,setRelatedProduct] = useState([])

  // initial details 
  useEffect(()=>{
    if(params?.slug) getProduct()
  },[params?.slug])

  // const get product 
  const getProduct = async() =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product._id,data?.product.category._id)
    } catch (error) {
      console.log(error)
    }
  }

  // get similar product 
  const getSimilarProduct = async(pid,cid) =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProduct(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div>
      <div className='row container mt-4 mb-2'>
        <div className='col-md-6'>
          <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className='card-img-top img-fluid' alt={product.name} style={{width: '80%',float:'right',height:'25rem',objectFit:'contain'}}/>
        </div>
        <div className='col-md-6'>
          <h1>Product Details</h1>
          <p><b>Name</b> : {product.name}</p>
          <p><b>Description</b> : {product.description}</p>
          <p><b>Price</b> : Rs {product.price}/-</p>
          <p><b>Category</b> : {product?.category?.name}</p>
          <button className='btn btn-secondary' onClick={()=>{
                    setCart([...cart,product])
                    localStorage.setItem('cart',JSON.stringify([...cart,product]))
                    toast.success('Item added to cart')
                    }}>Add To Cart</button>
        </div>
      </div>
      <hr/>
      <div className='row container p-5'>
        <h6>Similar product</h6>
        {relatedProduct.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
        <div className='d-flex flex-wrap'>
          {
            relatedProduct.map(p => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name.substring(0,30)}...</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <h4 className="card-text">$ {p.price}</h4>
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
      </div>
    </div>
  )
}

export default ProductDetail;
