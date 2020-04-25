import i18n from 'i18next';
import i18nUtil from '../i18n';

jest.mock('i18next');

describe('server/utils/i18n.js', () => {
   test('calls init successfully', () => {
      const translations = {
         myTranslation: 'some language'
      };

      i18nUtil(translations);

      expect(i18n.init).toHaveBeenCalledTimes(1);
      expect(i18n.init.mock.calls[0][0].resources.en.translation).toEqual(translations);
   });
});
