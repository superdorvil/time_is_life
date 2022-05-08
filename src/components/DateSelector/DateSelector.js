import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {COLORS} from '_resources';
import {DateUtils} from '_utils';
import {UTILS} from '_constants';

const DateSelector = ({
  visible,
  dateString,
  date,
  updateDate,
  closeModal,
  taskDueDate,
  notSelected,
}) => {
  const year = date.getFullYear();
  const formattedDate =
    DateUtils.convertDayToString({
      date,
      format: UTILS.weekdayFormat.abbreviation,
    }) +
    ', ' +
    DateUtils.convertMonthToString({date, abbreviate: true}) +
    ' ' +
    date.getDate();
    // if in task due date mode than there is no max date, otherwise the max date is today
    const maxDate = taskDueDate ? null : new Date();

  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}>
      <View style={containerStyle()}>
        <View style={headerStyle()}>
          <Text style={yearStyle()}>{year}</Text>
          <Text style={formattedDateStyle()}>{formattedDate}</Text>
        </View>
        <Calendar
          //current={'2022-05-07'}
          //minDate={new Date()}
          //maxDate={date}
          hideExtraDays
          onDayPress={day => {
            updateDate(day);
          }}
          monthFormat={'MMMM yyyy'}
          // renderArrow={(direction) => (<Arrow/>)}
          style={calendarStyle()}
          markedDates={{
            [DateUtils.convertDateToString({
              date: new Date,
              format: UTILS.dateFormat.yyyy_mm_dd,
            })]: {
              marked: true,
              disableTouchEvent: false,
            },
            [dateString]: {
              selected: notSelected ? false : true,
              disableTouchEvent: false,
              selectedColor: COLORS.primary[global.colorScheme],
            },
          }}
          theme={{
            backgroundColor: COLORS.tertiary[global.colorScheme],
            calendarBackground: COLORS.tertiary[global.colorScheme],
            textSectionTitleColor: COLORS.secondary[global.colorScheme], // Sun-Sat
            //textSectionTitleDisabledColor: COLORS.secondary[global.colorScheme],
            //selectedDayBackgroundColor: 'red',
            //selectedDayTextColor: 'green',
            todayTextColor: COLORS.secondary[global.colorScheme],
            dayTextColor: COLORS.secondary[global.colorScheme],
            //textDisabledColor: '#d9e1e8',
            //dotColor: 'red',
            //selectedDotColor: 'red',
            arrowColor: COLORS.secondary[global.colorScheme],
            //disabledArrowColor: '#d9e1e8',
            monthTextColor: COLORS.secondary[global.colorScheme],
            //indicatorColor: 'red',
            //textDayFontFamily: 'monospace',
            //textMonthFontFamily: 'monospace',
            //textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {};
};

const calendarStyle = () => {
  return {
    height: 375,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
  };
};

const yearStyle = () => {
  return {
    fontSize: 20,
    color: COLORS.secondary[global.colorScheme],
    fontWeight: 'bold',
  };
};

const formattedDateStyle = () => {
  return {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
  };
};

const headerStyle = () => {
  return {
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 16,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
  };
};

export default DateSelector;
