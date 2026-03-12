import { render, renderHook } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTestQueryClient } from "./createTestQueryClient";
// import { MemoryRouter } from "react-router-dom";


// export function renderWithProviders(
//   ui,
//   { route = "/", queryClient } = {}
// ) {
//   const client = queryClient || createTestQueryClient();

//   return render(
//     <QueryClientProvider client={client}>
//       <MemoryRouter initialEntries={[route]}>
//         {ui}
//       </MemoryRouter>
//     </QueryClientProvider>
//   );
// }

export function renderWithProviders(ui) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

export function renderHookWithProviders(hook) {
  const queryClient = createTestQueryClient();

  return renderHook(hook, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    ),
  });
}
