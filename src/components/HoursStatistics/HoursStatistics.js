import React from 'react';
import {ScrollView} from 'react-native';
import HoursStat from './HoursStat';

const HoursStatistic = ({
  totalHours,
  averageDailyHours,
  averageWeeklyHours,
  averageMonthlyHours,
  averageSundayHours,
  averageMondayHours,
  averageTuesdayHours,
  averageWednesdayHours,
  averageThursdayHours,
  averageFridayHours,
  averageSaturdayHours,
}) => {
  return (
    <ScrollView style={containerStyle()}>
      <HoursStat statistic="Total Hours Worked:" hours={totalHours} />
      <HoursStat statistic="Average Daily Hours:" hours={averageDailyHours} />
      <HoursStat statistic="Average Weekly Hours:" hours={averageWeeklyHours} />
      <HoursStat
        statistic="Average Monthly Hours:"
        hours={averageMonthlyHours}
      />
      <HoursStat statistic="Average Sunday Hours:" hours={averageSundayHours} />
      <HoursStat statistic="Average Monday Hours:" hours={averageMondayHours} />
      <HoursStat statistic="Average Tuesday:" hours={averageTuesdayHours} />
      <HoursStat
        statistic="Average Wednesday Hours:"
        hours={averageWednesdayHours}
      />
      <HoursStat
        statistic="Average Thurday Hours:"
        hours={averageThursdayHours}
      />
      <HoursStat statistic="Average Friday Hours:" hours={averageFridayHours} />
      <HoursStat
        statistic="Average Saturday Hours:"
        hours={averageSaturdayHours}
      />
    </ScrollView>
  );
};

const containerStyle = () => {
  return {paddingTop: 16};
};

export default HoursStatistic;
