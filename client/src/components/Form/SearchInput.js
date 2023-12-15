import React from 'react'
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
            setValues({...values,results: data})
            navigate("/search")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='m-auto px-5 search-boxx' style={{flex:'1'}}>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values, keyword:e.target.value})} />
                <button className="btn btn-warning" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput;