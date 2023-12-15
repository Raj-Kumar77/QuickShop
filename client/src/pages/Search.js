import React from 'react'
import { useSearch } from '../context/search';

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <div className='container'>
      <div className='text-center'>
        <h1>Search Results</h1>
        <h6>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>
        <div className='d-flex flex-wrap mt-4'>
          {
            values?.results.map(p => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <h4 className="card-text">$ {p.price}</h4>
                  <button className='btn btn-primary me-2'>More Details</button>
                  <button className='btn btn-secondary'>Add to Cart</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Search;
