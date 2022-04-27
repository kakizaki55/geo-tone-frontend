import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Home from './Home';

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/users/count`, (req, res, ctx) => {
    return res(ctx.json(1));
  }),

  rest.get(`${process.env.API_URL}/api/v1/projects/count`, (req, res, ctx) => {
    return res(ctx.json(2));
  })
);

describe('Home', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should display link to sign up,and the App name. ', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    screen.getByRole('heading', {
      name: /welcome to geo tone\./i,
    });

    screen.getByRole('link', {
      name: /sign up/i,
    });

    await screen.findByText(
      /join the 1 other synth wizards who have created 2 projects!/i
    );
  });
});
