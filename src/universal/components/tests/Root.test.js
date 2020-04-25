import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Root from '../Root';

jest.mock('react-i18next', () => ({
   useTranslation: jest.fn().mockImplementation(() => ({
      t: jest.fn(),
      i18n: {
         on: jest.fn()
      }
   }))
}));

describe('universal/components/Root.js', () => {
   test('renders successfully', () => {
      let wrapper;
      act(() => {
         wrapper = renderer.create(<Root />);
      });
      expect(wrapper.root).not.toBeNull();
      expect(wrapper.root).not.toBeUndefined();
   });
});
