import healthChecker from '../healthChecker';

describe('server/utils/healthChecker', () => {
   test('returns true - code coverage only', async () => {
      expect(await healthChecker()).toBe(true);
   });
});
