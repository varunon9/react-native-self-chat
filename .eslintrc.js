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
    ],
    'max-len': [
      1,
      80,
      2,
      {
        ignoreComments: true,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$'
      }
    ],
    'no-useless-escape': 'warn',
    'no-empty': 'warn',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'eol-last': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn'
  }
};
