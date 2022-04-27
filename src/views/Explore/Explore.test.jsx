import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockMultipleProjects } from '../../mocks/resolvers';
import Explore from './Explore';

const user = userEvent.setup();

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/projects/`, (req, res, ctx) => {
    return res(ctx.json(mockMultipleProjects));
  })
);

describe('Explore', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should display a list of all existing projects', async () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const projects = await screen.findAllByLabelText('project title');

    expect(projects).toHaveLength(2);
  });
});
