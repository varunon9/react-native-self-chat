import React from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../../common/Colors';

const CustomActivityIndicator = props => {
  return <ActivityIndicator color={Colors.GREEN} {...props} />;
};

export default CustomActivityIndicator;
