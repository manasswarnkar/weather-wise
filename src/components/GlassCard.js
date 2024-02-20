import React from 'react';
import search from '../assets/icons/search.png';
import map from '../assets/icons/map.png';
import pressure from '../assets/icons/pressure.png';
import wind from '../assets/icons/Wind.png';
import precipitation from "../assets/icons/precipitation.png";
const GlassCard = () => {
    return (
        <div className='GlassCard'>
            <div className="search-wrapper">
                <div className="text">Search City</div>
                <div className="search-icon"><img src={search} alt="search" /></div>
            </div>

            <div className="location">
                <div className="location-icon"><img src={map} alt="locationicon" /></div>
                <div className="text-2">Mumbai, India</div>
            </div>

            <div className="temp"></div>
            <div className="rectangle"></div>

            <div className="other">
                <div className="pressure">
                    <img src={pressure} alt="pressure" />
                    <div className="text-3">1009.8 mB</div>
                </div>

                <div className="precipitation">
                    <img src={precipitation} alt="precipitation" />
                    <div className="text-3">22%</div>
                </div>

                <div className="windspeed">
                    <img src={wind} alt="wind" />
                    <div className="text-3">6 km/h</div>
                </div>
            </div>

        </div>
    )
}

export default GlassCard
