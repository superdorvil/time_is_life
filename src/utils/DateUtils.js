import {Utils} from '_constants';

export const convertMonthToString = ({date, abbreviate}) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      if (abbreviate) {
        return 'Jan';
      } else {
        return 'January';
      }
    case 1:
      if (abbreviate) {
        return 'Feb';
      } else {
        return 'Febuary';
      }
    case 2:
      if (abbreviate) {
        return 'Mar';
      } else {
        return 'March';
      }
    case 3:
      if (abbreviate) {
        return 'Apr';
      } else {
        return 'April';
      }
    case 4:
      if (abbreviate) {
        return 'May';
      } else {
        return 'May';
      }
    case 5:
      if (abbreviate) {
        return 'Jun';
      } else {
        return 'June';
      }
    case 6:
      if (abbreviate) {
        return 'Jul';
      } else {
        return 'July';
      }
    case 7:
      if (abbreviate) {
        return 'Aug';
      } else {
        return 'August';
      }
    case 8:
      if (abbreviate) {
        return 'Sept';
      } else {
        return 'September';
      }
    case 9:
      if (abbreviate) {
        return 'Oct';
      } else {
        return 'October';
      }
    case 10:
      if (abbreviate) {
        return 'Nov';
      } else {
        return 'November';
      }
    case 11:
      if (abbreviate) {
        return 'Dec';
      } else {
        return 'December';
      }
    default:
      console.log('month to string conversion given false value');
      return;
  }
};

export const convertDayToString = ({date, format}) => {
  const day = date.getDay();

  switch (day) {
    case 0:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'S';
        case Utils.weekdayFormat.abbreviation:
          return 'Sun';
        case Utils.weekdayFormat.full:
          return 'Sunday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'SUN';
        case Utils.weekdayFormat.full_capital:
          return 'SUNDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    case 1:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'M';
        case Utils.weekdayFormat.abbreviation:
          return 'Mon';
        case Utils.weekdayFormat.full:
          return 'Monday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'MON';
        case Utils.weekdayFormat.full_capital:
          return 'MONDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    case 2:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'T';
        case Utils.weekdayFormat.abbreviation:
          return 'Tue';
        case Utils.weekdayFormat.full:
          return 'Tuesday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'TUE';
        case Utils.weekdayFormat.full_capital:
          return 'TUESDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    case 3:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'W';
        case Utils.weekdayFormat.abbreviation:
          return 'Wed';
        case Utils.weekdayFormat.full:
          return 'Wednesday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'WED';
        case Utils.weekdayFormat.full_capital:
          return 'WEDNESDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    case 4:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'T';
        case Utils.weekdayFormat.abbreviation:
          return 'Thu';
        case Utils.weekdayFormat.full:
          return 'Thursday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'THU';
        case Utils.weekdayFormat.full_capital:
          return 'THURSDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    case 5:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'F';
        case Utils.weekdayFormat.abbreviation:
          return 'Fri';
        case Utils.weekdayFormat.full:
          return 'Friday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'FRI';
        case Utils.weekdayFormat.full_capital:
          return 'FRIDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    case 6:
      switch (format) {
        case Utils.weekdayFormat.initial:
          return 'S';
        case Utils.weekdayFormat.abbreviation:
          return 'Sat';
        case Utils.weekdayFormat.full:
          return 'Saturday';
        case Utils.weekdayFormat.abbreviation_capital:
          return 'SAT';
        case Utils.weekdayFormat.full_capital:
          return 'SATURDAY';
        default:
          console.log(
            'convertDayToString given false weekdayFormat = ' + format,
          );
      }
      break;
    default:
      //Error checking add here
      console.log('day to string conversion given false value = ' + day);
      return;
  }
};

export const convertDateToString = ({date, format}) => {
  let dateText = '';

  switch (format) {
    case Utils.dateFormat.mon:
      dateText = convertMonthToString({
        date,
        abbreviate: true,
      });
      break;
    case Utils.dateFormat.month:
      dateText = convertMonthToString({
        date,
        abbreviate: false,
      });
      break;
    case Utils.dateFormat.monDate:
      dateText = dateText + convertMonthToString({date, abbreviate: true});
      dateText = dateText + ' ' + date.getDate();
      break;
    case Utils.dateFormat.monthDate:
      dateText = dateText + convertMonthToString({date, abbreviate: false});
      dateText = dateText + ' ' + date.getDate();
      break;
    case Utils.dateFormat.monthYear:
      dateText = dateText + convertMonthToString({date, abbreviate: false});
      dateText = dateText + ' ' + date.getFullYear();
      break;
    case Utils.dateFormat.monDateYear:
      dateText = dateText + convertMonthToString({date, abbreviate: true});
      dateText = dateText + ' ' + date.getDate();
      dateText = dateText + ', ' + date.getFullYear();
      break;
    case Utils.dateFormat.monthDateYear:
      dateText = dateText + convertMonthToString({date, abbreviate: false});
      dateText = dateText + ' ' + date.getDate();
      dateText = dateText + ', ' + date.getFullYear();
      break;
    case Utils.dateFormat.m_d_yy:
      const year = date.getFullYear().toString().substring(2);
      dateText = date.getMonth() + 1 + '-' + date.getDate() + '-' + year;
      break;
    case Utils.dateFormat.m_d_yyyy:
      dateText =
        date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
      break;
    case Utils.dateFormat.yyyy_mm_dd:
      const month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      dateText = date.getFullYear() + '-' + month + '-' + day;
      break;
    // The following use date: {d1, d2} as parameters
    case Utils.dateFormat.monDate_monDate:
      dateText = convertDateToString({
        date: date.d1,
        format: Utils.dateFormat.monDate,
      });
      dateText += ' - ';
      dateText += convertDateToString({
        date: date.d2,
        format: Utils.dateFormat.monDate,
      });
      break;
    case Utils.dateFormat.monthDate_monthDate:
      dateText = convertDateToString({
        date: date.d1,
        format: Utils.dateFormat.monthDate,
      });
      dateText += ' - ';
      dateText += convertDateToString({
        date: date.d2,
        format: Utils.dateFormat.monthDate,
      });
      break;
    case Utils.dateFormat.monDateYear_monDateYear:
      dateText += convertMonthToString({
        date: date.d1,
        abbreviate: true,
      });
      dateText = dateText + ' ' + date.d1.getDate();
      dateText = dateText + ', ' + date.d1.getFullYear();
      dateText += ' - ';
      dateText += convertMonthToString({
        date: date.d2,
        abbreviate: true,
      });
      dateText = dateText + ' ' + date.d2.getDate();
      dateText = dateText + ', ' + date.d2.getFullYear();
      break;
    case Utils.dateFormat.monthDateYear_monthDateYear:
      dateText += convertMonthToString({
        date: date.d1,
        abbreviate: false,
      });
      dateText = dateText + ' ' + date.d1.getDate();
      dateText = dateText + ', ' + date.d1.getFullYear();
      dateText += ' - ';
      dateText += convertMonthToString({
        date: date.d2,
        abbreviate: false,
      });
      dateText = dateText + ' ' + date.d2.getDate();
      dateText = dateText + ', ' + date.d2.getFullYear();
      break;
    default:
      //Error checking add here
      console.log(format + ' date to string conversion given false value');
      return;
  }

  return dateText;
};

