import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser, mockProject } from '../../mocks/resolvers';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import { ProjectProvider } from '../../context/ProjectContext';
import Project from './Project';

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),
  rest.post(`${process.env.API_URL}/api/v1/projects`, (req, res, ctx) => {
    return res(ctx.json(mockProject));
  }),
  rest.get(
    `${process.env.API_URL}/api/v1/projects/:project_id`,
    (req, res, ctx) => {
      return res(ctx.json(mockProject));
    }
  )
);

describe('Project', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  // TODO: this test correctly renders an empty project as shown in the screen.debug at line 53, but the Reactronica library used in this project throws numerous errors - may need to examine React Error Boundaries
  it.skip('should render an empty project', async () => {
    render(
      <MemoryRouter initialEntries={['/project/1']}>
        <UserProvider>
          <ProjectProvider>
            <Routes>
              <Route
                path="project/:id"
                element={<Project isLoggedIn={true} />}
              />
            </Routes>
          </ProjectProvider>
        </UserProvider>
      </MemoryRouter>
    );

    await screen.findByText(/untitled/i);
    screen.debug();
  });
});
