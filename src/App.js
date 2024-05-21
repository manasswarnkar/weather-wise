import React, { useState, useLayoutEffect } from 'react'
import './App.css';
import GlassCard from './components/GlassCard';
import Navbar from './components/Navbar';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import MapCard from './components/MapCard';


function App(props) {
  //const city = useSelector(state => state.a);
  //trial comment
  const [weatherData, setWeatherData] = useState(props.weatherData ? props.weatherData : null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const fetchData = async (query) => {
    // console.log("1");
    try {
      // console.log("2");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );
      // console.log("3");
      setWeatherData(response.data);
      // console.log(response.data); 
      //You can see all the weather data in console log
      //  console.log(weatherData);
    } catch (error) {
      console.log("fetchData error");
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    fetchData('Delhi');
  }, []);

  // useEffect(() => {
  //   console.log("useEffect");
  //   fetchData(city);
  // }, []);
  
  const [currScreen, setCurrScreen] = useState(null);

  const handleCallback = (e) => {
    // e.preventDefault();
    const value = e;
    setCurrScreen(value);
    console.log("currScreen", value);
  }

  return (
    <div className="App">
      {
        weatherData && (<>
          <Navbar data={weatherData} parentCallback={handleCallback}/>
          {currScreen === 'mapbtn' ? <MapCard /> : <GlassCard weatherData={weatherData} />}
        </>)
      }
    </div>
  );
}

export default App;
