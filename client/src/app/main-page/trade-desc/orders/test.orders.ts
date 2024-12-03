import {OrderConfirmation} from '../../../services/socket.schema';

export const TEST_ORDERS: OrderConfirmation[] = [
  {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: false, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: false, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 60, active: false, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 60, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SELL', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'BUY', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
  {symbol: 'SAPJ', route: 'SHORT', uuid: 'Some UUID', val: 27, volume: 0, active: true, originalVolume: 70, account: 'some acc', blockedPrice: -1, timestamp: "123123434324"},
]
