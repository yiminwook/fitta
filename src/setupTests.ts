import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import mockServer from '@/mocks/server';

//테스트 전에 1번 실행
beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: 'bypass' });
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

//테스트가 끝난후
afterEach(() => mockServer.resetHandlers());
//모든 테스트가 끝난후 1번 실행
afterAll(() => mockServer.close());

// const url = screen.logTestingPlaygroundURL();
