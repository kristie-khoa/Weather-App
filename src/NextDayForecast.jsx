import { getNextDay } from "./helper/GetDateAndTime";

function NextDayForecast({ getNextDay, data }) {
  return (
    <div className="card next-day-item">
      <h4>{getNextDay()}</h4>
      <img src={`${data.day.condition.icon}`} />
      <span>{data.day.condition.text}</span>
      <div className="high-low">
        <span>High: {data.day.maxtemp_f}°</span>
        <span>Low: {data.day.mintemp_f}°</span>
      </div>
    </div>
  );
}

export default NextDayForecast;
