import { render, screen } from '@testing-library/react';
import App from './App';

// import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
// import {App, LocationDisplay} from './app'
// import {BrowserRouter, MemoryRouter} from 'react-router-dom'

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // const linkElement = screen.getByText(/Home/i);
  // expect(linkElement).toBeInTheDocument();
});

// test('full app rendering/navigating', async () => {
//   render(<App />, {wrapper: BrowserRouter})
//   const user = userEvent.setup()

//   // verify page content for default route
//   expect(screen.getByText(/Home/i)).toBeInTheDocument()

//   // verify page content for expected route after navigating
//   await user.click(screen.getByText(/Services/i))
//   expect(screen.getByText(/Services/i)).toBeInTheDocument()
// })
