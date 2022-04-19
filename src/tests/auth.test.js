import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import { UserContext, UserProvider } from '../context/UserContext';

test('renders Auth form component in a registering state', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Auth isRegistering />
      </UserProvider>
    </MemoryRouter>
  );
  const formHeader = screen.getByRole('heading');
  expect(formHeader.innerHTML).toEqual('Register');
});

test('renders Auth component in a Logging In state', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Auth />
      </UserProvider>
    </MemoryRouter>
  );
  const formHeader = screen.getByRole('heading');
  expect(formHeader.innerHTML).toEqual('Log In');
});
