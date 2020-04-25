import viewEngine from '../viewEngine';

jest.mock('express-handlebars');
jest.mock('../../helpers/resolveBundle');

describe('server/middleware/vewEngine.js', () => {
   test('registers the view engine successfully', () => {
      const app = {
         set: jest.fn(),
         engine: jest.fn()
      };

      const logger = {
         info: jest.fn(),
         trace: jest.fn(),
         debug: jest.fn(),
         error: jest.fn()
      };

      const viewsDir = 'viewsDir';

      expect(() => viewEngine(app, logger, viewsDir)).not.toThrow();
      expect(app.engine).toHaveBeenCalledTimes(1);
      expect(app.set).toHaveBeenCalledTimes(2);
   });
});
