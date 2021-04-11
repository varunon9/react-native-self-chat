import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { CustomText } from '../lib';
import Colors from '../../common/Colors';

const getFormattedTime = time => {
  return dayjs(time.toDate()).format('hh:mm A');
};

const ChatBubble = props => {
  const { message } = props;

  const { text, createdAt } = message;

  const isHost = true;

  return (
    <View>
      <View
        style={[
          styles.container,
          isHost ? styles.hostContainer : styles.guestContainer
        ]}
      >
        <CustomText style={styles.message}>{text}</CustomText>
        <CustomText style={styles.time}>
          {getFormattedTime(createdAt)}
        </CustomText>
      </View>
    </View>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    padding: 8
  },
  hostContainer: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
    backgroundColor: Colors.LIGHT_BLUE,
    marginLeft: 32
  },
  guestContainer: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
    backgroundColor: Colors.SILVER,
    marginRight: 32
  },
  message: {
    color: Colors.BLACK
  },
  time: {
    fontSize: 12,
    color: Colors.DARK_GREY2,
    alignSelf: 'flex-end'
  }
});

export default ChatBubble;
