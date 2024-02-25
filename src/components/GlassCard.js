import React from 'react';
import search from '../assets/icons/search.png';
import map from '../assets/icons/map.png';
import pressure from '../assets/icons/pressure.png';
import wind from '../assets/icons/Wind.png';
import precipitation from "../assets/icons/precipitation.png";
import SearchBar from './SearchBar.js';
import PropTypes from 'prop-types';



const GlassCard = (props) => {
    return (
        <div className='GlassCard'>
            <div className="search-wrapper">
                <div className="text"><SearchBar/></div>
                <div className="search-icon"><img src={search} alt="search" /></div>
            </div>

            <div className="location">
                <div className="location-icon"><img src={map} alt="locationicon" /></div>
                <div className="text-2">{props.city}</div>
            </div>

            <div className="temp">
                <div className="temp-text">{Math.round(props.temp)} °C</div>
            </div>
            <div className="rectangle"></div>

            <div className="other">
                <div className="pressure">
                    <img src={pressure} alt="pressure" />
                    <div className="text-3">{props.pressure} mB</div>
                </div>

                <div className="precipitation">
                    <img src={precipitation} alt="precipitation" />
                    <div className="text-3">{props.humidity}%</div>
                </div>

                <div className="windspeed">
                    <img src={wind} alt="wind" />
                    <div className="text-3">{props.windSpeed} m/s</div>
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