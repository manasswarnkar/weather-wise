import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className="homeBtn-wrapper">
        <a className='homeBtn'>WeatherWise</a>
      </div>
      <div className="otherBtn-wrapper">
        <a className="otherBtn">home</a>
        <a className="otherBtn">map</a>
        <a className="otherBtn">about</a>
      </div>
    </div>
  )
}

export default Navbar
