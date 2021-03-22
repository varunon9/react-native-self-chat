import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewPropTypes,
  Modal,
  ScrollView
} from 'react-native';

import Colors from '../../common/Colors';
import GenericStyles from '../../styles/GenericStyles';

import CustomText from './CustomText';
import { closeIcon } from '../../images';

const CustomPopupModal = props => {
  const {
    onRequestClose,
    showCloseIcon,
    visible,
    title,
    backdrop,
    modalContainerStyle,
    modalContentStyle,
    modelTitleContainerStyle
  } = props;
  return (
    <Modal
      onRequestClose={onRequestClose}
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <TouchableWithoutFeedback
          activeOpacity={0}
          onPress={backdrop ? onRequestClose : null}
        >
          <View
            style={[
              styles.modalContainer,
              GenericStyles.p16,
              modalContainerStyle
            ]}
          >
            <View style={[styles.modalContent, modalContentStyle]}>
              <View style={[GenericStyles.row, modelTitleContainerStyle]}>
                {title ? (
                  <CustomText
                    style={[GenericStyles.bold, GenericStyles.fontSize28]}
                  >
                    {title}
                  </CustomText>
                ) : null}
                <View style={GenericStyles.fill} />
                {showCloseIcon && (
                  <TouchableOpacity onPress={onRequestClose}>
                    <Image source={closeIcon} style={styles.closeIcon} />
                  </TouchableOpacity>
                )}
              </View>
              {props.children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.SEMI_TRANSPARENT,
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderRadius: 4
  },
  closeIcon: {
    height: 12,
    width: 12,
    padding: 5
  },
  flexGrow: {
    flexGrow: 1
  }
});

CustomPopupModal.defaultProps = {
  showCloseIcon: true
};
CustomPopupModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  backdrop: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  modalContainerStyle: ViewPropTypes.style,
  modalContentStyle: ViewPropTypes.style,
  modelTitleContainerStyle: ViewPropTypes.style
};

export default CustomPopupModal;
