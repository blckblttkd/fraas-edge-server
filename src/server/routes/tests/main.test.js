import React from 'react';
import retrieveLanguageFile from '../../helpers/retrieveLanguageFile';
import mainRoute from '../main';

jest.mock('../../utils/i18n');
jest.mock('../../helpers/retrieveLanguageFile');
jest.mock('../../../universal/components/Root', () => () => (<div>Root Stub</div>));

describe('server/routes/main.js', () => {
   beforeEach(() => {
      jest.resetAllMocks();
   });

   test('responds with a call to render when things go right', () => {
      retrieveLanguageFile.mockImplementation(() => ({ someLang: 'english' }));
      const req = {
         log: {
            error: jest.fn()
         }
      };
      const res = {
         render: jest.fn()
      };

      expect(() => mainRoute(req, res)).not.toThrow();
      expect(req.log.error).not.toHaveBeenCalled();
   });

   test('responds with a 500 error when an exception occurs', () => {
      retrieveLanguageFile.mockImplementation(() => {
         throw new Error('bad day');
      });
      const req = {
         log: {
            error: jest.fn()
         }
      };
      const res = {
         render: jest.fn(),
         boom: {
            internal: jest.fn()
         }
      };

      expect(() => mainRoute(req, res)).not.toThrow();
      expect(req.log.error.mock.calls[0][0].logId).toEqual('ab524516-5011-460c-9fa8-a0123d55983c');
      expect(res.boom.internal).toHaveBeenCalledTimes(1);
   });
});
