import React from 'react'
import homebtn from '../assets/icons/Home.png';
import mapbtn from '../assets/icons/Vector.png';

const Navbar = (props) => {
  const weatherData = props.data;

  const formatDay = (timezone) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const time = new Date();
    const localOffset = time.getTimezoneOffset() * 60000;
    const localTime = time.getTime();
    const cityEpochTime = localTime + localOffset + timezone * 1000;
    const day = new Date(cityEpochTime).getDay();

    return days[day];
  }

  const formatTime = (timezone) => {
    const time = new Date();
    const localOffset = time.getTimezoneOffset() * 60000;
    const localTime = time.getTime();
    const cityEpochTime = localTime + localOffset + timezone * 1000;
    const cityTime = new Date(cityEpochTime).toTimeString().split(':');
    const hour = cityTime[0];
    const hoursIn12HrFormat = hour % 12;
    const minutes = (cityTime[1]) % 60;
    const ampm = (hour >= 12 ? 'PM' : 'AM');

    const displayTime = (`${(hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat)} : ${(minutes < 10 ? '0' + minutes : minutes)} ${ampm}`);

    return displayTime;
  }

  return (
    <div className='Navbar'>
      <div className="homeBtn-wrapper">
        <a className='homeBtn'>WeatherWise</a>
      </div>
      <div className="daytime">{weatherData ? formatTime(weatherData.timezone) : "10 AM"}, {weatherData ? formatDay(weatherData.timezone) : 'Monday'}</div>
      <div className="otherBtn-wrapper">
        <a className="otherBtn"><img src={homebtn} alt="home" /></a>
        <a className="otherBtn"><img src={mapbtn} alt="map" /></a>
      </div>
    </div>
  )
}

export default Navbar
