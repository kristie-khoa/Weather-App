const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getUserTime = (setTime, initialUserTime) => {
  changeTime(setTime);
  const interval = setInterval(changeTime(setTime), 60000);
  return () => clearInterval(interval);
};

const changeTime = (setTime) => {
  let initialTimeDate = new Date();
  let userHour24 = initialTimeDate.getHours();
  let userHour12 = (userHour24 + 24) % 12 || 12;
  let minute = initialTimeDate.getMinutes();
  let merridian = userHour24 < 12 ? "am" : "pm";

  let timeString12 = `${userHour12}:${numToClockString(minute)} ${merridian}`;
  let timeString24 = `${numToClockString(userHour24)}:${numToClockString(
    minute
  )}`;
  // console.log(timeString12);
  setTime({
    userHour24: userHour24,
    userHour12: userHour12,
    minute: minute,
    merridian: merridian,
    timeString24: timeString24,
    timeString12: timeString12,
  });
};

const numToClockString = (num) => num.toString().padStart(2, "0");

const getDate = (setDate) => {
  let initialTimeDate = new Date();

  let day = days[initialTimeDate.getDay()];
  let date = initialTimeDate.getDate();
  let month = months[initialTimeDate.getMonth()];
  let year = initialTimeDate.getFullYear();
  setDate(`${day}, ${date} ${month} ${year}`);
};

// let getLocalTime = (setLocalTime) => {
//   setLocalTime("4:35pm");
//   console.log("hi3.9");
// };

const getLocalTime = (initialLocalTime, setLocalTime) => {
  let initialTimeDate = new Date();
  let userHour24 = initialTimeDate.getHours();
  let initialLocalHour24 = Number(
    initialLocalTime.current.location.localtime.slice(-5, -3)
  );
  const timeDiff = userHour24 - initialLocalHour24;
  let currentLocalHour24 =
    userHour24 - timeDiff > 24
      ? userHour24 - timeDiff - 24
      : userHour24 - timeDiff;
  let currentLocalHour12 = (currentLocalHour24 + 24) % 12 || 12;

  let minute = initialTimeDate.getMinutes();
  let merridian = currentLocalHour24 < 12 ? "am" : "pm";

  setLocalTime({
    localHour12: currentLocalHour12,
    localHour24: currentLocalHour24,
    minute: minute,
    merridian: merridian,
    timeString12: `${currentLocalHour12}:${numToClockString(
      minute
    )} ${merridian}`,
    timeString24: `${numToClockString(currentLocalHour24)}:${numToClockString(
      minute
    )} ${merridian}`,
  });
};

let get1LocalTime = (initialTime, setLocalTime) => {
  let initialTimeDate = new Date();
  let userHourNum = initialTimeDate.getHours(); //16
  let userMinuteString = initialTimeDate
    .getMinutes()
    .toString()
    .padStart(2, "0"); //
  let localHourNum = Number(
    initialTime.current.location.localtime.slice(-5, -3)
  ); //;
  let timeDifferenceNum = userHourNum - localHourNum;
  let localAmPm = localHourNum < 12 ? "am" : "pm";
  setLocalTime(
    `${
      userHourNum -
      timeDifferenceNum -
      (localHourNum < 13 ? 0 : localHourNum === "0" ? -12 : 12)
    }:${userMinuteString} ${localAmPm}`
  );
};

const getNextDay = (numDaysAfter) => {
  let today = new Date();

  let tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + numDaysAfter + 1);
  let dateString = `${days[tomorrow.getDay()]}, ${
    months[tomorrow.getMonth()]
  } ${tomorrow.getDate()}`;

  // let nextDay = new Date(new Date().setDate(new Date().getDate + 1));
  return dateString;
};

export { getNextDay, getUserTime, getDate, getLocalTime };
