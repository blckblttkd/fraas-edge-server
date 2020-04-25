const mockChild = jest.fn();
jest.mock('bunyan', () => (
   class Logger {
      child = mockChild
   }
));


describe('server/utils/logger', () => {
   beforeEach(() => {
      jest.resetAllMocks();
   });

   test('creates a logger with a given request id and log input as a string', () => {
      const mockInfo = jest.fn();
      mockChild.mockImplementation(() => ({
         info: mockInfo
      }));
      const createLogger = require('../logger').default;
      const actual = createLogger('myId');
      expect(actual).not.toBeNull();
      expect(actual).not.toBeUndefined();
      expect(actual).toHaveProperty('info');
      actual.info('log');

      expect(mockChild).toHaveBeenCalledTimes(1);
      expect(mockInfo.mock.calls[0][0].requestId).toEqual('myId');
   });

   test('creates a logger with a given request id and log input as an object', () => {
      const mockInfo = jest.fn();
      mockChild.mockImplementation(() => ({
         info: mockInfo
      }));
      const createLogger = require('../logger').default;
      const actual = createLogger('myId');
      expect(actual).not.toBeNull();
      expect(actual).not.toBeUndefined();
      expect(actual).toHaveProperty('info');
      actual.info({ message: 'my message' });

      expect(mockChild).toHaveBeenCalledTimes(1);
      expect(mockInfo.mock.calls[0][0]).toEqual({ requestId: 'myId', message: 'my message' });
   });

   test('creates a logger without a request id and logs as an object', () => {
      const mockInfo = jest.fn();
      mockChild.mockImplementation(() => ({
         info: mockInfo
      }));
      const createLogger = require('../logger').default;
      const actual = createLogger();
      expect(actual).not.toBeNull();
      expect(actual).not.toBeUndefined();
      expect(actual).toHaveProperty('info');
      actual.info({ message: 'my message' });

      expect(mockChild).toHaveBeenCalledTimes(1);
      expect(mockInfo.mock.calls[0][0]).toEqual({ message: 'my message' });
   });
});
