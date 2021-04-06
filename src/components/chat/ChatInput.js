import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import GenericStyles from '../../styles/GenericStyles';

import { getKeyValue } from '../../utils/helperFunctions';
import CustomTextInput from '../lib/CustomTextInput';
import CustomImageButton from '../lib/CustomImageButton';
import { sendChatIcon } from '../../images';
import Colors from '../../common/Colors';

const CHAT_INPUT_INITIAL_HEIGHT = 20;
const CHAT_INPUT_MAX_HEIGHT = 120;

const ChatInput = props => {
  const {
    onMessageInputChange,
    onMessageSubmit,
    inputMessage,
    disabled
  } = props;

  const [textInputHeight, setTextInputHeight] = useState(
    CHAT_INPUT_INITIAL_HEIGHT
  );

  const onContentSizeChange = event => {
    const height = getKeyValue(event, 'nativeEvent.contentSize.height');
    if (height < CHAT_INPUT_MAX_HEIGHT) {
      setTextInputHeight(height);
    } else {
      setTextInputHeight(CHAT_INPUT_MAX_HEIGHT);
    }
  };

  const heightStyle = { height: textInputHeight };

  return (
    <View style={GenericStyles.row}>
      <CustomTextInput
        containerStyle={[
          GenericStyles.fill,
          styles.container,
          disabled ? styles.disabled : {}
        ]}
        style={heightStyle}
        onChangeText={onMessageInputChange}
        value={inputMessage}
        placeholder={'Type your message'}
        selectTextOnFocus={!disabled}
        multiline
        onContentSizeChange={onContentSizeChange}
      />
      {inputMessage ? (
        <CustomImageButton
          source={sendChatIcon}
          imageStyle={styles.sendIcon}
          onPress={onMessageSubmit}
          style={styles.sendButton}
        />
      ) : null}
    </View>
  );
};

ChatInput.propTypes = {
  onMessageInputChange: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired,
  inputMessage: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: Colors.WHITE
  },
  disabled: {
    opacity: 0.5
  },
  sendIcon: {
    width: 40,
    height: 40
  },
  sendButton: {
    paddingHorizontal: 0,
    marginRight: 8,
    marginBottom: 4,
    alignSelf: 'flex-end'
  }
});

export default ChatInput;
