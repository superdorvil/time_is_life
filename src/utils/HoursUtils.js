export const convertSecondsToHrsMinsSecs = ({
  totalSeconds,
  doubleDigitHours,
  doubleDigitMinutes,
  doubleDigitSeconds,
}) => {
  const hours = parseInt(totalSeconds / 3600, 10);
  const remainderSeconds = totalSeconds - 3600 * hours;
  const minutes = parseInt(remainderSeconds / 60, 10);
  const seconds = parseInt(remainderSeconds - minutes * 60, 10);

  return {
    hours: doubleDigitHours ? formatDoubleDigits({digits: hours}) : hours,
    minutes: doubleDigitMinutes
      ? formatDoubleDigits({digits: minutes})
      : minutes,
    seconds: doubleDigitSeconds
      ? formatDoubleDigits({digits: seconds})
      : seconds,
  };
};

export const convertSecondsToHrs = ({totalSeconds, decimalMinutes}) => {
  let hours = parseInt(totalSeconds / 3600, 10);
  const remainderSeconds = totalSeconds - 3600 * hours;
  const minutes = parseInt(remainderSeconds / 60, 10);

  if (decimalMinutes) {
    hours = hours + minutes / 60;
    hours = +hours.toFixed(1); // + converts to a number
  }

  return hours;
};

export const convertHrsMinsSecsToSeconds = ({hours, minutes, seconds}) => {
  const hoursToSecs = hours ? hours * 3600 : 0;
  const minutesToSecs = minutes ? minutes * 60 : 0;
  const secondsToSecs = seconds ? seconds : 0;

  return hoursToSecs + minutesToSecs + secondsToSecs;
};

export const formatDoubleDigits = ({digits}) => {
  return digits < 10 ? '0' + digits.toString() : digits.toString();
};

export const dateToTimeAMPM = ({date}) => {
  //return date.toLocaleString();
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
};