export const getSunday = ({date}) => {
  const sunday = new Date(date);

  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate() - 1);
  }

  return sunday;
};

export const getSaturday = ({date}) => {
  const saturday = new Date(date);

  while (saturday.getDay() !== 6) {
    saturday.setDate(saturday.getDate() + 1);
  }

  return saturday;
};

// Checks if it has the same, date, month and year, excludes hours
export const isDateEqual = ({date1, date2}) => {
  let equal = true;

  if (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  ) {
    equal = false;
  }

  return equal;
};

// check diff from start point, so 24 hrs after start, not 12am of that day
export const getDateDiff = ({startDate, endDate}) => {
  const sd = new Date(startDate.getTime()).setHours(0, 0, 0, 0);
  const ed = new Date(endDate.getTime()).setHours(0, 0, 0, 0);
  const diffTime = Math.abs(ed - sd);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const getPreviousDate = ({diff, date}) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - diff);

  return previousDate;
};

export const getFutureDate = ({diff, date}) => {
  const futureDate = new Date(date);
  futureDate.setDate(futureDate.getDate() + diff);

  return futureDate;
};

export const getFirstDayOfMonth = ({date}) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = ({date}) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getFirstDayOfNextMonth = ({date}) => {
  if (date.getMonth() === 11) {
    return new Date(date.getFullYear() + 1, 0, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
};

export const getLastDayOfNextMonth = ({date}) => {
  return getLastDayOfMonth({date: getFirstDayOfNextMonth({date})});
};

export const getFirstDayOfPreviousMonth = ({date}) => {
  if (date.getMonth() === 0) {
    return new Date(date.getFullYear() - 1, 11, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
};

export const getLastDayOfPreviousMonth = ({date}) => {
  return getLastDayOfMonth({date: getFirstDayOfPreviousMonth({date})});
};

// good for getting first month index
export const getFirstDayOfYear = ({date}) => {
  return new Date(date.getFullYear(), 0, 0);
};

// good for getting last month index
export const getLastDayOfYear = ({date}) => {
  return new Date(date.getFullYear(), 11, 31);
};

export const getDateIndex = ({date}) => {
  const initialDate = new Date(Utils.initialDateString);
  const dateDiff = getDateDiff({
    startDate: initialDate,
    endDate: date,
  });

  return dateDiff;
};

export const getWeekIndex = ({date}) => {
  const initialWeekDate = new Date(Utils.initialDateString);
  const dateDiff = getDateDiff({
    startDate: initialWeekDate,
    endDate: date,
  });

  return Math.floor(dateDiff / 7);
};

export const getMonthIndex = ({date}) => {
  const yearIndex = getYearIndex({date});
  // Javascript months are off by 1, so November is 10, but you add plus one, hence plus 11
  const monthIndex = yearIndex * 12 + date.getMonth() + Utils.initialMonth + 1; // My bday month :D

  return monthIndex;
};

export const getYearIndex = ({date}) => {
  return date.getFullYear() - Utils.initialYear;
};

export const getFirstMonthOfYearIndex = ({date}) => {
  return getMonthIndex({date: getFirstDayOfYear({date})});
};

export const getLastMonthOfYearIndex = ({date}) => {
  return getMonthIndex({date: getLastDayOfYear({date})});
};

export const getDateFromDateIndex = ({dateIndex}) => {
  return getFutureDate({
    diff: dateIndex,
    date: new Date(Utils.initialDateString),
  });
};

export const getDateFromWeekIndex = ({weekIndex, weekday = 0}) => {
  const dateIndex = weekIndex * 7;
  let date = getDateFromDateIndex({dateIndex});

  if (weekday < 0 || weekday > 6) {
    return getFutureDate({diff: 0, date});
    // error checking
  }

  return getFutureDate({diff: weekday, date});
};
