// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Jest in CRA (Jest 27) cannot import ESM-only packages like react-router-dom v7.
// Provide a lightweight mock of react-router-dom sufficient for our unit tests.
// This avoids resolver errors while keeping component behavior predictable.
jest.mock(
  'react-router-dom',
  () => {
    const Router = ({ children }: any) => children as any;
    const Routes = ({ children }: any) => children as any;
    const Route = ({ element }: any) => (element ?? null) as any;
    return {
      __esModule: true,
      MemoryRouter: Router,
      BrowserRouter: Router,
      Routes,
      Route,
      Link: ({ children, to }: any) => ({ type: 'a', props: { href: to, children } } as any),
      NavLink: ({ children, to }: any) => ({ type: 'a', props: { href: to, children } } as any),
      useNavigate: () => jest.fn(),
      useParams: () => ({}),
    };
  },
  { virtual: true }
);

// Mock axios to avoid ESM parsing issues in Jest 27 (CRA) and to keep API calls controllable in tests.
jest.mock(
  'axios',
  () => {
    const get = jest.fn();
    const post = jest.fn();
    const instance = { get, post } as any;
    const create = () => instance;
    return {
      __esModule: true,
      default: { create } as any,
      create,
    };
  },
  { virtual: true }
);
