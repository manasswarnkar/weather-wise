// import all_the_cities from 'all-the-cities';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setQueryCity } from './actions/actions';

const SearchBar = (props) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setQueryCity(e.target.value));
    }

    return (
        <div>
            <form className='form' role='search' onSubmit={props.submit}>
                <input
                    className='searchBar'
                    type="search"
                    placeholder="Search City"
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default SearchBar
