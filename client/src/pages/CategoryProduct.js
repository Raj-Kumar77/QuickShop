import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) getProductByCat()
    }, [params?.slug])

    return (
        <div className='container mt-3'>
            <h4 className='text-center'>Category - {category?.name}</h4>
            <h6 className='text-center'>{products?.length} results found</h6>
            <div className='row py-3'>
                <div className='col-md-9 mx-auto'>
                    <div className='d-flex flex-wrap'>
                        {
                            products.map(p => (
                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name.substring(0,30)}...</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <h4 className="card-text">$ {p.price}</h4>
                                        <button className='btn btn-primary me-2' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-secondary'>Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className='m-2 p-3'>
                        {
                            product && product.length < total && (
                                <button className='btn btn-warning' onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1)
                                }}>
                                    {loading ? "Loading..." : "Loadmore"}
                                </button>
                            )
                        }
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct;
