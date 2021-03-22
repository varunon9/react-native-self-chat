import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';

import GenericStyles from '../../styles/GenericStyles';
import Colors from '../../common/Colors';

import CustomText from './CustomText';
import { calendarIcon } from '../../images';
import { getFormattedDate } from '../../utils/helperFunctions';

const CALENDAR_DATE_FORMAT = 'DD MMM, YYYY';

const CalendarIconComponent = ({ style }) => {
  return <Image source={calendarIcon} style={[styles.calendarIcon, style]} />;
};

const CustomDateTimePicker = props => {
  const {
    style,
    title,
    titleStyle,
    dateContainerStyle,
    calendarIconStyle,
    defaultDate,
    setDate,
    mode,
    minDate,
    maxDate,
    placeholder
  } = props;

  const [visible, setVisible] = useState(false);

  const onPress = () => {
    setVisible(true);
  };

  const onChange = (event, selectedDate) => {
    const dateSelected = selectedDate || defaultDate;
    setVisible(false);
    setDate(dateSelected);
  };

  const dateText = getFormattedDate(defaultDate, 0, CALENDAR_DATE_FORMAT);

  return (
    <View style={style}>
      {title ? (
        <CustomText style={[styles.title, titleStyle]}>{title}</CustomText>
      ) : null}
      <TouchableOpacity
        style={[
          styles.dateSelectorContainer,
          GenericStyles.centerAlignedRow,
          dateContainerStyle
        ]}
        onPress={onPress}
      >
        {defaultDate ? (
          <CustomText>{dateText}</CustomText>
        ) : (
          <CustomText style={styles.greyText}>{placeholder}</CustomText>
        )}
        <View style={GenericStyles.fill} />
        <CalendarIconComponent style={[calendarIconStyle]} />
      </TouchableOpacity>
      {visible ? (
        <DateTimePicker
          value={defaultDate ? defaultDate : new Date()}
          mode={mode}
          display="default"
          onChange={onChange}
          maximumDate={maxDate}
          minimumDate={minDate}
        />
      ) : null}
    </View>
  );
};

CustomDateTimePicker.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.any,
  style: ViewPropTypes.style,
  dateContainerStyle: PropTypes.any,
  calendarIconStyle: PropTypes.any,
  defaultDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['date', 'time']),
  placeholder: PropTypes.string
};

CustomDateTimePicker.defaultProps = {
  mode: 'date'
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold'
  },
  dateSelectorContainer: {
    backgroundColor: Colors.GREY,
    borderRadius: 8,
    padding: 12
  },
  calendarIcon: {
    width: 27,
    height: 26
  },
  greyText: {
    color: Colors.DARK_GREY
  }
});

export default CustomDateTimePicker;
