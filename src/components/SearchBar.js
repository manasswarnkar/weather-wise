// import all_the_cities from 'all-the-cities';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setQueryCity } from './actions/actions';
import axios from 'axios';


const SearchBar = (props) => {
    const city = useSelector(state => state.a);
    const [weatherData, setWeatherData] = useState(props.weatherData ? props.weatherData : null);

    const fetchData = async () => {
        console.log("1");
        try {
            console.log("2");
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=22dc02b23c3a585fab9e4e9c2e6946d9`
            );
            console.log("3");
            setWeatherData(response.data);
            console.log(response.data); //You can see all the weather data in console log
            //  console.log(weatherData);
        } catch (error) {
            console.log("fetchData error");
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("useEffect");
        fetchData();
    }, []);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setQueryCity(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div onSubmit={handleSubmit}>
            <input
                className='searchBar'
                type="text"
                placeholder="Search City"
                onChange={handleChange}
            // value={searchInput} 
            />
        </div>
    )
}

export default SearchBar
