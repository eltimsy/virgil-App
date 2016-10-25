'use strict';

window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/socket.io');
const socketConfig = {
  path: '/',
  transports: ['websocket'],
  query: ''
};
export default io;
export { socketConfig };
