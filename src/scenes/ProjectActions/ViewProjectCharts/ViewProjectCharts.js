import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
  ChartNavBar,
  HoursChart,
  ArrowIncrementer,
  HoursStatistics,
} from '_components';
import {COLORS} from '_resources';
import projectDB from '_data';
import {HoursUtils, DateUtils} from '_utils';
import {STATES, UTILS} from '_constants';

class ViewProjectCharts extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();

    this.state = {
      mode: STATES.weekly,
      chartDataDescription: 'Weekly Hours Worked',
      totalHours: 0,
      averageDailyHours: 0,
      averageWeeklyHours: 0,
      averageMonthlyHours: 0,
      averageSundayHours: 0,
      averageMondayHours: 0,
      averageTuesdayHours: 0,
      averageWednesdayHours: 0,
      averageThursdayHours: 0,
      averageFridayHours: 0,
      averageSaturdayHours: 0,
      dailyDataIndex: DateUtils.getDateIndex({date: currentDate}),
      weeklyDataIndex: DateUtils.getWeekIndex({date: currentDate}),
      monthlyDataIndex: currentDate, // using date for simplicity
      chartData: this.getChartData(
        STATES.weekly,
        DateUtils.getWeekIndex({date: currentDate}),
      ),
    };

    this.incrementChartIndex = this.incrementChartIndex.bind(this);
    this.decrementChartIndex = this.decrementChartIndex.bind(this);
    this.chartNavBarPressed = this.chartNavBarPressed.bind(this);
  }

  componentDidMount() {
    this.initializeStatistics();
  }

  incrementChartIndex() {
    switch (this.state.mode) {
      case STATES.daily:
        this.setState({
          dailyDataIndex: this.state.dailyDataIndex + 25,
          chartData: this.getChartData(
            STATES.daily,
            this.state.dailyDataIndex + 25,
          ),
        });
        break;
      case STATES.weekly:
        this.setState({
          weeklyDataIndex: this.state.weeklyDataIndex + 25,
          chartData: this.getChartData(
            STATES.weekly,
            this.state.weeklyDataIndex + 25,
          ),
        });
        break;
      case STATES.monthly:
        let futureMonth = new Date(this.state.monthlyDataIndex);
        for (let i = 0; i < 25; i++) {
          futureMonth = DateUtils.getFirstDayOfNextMonth({
            date: futureMonth,
          });
        }

        this.setState({
          monthlyDataIndex: futureMonth,
          chartData: this.getChartData(STATES.monthly, futureMonth),
        });
        break;
      default:
      // FIXME:: add error checking
    }
  }

  decrementChartIndex() {
    switch (this.state.mode) {
      case STATES.daily:
        this.setState({
          dailyDataIndex: this.state.dailyDataIndex - 25,
          chartData: this.getChartData(
            STATES.daily,
            this.state.dailyDataIndex - 25,
          ),
        });
        break;
      case STATES.weekly:
        this.setState({
          weeklyDataIndex: this.state.weeklyDataIndex - 25,
          chartData: this.getChartData(
            STATES.weekly,
            this.state.weeklyDataIndex - 25,
          ),
        });
        break;
      case STATES.monthly:
        let pastMonth = new Date(this.state.monthlyDataIndex);
        for (let i = 0; i < 25; i++) {
          pastMonth = DateUtils.getFirstDayOfPreviousMonth({
            date: pastMonth,
          });
        }
        this.setState({
          monthlyDataIndex: pastMonth,
          chartData: this.getChartData(STATES.monthly, pastMonth),
        });
        break;
      default:
      // FIXME:: add error checking
    }

    this.getChartData();
  }

  chartNavBarPressed(navButton) {
    switch (navButton) {
      case STATES.daily:
        this.setState({
          mode: STATES.daily,
          chartDataDescription: 'Daily Hours Worked',
          chartData: this.getChartData(STATES.daily, this.state.dailyDataIndex),
        });
        break;
      case STATES.weekly:
        this.setState({
          mode: STATES.weekly,
          chartDataDescription: 'Weekly Hours Worked',
          chartData: this.getChartData(
            STATES.weekly,
            this.state.weeklyDataIndex,
          ),
        });
        break;
      case STATES.monthly:
        this.setState({
          mode: STATES.monthly,
          chartDataDescription: 'Monthly Hours Worked',
          chartData: this.getChartData(
            STATES.monthly,
            this.state.monthlyDataIndex,
          ),
        });
        break;
      default:
      // FIXME:: add error checking
    }

    this.getChartData();
  }

  initializeStatistics() {
    let totalHours = 0;
    let averageDailyHours = 0;
    let averageWeeklyHours = 0;
    let averageMonthlyHours = 0;
    let averageSundayHours = 0;
    let averageMondayHours = 0;
    let averageTuesdayHours = 0;
    let averageWednesdayHours = 0;
    let averageThursdayHours = 0;
    let averageFridayHours = 0;
    let averageSaturdayHours = 0;

    const secondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      returnList: true,
      inverseSort: true,
    });

    if (secondsWorked.length > 0) {
      const initialSecondsWorked = secondsWorked[0];
      const today = new Date();
      const currentDateIndex = DateUtils.getDateIndex({date: today});
      const currentWeekIndex = DateUtils.getWeekIndex({date: today});
      const currentMonthIndex = DateUtils.getMonthIndex({date: today});
      const daysUsingApp =
        currentDateIndex - initialSecondsWorked.dateIndex + 1;
      const weeksUsingApp =
        currentWeekIndex - initialSecondsWorked.weekIndex + 1;
      const monthsUsingApp =
        currentMonthIndex - initialSecondsWorked.monthIndex + 1;

      totalHours = HoursUtils.convertSecondsToHrs({
        totalSeconds: projectDB.getSecondsWorked({realm: this.props.realm}),
        decimalMinutes: true,
      });

      averageDailyHours =
        daysUsingApp > 0 ? (totalHours / daysUsingApp).toFixed(1) : 0;
      averageWeeklyHours =
        weeksUsingApp > 0 ? (totalHours / weeksUsingApp).toFixed(1) : 0;
      averageMonthlyHours =
        monthsUsingApp > 0 ? (totalHours / monthsUsingApp).toFixed(1) : 0;

      secondsWorked.forEach((sw, i) => {
        switch (sw.startTime.getDay()) {
          case 0:
            averageSundayHours =
              averageSundayHours + (sw.endTime - sw.startTime);
            break;
          case 1:
            averageMondayHours =
              averageMondayHours + (sw.endTime - sw.startTime);
            break;
          case 2:
            averageTuesdayHours =
              averageTuesdayHours + (sw.endTime - sw.startTime);
            break;
          case 3:
            averageWednesdayHours =
              averageWednesdayHours + (sw.endTime - sw.startTime);
            break;
          case 4:
            averageThursdayHours =
              averageThursdayHours + (sw.endTime - sw.startTime);
            break;
          case 5:
            averageSaturdayHours =
              averageSaturdayHours + (sw.endTime - sw.startTime);
            break;
          case 6:
            averageFridayHours =
              averageFridayHours + (sw.endTime - sw.startTime);
            break;
          default:
          // add error checking
        }
      });

      averageSundayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageSundayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
      averageMondayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageMondayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
      averageTuesdayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageTuesdayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
      averageWednesdayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageWednesdayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
      averageThursdayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageThursdayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
      averageFridayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageFridayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
      averageSaturdayHours =
        weeksUsingApp > 0
          ? HoursUtils.convertSecondsToHrs({
              totalSeconds: averageSaturdayHours / 1000 / weeksUsingApp,
              decimalMinutes: true,
            })
          : 0;
    }

    this.setState({
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
    });
  }

  getChartData(mode, index) {
    const chartHours = [];
    const chartLabels = [];

    switch (mode) {
      case STATES.daily:
        for (let i = 0; i < 25; i++) {
          chartHours.push(
            HoursUtils.convertSecondsToHrs({
              totalSeconds: projectDB.getSecondsWorked({
                realm: this.props.realm,
                dateIndex: index - i,
              }),
              decimalMinutes: true,
            }),
          );
          chartLabels.push(
            DateUtils.convertDateToString({
              date: DateUtils.getDateFromDateIndex({
                dateIndex: index - i,
              }),
              format: UTILS.dateFormat.monthDate,
            }),
          );
        }
        break;
      case STATES.weekly:
        for (let i = 0; i < 25; i++) {
          chartHours.push(
            HoursUtils.convertSecondsToHrs({
              totalSeconds: projectDB.getSecondsWorked({
                realm: this.props.realm,
                weekIndex: index - i,
              }),
              decimalMinutes: true,
            }),
          );
          chartLabels.push(
            DateUtils.convertDateToString({
              date: {
                d1: DateUtils.getDateFromWeekIndex({
                  weekIndex: index - i,
                  weekday: 0,
                }),
                d2: DateUtils.getDateFromWeekIndex({
                  weekIndex: index - i,
                  weekday: 6,
                }),
              },
              format: UTILS.dateFormat.monDate_monDate,
            }),
          );
        }
        break;
      case STATES.monthly:
        let firstOfMonth = new Date(index);
        let monthIndex = DateUtils.getMonthIndex({date: firstOfMonth});

        for (let i = 0; i < 25; i++) {
          chartHours.push(
            HoursUtils.convertSecondsToHrs({
              totalSeconds: projectDB.getSecondsWorked({
                realm: this.props.realm,
                monthIndex,
              }),
              decimalMinutes: true,
            }),
          );
          chartLabels.push(
            DateUtils.convertDateToString({
              date: firstOfMonth,
              format: UTILS.dateFormat.monthYear,
            }),
          );
          firstOfMonth = DateUtils.getFirstDayOfPreviousMonth({
            date: firstOfMonth,
          });
          monthIndex = DateUtils.getMonthIndex({date: firstOfMonth});
        }
        break;
      default:
      // FIXME:: add error checking
    }

    return {chartHours, chartLabels};
  }

  render() {
    return (
      <View style={containerStyle()}>
        <Text style={headerStyle()}>All Project Hours</Text>
        <ChartNavBar
          dailySelected={this.state.mode === STATES.daily}
          dailyPressed={() => this.chartNavBarPressed(STATES.daily)}
          weeklySelected={this.state.mode === STATES.weekly}
          weeklyPressed={() => this.chartNavBarPressed(STATES.weekly)}
          monthlySelected={this.state.mode === STATES.monthly}
          monthlyPressed={() => this.chartNavBarPressed(STATES.monthly)}
        />
        <HoursChart
          labels={this.state.chartData.chartLabels}
          hours={this.state.chartData.chartHours}
          dataWidth={100}
          yAxisSuffix=" hrs"
        />
        <ArrowIncrementer
          dateInfo={this.state.chartDataDescription}
          incrementIndex={this.incrementChartIndex}
          decrementIndex={this.decrementChartIndex}
        />
        <HoursStatistics
          totalHours={this.state.totalHours}
          averageDailyHours={this.state.averageDailyHours}
          averageWeeklyHours={this.state.averageWeeklyHours}
          averageMonthlyHours={this.state.averageMonthlyHours}
          averageSundayHours={this.state.averageSundayHours}
          averageMondayHours={this.state.averageMondayHours}
          averageTuesdayHours={this.state.averageTuesdayHours}
          averageWednesdayHours={this.state.averageWednesdayHours}
          averageThursdayHours={this.state.averageThursdayHours}
          averageFridayHours={this.state.averageFridayHours}
          averageSaturdayHours={this.state.averageSaturdayHours}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    backgroundColor: COLORS.secondary[global.colorScheme],
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const headerStyle = () => {
  return {
    fontSize: 24,
    alignSelf: 'center',
    color: COLORS.tertiary[global.colorScheme],
  };
};

export default ViewProjectCharts;
