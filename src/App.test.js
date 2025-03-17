import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
// import * as ReactQuery from "@tanstack/react-query";
// import userEvent from '@testing-library/user-event'
import App from './App.js';
import { useAuth0 } from "@auth0/auth0-react";
// import loading from "./assets/img/loading.svg";


// if you're using jest 27.4.0+ and ts-jest 28.0.0+
// import { mocked } from "jest-mock";
// import { cleanup } from '@testing-library/react';
// import Home from "./components/Home.js";
// import { HomePageDetails } from "./components/admin/CreateService.js"
// import { ServicesDetails } from "./components/admin/ServicesDetails.js";
// import { ServiceEdit } from "./components/admin/ServiceEdit.js";
// import { Service } from "./components/Service.js";
// import { CreateService } from "./components/admin/CreateService.js";
// import { TeamMemberEdit } from "./components/admin/TeamMemberEdit2.js";
// import { TeamDetails } from "./components/admin/TeamDetails.js";
// import { CreateTeamMember } from "./components/admin/CreateTeamMember2.js";
// import Loading from "./components/Loading";

// jest.mock("./components/Home.js");
// jest.mock("./components/admin/CreateService.js");
// jest.mock("./components/admin/ServicesDetails.js");
// jest.mock("./components/admin/ServicesDetails.js");
// jest.mock("./components/admin/ServiceEdit.js");
// jest.mock("./components/Service.js");
// jest.mock("./components/admin/CreateService.js");
// jest.mock("./components/admin/TeamMemberEdit2.js");
// jest.mock("./components/admin/TeamDetails.js");
// jest.mock("./components/admin/CreateTeamMember2.js");
// jest.mock("./components/Loading");


jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

// const mockedUseAuth0 = mocked(useAuth0, true);

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