import { isDeployed, isProduction } from '../environmentResolver';

describe('server/utils/environmentResolver.js', () => {
   let origNodeEnv;
   beforeEach(() => {
      origNodeEnv = process.env.NODE_ENV;
   });

   afterEach(() => {
      process.env.NODE_ENV = origNodeEnv;
   });

   test('returns isDeployed = true when NODE_NEV !== "local"', () => {
      process.env.NODE_ENV = 'not local';
      expect(isDeployed()).toEqual(true);
   });

   test('returns isDeployed = false when NODE_ENV === "local"', () => {
      process.env.NODE_ENV = 'local';
      expect(isDeployed()).toEqual(false);
   });

   test('return isProduction = true when NODE_ENV === "production"', () => {
      process.env.NODE_ENV = 'production';
      expect(isProduction()).toEqual(true);
   });

   test('returns isProduction = false when NODE_ENV !== "production"', () => {
      process.env.NODE_ENV = 'not production';
      expect(isProduction()).toEqual(false);
   });
});
