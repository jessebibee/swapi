// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


const App: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: App, ...options })

export * from '@testing-library/react';

export { customRender as render };
