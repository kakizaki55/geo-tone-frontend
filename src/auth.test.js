import { render, screen } from '@testing-library/react';
import Auth from './components/Auth/Auth';

test('renders Auth form component in a registering state', () => {
  render(<Auth isRegistering />);
  const formHeader = screen.getByRole('heading');
  expect(formHeader.innerHTML).toEqual('Register');
});

test('renders Auth component in a Logging In state', () => {
  render(<Auth />);
  const formHeader = screen.getByRole('heading');
  expect(formHeader.innerHTML).toEqual('Log In');
});
