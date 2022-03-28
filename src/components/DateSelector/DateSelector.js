import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {Colors} from '_resources';
import {DateUtils} from '_utils';
import {Utils} from '_constants';

const DateSelector = ({visible, dateString, date, updateDate, closeModal}) => {
  const year = date.getFullYear();
  const formattedDate =
    DateUtils.convertDayToString({
      date,
      format: Utils.weekdayFormat.abbreviation,
    }) +
    ', ' +
    DateUtils.convertMonthToString({date, abbreviate: true}) +
    ' ' +
    date.getDate();

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
          //current={new Date()}
          //minDate={new Date()}
          maxDate={new Date()}
          hideExtraDays
          onDayPress={day => {
            updateDate(day);
          }}
          monthFormat={'MMMM yyyy'}
          // renderArrow={(direction) => (<Arrow/>)}
          style={calendarStyle()}
          markedDates={{
            [dateString]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: Colors.primary[global.colorScheme],
            },
          }}
          theme={{
            backgroundColor: Colors.tertiary[global.colorScheme],
            calendarBackground: Colors.tertiary[global.colorScheme],
            textSectionTitleColor: Colors.secondary[global.colorScheme], // Sun-Sat
            //textSectionTitleDisabledColor: Colors.secondary[global.colorScheme],
            //selectedDayBackgroundColor: 'red',
            //selectedDayTextColor: 'green',
            todayTextColor: Colors.secondary[global.colorScheme],
            dayTextColor: Colors.secondary[global.colorScheme],
            //textDisabledColor: '#d9e1e8',
            //dotColor: 'red',
            //selectedDotColor: 'red',
            arrowColor: Colors.secondary[global.colorScheme],
            //disabledArrowColor: '#d9e1e8',
            monthTextColor: Colors.secondary[global.colorScheme],
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
    color: Colors.secondary[global.colorScheme],
    fontWeight: 'bold',
  };
};

const formattedDateStyle = () => {
  return {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.secondary[global.colorScheme],
  };
};

const headerStyle = () => {
  return {
    backgroundColor: Colors.primary[global.colorScheme],
    padding: 16,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
  };
};

export default DateSelector;
