const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 추가 설정
config.resolver.extraNodeModules = {
  crypto: require.resolve('react-native-crypto'),
  stream: require.resolve('readable-stream'),
  buffer: require.resolve('@craftzdog/react-native-buffer'),
};

module.exports = config;