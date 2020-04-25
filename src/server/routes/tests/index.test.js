import index from '..';

jest.mock('express', () => ({
   Router: jest.fn().mockImplementation(() => ({
      get: jest.fn()
   }))
}));

describe('server/routes/index.js', () => {
   test('loads all routes successfully', () => {
      expect(() => index).not.toThrow();
   });
});
