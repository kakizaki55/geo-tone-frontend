import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { UserProvider } from '../../context/UserContext';
import SignIn from './SignIn';
import { mockUser } from '../../mocks/resolvers';

const server = setupServer(
  rest.post(`${process.env.API_URL}/api/v1/users`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),
  rest.post(`${process.env.API_URL}/api/v1/users/sessions`, (req, res, ctx) => {
    return res(ctx.json({ message: 'Successfully signed in!' }));
  }),
  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  })
);

describe('SignIn', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should Sign In a user .', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <SignIn />
        </UserProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByRole('textbox', {
      name: /username:/i,
    });
    const passwordInput = screen.getByLabelText(/password:/i);

    await userEvent.type(usernameInput, 'mockuser');
    await userEvent.type(passwordInput, 'mockpassword');
    const registerButton = screen.getByRole('button', {
      name: /Log In/i,
    });
    await userEvent.click(registerButton);
    await screen.findByText(/Successfully signed in!/i);
  });
});
