import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import GenericStyles from '../styles/GenericStyles';

import { logErrorWithMessage } from '../utils/logger';
import CustomText from '../components/lib/CustomText';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/*error*/) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    logErrorWithMessage(
      error.message,
      `componentDidCatch from ${this.props.screenName}`
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={GenericStyles.fill}>
          <CustomText style={GenericStyles.centerAlignedText}>
            Something went wrong.
          </CustomText>
        </View>
      );
    }

    return <View style={GenericStyles.fill}>{this.props.children}</View>;
  }
}

ErrorBoundary.propTypes = {
  screenName: PropTypes.string.isRequired
};

export default ErrorBoundary;
