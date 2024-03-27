import ForecastData from "./ForecastData";
import Header from "./Header";
import HighlightsData from "./HighlightsData";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  getNextDay,
  getUserTime,
  getDate,
  getLocalTime,
} from "./helper/GetDateAndTime";
import useDidMountEffect from "./helper/useDidMountEffect";
import WeatherDisplay from "./WeatherDisplay";
// import resdata from "./helper/data";

function WeatherAppMain() {
  const [data, setData] = useState(null);
  const initialLocalTime = useRef(null);
  // const initialUserTime = useRef(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocation(latitude, longitude);
          // what to do once we have the position
        },
        (error) => {
          // display an error if we cant get the users position
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useDidMountEffect(() => {
    getLocalTime(initialLocalTime, setLocalTime);
  }, [time]);

  // useEffect(() => {
  //   console.log(initialLocalTime);
  // }, [localTime]);

  // useDidMountEffect(() => {
  //   set;
  // }, [searchResults]);

  const fetchData = async (city) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=f1b20c8dcfb048488e1230001231010&q=${city}&days=3&aqi=no&alerts=no`
    );
    setData(response.data);
    initialLocalTime.current = response.data;
    getLocalTime(initialLocalTime, setLocalTime);
    getUserTime(setTime);
    getDate(setDate);
  };

  const getLocation = async (lat, lon) => {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=pk.72cd6da9ea062c9986b7b1083dbf246a&lat=${lat}&lon=${lon}&zoom=10&format=json&`
    );
    fetchData(response.data.address.city);
  };

  const getSearchResults = async (value) => {
    if (value) {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=f1b20c8dcfb048488e1230001231010&q=${value}`
      );
      setSearchResults(await response.data);
    }
  };

  const selectCity = async (value) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=f1b20c8dcfb048488e1230001231010&q=${value}&days=3&aqi=no&alerts=no`
    );
    setData(response.data);
    initialLocalTime.current = response.data;
    getLocalTime(initialLocalTime, setLocalTime);
  };

  if (data && localTime && time) {
    return (
      <div className="layout">
        <Header
          searchResults={searchResults}
          time={time.timeString12}
          date={date}
          selectCity={selectCity}
          getSearchResults={getSearchResults}
        />
        <div className="main-content">
          <WeatherDisplay
            localTime={localTime.timeString12}
            location={data.location}
            temperature={data.current.temp_f}
            condition={data.current.condition.text}
            conditionIcon={data.current.condition.icon}
            high={data.forecast.forecastday[0].day.maxtemp_f}
            low={data.forecast.forecastday[0].day.mintemp_f}
          />
          <div className="weather-data">
            <div className="weather-data-left-container">
              <ForecastData
                today={data.forecast.forecastday[0]}
                localHour12={localTime.localHour12}
                localHour24={localTime.localHour24}
                nextDays={data.forecast.forecastday}
              />
            </div>
            <div className="weather-data-right-container">
              <HighlightsData
                windSpeed={data.current.wind_mph}
                windDegree={data.current.wind_degree}
                humidity={data.current.humidity}
                visibility={data.current.vis_miles}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherAppMain;
