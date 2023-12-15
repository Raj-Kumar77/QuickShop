import React from 'react'
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory()
  return (
    <div className='container'>
      <div className='row py-5'>
        {categories.map((c)=>(
            <div className='col-md-6 mb-3' key={c._id}>
                <Link to={`/category/${c.slug}`} className='btn btn-outline-secondary m-2 w-100 p-3'>{c.name}</Link>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Categories;