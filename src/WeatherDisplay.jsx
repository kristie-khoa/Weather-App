function WeatherDisplay({
  localTime,
  location,
  temperature,
  condition,
  conditionIcon,
  high,
  low,
}) {
  return (
    <div className="weather-display-background-container">
      <div className="weather-display-background-img">
        <div className="weather-display-container">
          <div>
            <h1>{temperature}°</h1>
            <div className="temp-condition">
              <span>{condition}</span>
              <img src={`${conditionIcon}`} />
            </div>
          </div>

          <div>
            <h2>
              {location.name},{" "}
              {location.country === "USA" || "United States of America"
                ? location.region
                : location.country}
            </h2>
            <span>Local Time {localTime}</span>
            <span className="high-low">
              <span>High: {high}°</span>
              <span>Low: {low}°</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
