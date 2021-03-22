module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'comma-dangle': [2, 'never'],
    'no-console': 'error',
    'react-native/no-unused-styles': 'error',
    'no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
};
