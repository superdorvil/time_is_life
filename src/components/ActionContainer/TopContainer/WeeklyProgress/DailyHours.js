import React from 'react';
import {View} from 'react-native';
import WeekdayHours from './WeekdayHours';

const DailyHours = ({dailySecondsWorked}) => {
  return (
    <View style={containerStyle()}>
      <WeekdayHours
        secondsWorked={dailySecondsWorked.sun.secondsWorked}
        weekday={dailySecondsWorked.sun.weekday}
      />
      <WeekdayHours
        secondsWorked={dailySecondsWorked.mon.secondsWorked}
        weekday={dailySecondsWorked.mon.weekday}
      />
      <WeekdayHours
        secondsWorked={dailySecondsWorked.tue.secondsWorked}
        weekday={dailySecondsWorked.tue.weekday}
      />
      <WeekdayHours
        secondsWorked={dailySecondsWorked.wed.secondsWorked}
        weekday={dailySecondsWorked.wed.weekday}
      />
      <WeekdayHours
        secondsWorked={dailySecondsWorked.thu.secondsWorked}
        weekday={dailySecondsWorked.thu.weekday}
      />
      <WeekdayHours
        secondsWorked={dailySecondsWorked.fri.secondsWorked}
        weekday={dailySecondsWorked.fri.weekday}
      />
      <WeekdayHours
        secondsWorked={dailySecondsWorked.sat.secondsWorked}
        weekday={dailySecondsWorked.sat.weekday}
      />
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
  };
};

export default DailyHours;
