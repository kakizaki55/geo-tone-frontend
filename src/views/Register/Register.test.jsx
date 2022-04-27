import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { UserProvider } from '../../context/UserContext';
import Register from './Register';
import Profile from '../Profile/Profile';
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
  }),

  rest.get(
    `${process.env.API_URL}/api/v1/profiles/:username`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no profile' }));
    }
  )
);

describe('Register', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  //TODO: tried to do a time out to account for the 2 second time out in the app.
  //   jest.setTimeout(10000);

  it('should register and sign up the user.', async () => {
    render(
      <MemoryRouter
        initialEntries={[`/user/${mockUser.username}`, '/register']}
      >
        <UserProvider>
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="user/:username" element={<Profile />} />
          </Routes>
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
      name: /register/i,
    });
    await userEvent.click(registerButton);
    await screen.findByText(
      /You have successfully registered! Logging you in.../i
    );

    // TODO: tested with out the time out for out message of successfully logging in an registering
    // await screen.findByText(/loading.../i);
    // await screen.findByRole('button', { name: /create profile/i });
    // screen.debug();
  });
});
