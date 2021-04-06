import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, queryClient } from '../../../testUtils';
import { FilmsContainer } from '..';
import { StarWarsFilm } from '../../../types';

const films: StarWarsFilm[] = [
  {
    episode_id: 5,
    title: 'The Empire Strikes Back',
    release_date: '1980-05-17',
    director: 'Irvin Kershner',
  }
];

const server = setupServer(
  rest.get('https://swapi.dev/api/films/', (req, res, ctx) => {
    return res(ctx.json({ results: films }));
  })
);

describe('FilmsContainer', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  
  afterEach(() => {
    server.resetHandlers();
    queryClient.getQueryCache().clear();
  });
  
  it('should show a loading skeleton', () => {
    render(<FilmsContainer />);

    expect(screen.getByTestId('skeleton')).toBeVisible();
  });
  
  it('should show an error when data fetching fails', async () => {
    server.resetHandlers(
      rest.get('https://swapi.dev/api/films/', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      })
    );
    
    render(<FilmsContainer />);

    expect(await screen.findByTestId('error')).toBeVisible();
  });

  it('should show a table of films after data loads', async () => {
    render(<FilmsContainer />);

    expect(await screen.findByTestId('films-table')).toBeVisible();
  });
});