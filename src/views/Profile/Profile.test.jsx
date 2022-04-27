import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockUser, mockProfile } from '../../mocks/resolvers';
import { UserProvider } from '../../context/UserContext';
import Profile from './Profile';
import CreateProfile from '../CreateProfile/CreateProfile';
import EditProfile from '../EditProfile/EditProfile';
import Home from '../Home/Home';

const user = userEvent.setup();

const server = setupServer(
  rest.post(`${process.env.API_URL}/api/v1/profiles`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),

  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),

  rest.get(
    `${process.env.API_URL}/api/v1/profiles/:username`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no profile' }));
    }
  ),

  rest.get(
    `${process.env.API_URL}/api/v1/projects/user/:user_id`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no projects' }));
    }
  ),

  rest.get(`${process.env.API_URL}/api/v1/users/count`, (req, res, ctx) => {
    return res(ctx.json(1));
  }),

  rest.get(`${process.env.API_URL}/api/v1/projects/count`, (req, res, ctx) => {
    return res(ctx.json(2));
  }),

  rest.patch(
    `${process.env.API_URL}/api/v1/profiles/:username`,
    (req, res, ctx) => {
      req.body = { bio: 'edited', avatar: 'edited' };
      return res(ctx.json({ ...mockProfile, ...req.body }));
    }
  ),

  rest.delete(
    `${process.env.API_URL}/api/v1/users/:user_id`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'Successfully deleted user.' }));
    }
  )
);

window.confirm = jest.fn(() => true);

describe('Profile', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render an empty profile page and allow the user to create then edit their profile', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          `/user/${mockUser.username}/edit`,
          '/user/new',
          `/user/${mockUser.username}`,
        ]}
      >
        <UserProvider>
          <Routes>
            <Route path="user">
              <Route path=":username" element={<Profile />} />
              <Route path="new" element={<CreateProfile />} />
              <Route path=":username/edit" element={<EditProfile />} />
            </Route>
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    let redirectButton = await screen.findByRole('button', {
      name: /click here/i,
    });

    await user.click(redirectButton);

    // CREATE PROFILE - Redirect to /user/new
    //
    // If navigated to /user/new, should display the following:

    let bioInput = await screen.findByRole('textbox', { name: /bio/i });
    let avatarInput = await screen.findByRole('textbox', { name: /avatar/i });

    redirectButton = await screen.findByRole('button', {
      name: /create/i,
    });

    await user.type(bioInput, 'mock bio');
    await user.type(avatarInput, 'mock image url');

    await user.click(redirectButton);

    // PROFILE - Redirect to /user/:username
    //
    // On redirect to user profile, response carries new user profile data

    server.use(
      rest.get(
        `${process.env.API_URL}/api/v1/profiles/:username`,
        (req, res, ctx) => {
          return res(ctx.json(mockProfile));
        }
      )
    );

    redirectButton = await screen.findByRole('button', {
      name: /edit profile/i,
    });

    await user.click(redirectButton);

    // EDIT PROFILE - Redirect to /user/:username/edit
    //
    // On redirect, should allow the user to edit bio and avatar

    bioInput = await screen.findByRole('textbox', { name: /bio/i });
    avatarInput = await screen.findByRole('textbox', { name: /avatar/i });

    redirectButton = await screen.findByRole('button', {
      name: /save/i,
    });

    await user.type(bioInput, 'edited bio');
    await user.type(avatarInput, 'edited image url');

    await user.click(redirectButton);

    server.use(
      rest.get(
        `${process.env.API_URL}/api/v1/profiles/:username`,
        (req, res, ctx) => {
          return res(
            ctx.json({
              ...mockProfile,
              bio: 'edited bio',
              avatar: 'edited image url',
            })
          );
        }
      )
    );

    // Expected Profile page after edits
    await screen.findByRole('heading', { name: /mockuser/i });
    await screen.findByText(/edited bio/i);
    await screen.findByAltText(/mockuser's avatar/i);
    expect(await screen.findAllByRole('button')).toHaveLength(3);
  });

  it('should allow a user to delete their account, then redirect to home page', async () => {
    render(
      <MemoryRouter initialEntries={[`/user/${mockUser.username}`]}>
        <UserProvider>
          <Routes>
            <Route path="user/:username" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    server.use(
      rest.get(
        `${process.env.API_URL}/api/v1/profiles/:username`,
        (req, res, ctx) => {
          return res(ctx.json(mockProfile));
        }
      )
    );

    const deleteButton = await screen.findByRole('button', {
      name: /delete account/i,
    });

    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();

    // HOME - Redirect to /
    //
    // The user should be logged out and sent to the home page
    await screen.findByRole('heading', { name: /geo tone/i });
    expect(deleteButton).not.toBeInTheDocument();
  });
});
