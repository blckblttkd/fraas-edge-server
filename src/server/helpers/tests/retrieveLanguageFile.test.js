import path from 'path';
import fs from 'fs';
import retrieveLanguageFile from '../retrieveLanguageFile';

jest.mock('path', () => ({
   resolve: jest.fn().mockImplementation(() => 'blah')
}));
jest.mock('fs');

describe('server/helpers/retrieveLanguageFile.js', () => {
   beforeEach(() => {
      jest.resetAllMocks();
   });

   test('returns contents of language file successfully', () => {
      const log = {
         error: jest.fn()
      };
      const fileContents = {
         myLabel: 'Label'
      };

      fs.readFileSync.mockImplementation(() => (JSON.stringify(fileContents)));
      fs.existsSync.mockImplementation(() => true);

      const actual = retrieveLanguageFile({ log }, 'en');
      expect(actual).toEqual(fileContents);
      expect(log.error).not.toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(path.resolve).toHaveBeenCalledTimes(1);
   });

   test('logs an error if the file does not exist', () => {
      const log = {
         error: jest.fn()
      };

      fs.existsSync.mockImplementation(() => false);

      let actual;
      expect(() => {
         actual = retrieveLanguageFile({ log }, 'en');
      }).not.toThrow();

      expect(actual).toEqual({});
      expect(log.error.mock.calls[0][0].logId).toEqual('014c9d67-f036-4d4a-8502-669b0da37c7e');
      expect(fs.readFileSync).not.toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(path.resolve).toHaveBeenCalledTimes(1);
   });

   test('logs an error and does not throw if something bad happens', () => {
      const log = {
         error: jest.fn()
      };

      fs.existsSync = () => {
         throw new Error('bad day');
      };

      let actual;
      expect(() => {
         actual = retrieveLanguageFile({ log }, 'en');
      }).not.toThrow();

      expect(actual).toEqual({});
      expect(log.error).toHaveBeenCalledTimes(1);
      expect(log.error.mock.calls[0][0].logId).toEqual('a8c84309-05d3-4408-b986-944d2db6578b');
      expect(fs.readFileSync).not.toHaveBeenCalled();
      expect(path.resolve).toHaveBeenCalledTimes(1);
   });
});
