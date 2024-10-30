import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
// import * as ReactQuery from "@tanstack/react-query";
// import userEvent from '@testing-library/user-event'
import App from './App.js';
import { useAuth0 } from "@auth0/auth0-react";
// import loading from "./assets/img/loading.svg";

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useQuery: () => ({ isLoading: false, error: {}, data: [] }),
  };
});

window.scrollTo = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      {children}
    </QueryClientProvider>
  )
}

export function useCustomHook() {
  return useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' })
}

describe('MyComponent', () => { 
  const useAuth0Mock = useAuth0;

  beforeAll(() => {
    jest.useFakeTimers();
  })

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  })

  beforeEach(() => {
    useAuth0Mock.mockImplementation(() => () => {});
  });

  afterEach(() => {
      jest.resetAllMocks();
  });

  it('contains a link with "Find Your Home Here"', async () => { 
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: createWrapper()
    })

    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: true
    })

    // await waitFor(() => result.current.isSuccess)
    // expect(result.current.data).toEqual('Hello')
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // render(<App />);
    // screen.debug();
  }); 
});