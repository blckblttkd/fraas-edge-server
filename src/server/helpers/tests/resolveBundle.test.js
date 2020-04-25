import fs from 'fs';
import path from 'path';
import resolveBundle from '../resolveBundle';
import manifestFixture from './fixtures/manifest.json';

jest.mock('fs');
jest.mock('path');

describe('server/helpers/resolveBundle', () => {
   beforeEach(() => {
      jest.resetAllMocks();
   });

   test('returns relative url to a given bundle name', () => {
      fs.existsSync.mockImplementation(() => true);
      path.resolve.mockImplementation(() => './tests/fixtures/manifest.json');

      const actual = resolveBundle({})('bundle.js');
      expect(actual).toEqual(`/public/${manifestFixture['bundle.js']}`);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(path.resolve).toHaveBeenCalledTimes(1);
   });

   test('returns a simple path under /public if the bundle does not exist in manifest', () => {
      fs.existsSync.mockImplementation(() => false);
      path.resolve.mockImplementation(() => 'some random path that should never get called');

      const actual = resolveBundle({})('missing.js');
      expect(actual).toEqual('/public/missing.js');
      expect(path.resolve).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
   });

   test('throws an error and logs when the read fails', () => {
      fs.existsSync = () => {
         throw new Error('bad day');
      };
      path.resolve.mockImplementation(() => 'phony path');
      const logger = {
         error: jest.fn()
      };

      expect(() => resolveBundle(logger)('ignore_me.js')).toThrow('bad day');
      expect(logger.error.mock.calls[0][0].logId).toEqual('e3cbb634-0db8-4f03-a708-29f2f75a5137');
      expect(path.resolve).toHaveBeenCalledTimes(1);
   });
});
