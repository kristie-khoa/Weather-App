function HourForecast({ today, localHour12, amPm }) {
  return (
    <div className="card hour-forecast-item">
      <h4>
        {localHour12}
        {amPm}
      </h4>

      <img src={`${today.condition.icon}`} />
      <span>{today.condition.text}</span>
      <span>{today.temp_f}°</span>
    </div>
  );
}

export default HourForecast;

// <div className="hour-forecast">
//         <img
//           className="hour-forecast-icon"
//           src="//cdn.weatherapi.com/weather/64x64/day/113.png"
//         />
//         <span className="hour-forecast-temperature">{hourData.temp_f}</span>
//       </div>
//       <div className="hour">
//         {hourLabel}
//         {amPm}
//       </div>
