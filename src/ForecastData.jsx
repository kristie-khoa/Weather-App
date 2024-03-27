import HourForecast from "./HourForecast";
import NextDayForecast from "./NextDayForecast";
import { getNextDay } from "./helper/GetDateAndTime";

function ForecastData({ nextDays, today, localHour12, localHour24 }) {
  let hourArr = new Array(6).fill("");
  let daysArr = new Array(3).fill("");

  let newArr = hourArr.map((hourForecast, index) => {
    if (localHour24 + index < 24) {
      return (
        <HourForecast
          today={today.hour[localHour24 + index]}
          localHour12={(localHour24 + index + 24) % 12 || 12}
          amPm={localHour24 + index < 13 ? "am" : "pm"}
        />
      );
    } else {
      return (
        <HourForecast
          today={today.hour[localHour24 + index - 24]}
          localHour12={localHour12 + index}
          amPm={localHour24 + index - 24 > 11 ? "pm" : "am"}
        />
      );
    }
  });

  const next3DaysArr = daysArr.map((day, index) => {
    return (
      <NextDayForecast
        getNextDay={() => getNextDay(index)}
        data={nextDays[index]}
      />
    );
  });

  return (
    <>
      <div className="forecast-data forecast-data-today">
        <h3>Today</h3>
        <div className="card-container forecast-data-cards-container">
          {newArr}
        </div>
      </div>
      <div className="forecast-data forecast-data-week">
        <h3>Later This Week</h3>
        <div className="card-container forecast-data-cards-container">
          {next3DaysArr}
        </div>
      </div>
    </>
  );
}

export default ForecastData;

// {today.hour[currHour + index]}
