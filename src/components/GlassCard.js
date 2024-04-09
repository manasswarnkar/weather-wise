import React, { useState, useEffect } from 'react';
import search from '../assets/icons/search.png';
import map from '../assets/icons/map.png';
import pressure from '../assets/icons/pressure.svg';
import wind from '../assets/icons/Wind.svg';
import precipitation from "../assets/icons/precipitation.svg";
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';


const GlassCard = (props) => {
    const city = useSelector(state => state.a);
    const [weatherData, setWeatherData] = useState(props.weatherData ? props.weatherData : null);
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchData = async (query) => {
        console.log("1");
        try {
            console.log("2");
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
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
        fetchData(city);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(city);
    };
    return (
        <div className='GlassCard'>
            <div className="search-wrapper">
                <div className="text"><SearchBar submit={handleSubmit} /></div>
                <div className="search-icon"><img src={search} alt="search" /></div>
            </div>

            <div className="location">
                <div className="location-icon"><img src={map} alt="locationicon" /></div>
                <div className="text-2">{weatherData.name}</div>
            </div>

            <div className="temp">
                <div className="temp-text">{Math.round(weatherData.main.temp)} °C</div>
            </div>
            <div className="rectangle"></div>

            <div className="other">
                <div className="pressure">
                    <img src={pressure} alt="pressure" />
                    <div className="text-3">{weatherData.main.pressure} mB</div>
                </div>

                <div className="precipitation">
                    <img src={precipitation} alt="precipitation" />
                    <div className="text-3">{weatherData.main.humidity}%</div>
                </div>

                <div className="windspeed">
                    <img src={wind} alt="wind" />
                    <div className="text-3">{weatherData.wind.speed} m/s</div>
                </div>
            </div>

        </div>
    )
}

export default GlassCard

GlassCard.propTypes = {
    city: PropTypes.string,
    temp: PropTypes.number,
    desc: PropTypes.string,
    time: PropTypes.string,
    humidity: PropTypes.number,
    pressure: PropTypes.number,
    windSpeed: PropTypes.number,
    day: PropTypes.string
}

GlassCard.defaultProps = {
    city: "Delhi",
    temp: 15,
    desc: "Mostly Cloudy",
    time: "10 PM",
    humidity: 0,
    pressure: 0,
    windSpeed: 0,
    day: "Null"
}