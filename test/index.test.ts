import { main } from '../src/index';

test('main function returns Hello world', () => {
  expect(main()).toBe('Hello world');
});