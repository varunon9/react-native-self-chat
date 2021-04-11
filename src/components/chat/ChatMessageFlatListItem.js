import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import dayjs from 'dayjs';

import ChatMessageStrip from './ChatMessageStrip';
import ChatBubble from './ChatBubble';

const ChatMessageFlatListItem = props => {
  const { item, index, chatList } = props;

  const previousItem = chatList[index + 1];
  const currentMessageDate = item.createdAt.toDate();

  // for very 1st message, previous item will be undefined
  if (previousItem) {
    const previousMessageDate = previousItem.createdAt.toDate();

    // don't show date when current & previous chat message are from same date
    if (
      dayjs(previousMessageDate).date() === dayjs(currentMessageDate).date()
    ) {
      return <ChatBubble message={item} />;
    }
  }
  return (
    <View>
      <ChatMessageStrip
        message={dayjs(currentMessageDate).format('dddd, D MMM')}
      />
      <ChatBubble message={item} />
    </View>
  );
};

ChatMessageFlatListItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  chatList: PropTypes.array.isRequired
};

export default ChatMessageFlatListItem;
