import { StyleSheet } from 'react-native';
import Colors from '../common/Colors';

const GenericStyles = StyleSheet.create({
  fill: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  centerAlignedRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  upperCase: {
    textTransform: 'uppercase'
  },
  bold: {
    fontWeight: 'bold'
  },
  fontWeightNormal: {
    fontWeight: 'normal'
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  centerAlignedText: {
    textAlign: 'center'
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  disabled: {
    opacity: 0.5
  },
  justifyContentFlexEnd: {
    justifyContent: 'flex-end'
  },
  alignSelfFlexEnd: {
    alignSelf: 'flex-end'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  p16: {
    padding: 16
  },
  fontSize32: {
    fontSize: 32
  },
  fontSize28: {
    fontSize: 28
  },
  fontSize20: {
    fontSize: 20
  },
  mt12: {
    marginTop: 12
  },
  mt24: {
    marginTop: 24
  },
  mr16: {
    marginRight: 16
  },
  greyText: {
    color: Colors.DARK_GREY
  },
  whiteText: {
    color: Colors.WHITE
  },
  flexGrow1: {
    flexGrow: 1
  },
  whiteBackgroundContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1
  },
  semiBold: {
    fontFamily: 'Roboto-Medium'
  }
});

export function elevationShadowStyle(elevation) {
  let style = {};
  if (elevation) {
    style = {
      elevation,
      marginVertical: 5,
      shadowColor: Colors.GREY,
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.5,
      shadowRadius: 0.8 * elevation
    };
  }
  return style;
}

export default GenericStyles;
