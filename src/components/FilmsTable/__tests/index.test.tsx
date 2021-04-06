import { render, screen, within } from '../../../testUtils';
import { FilmsTable } from '..';
import { StarWarsFilm } from '../../../types';
import userEvent from '@testing-library/user-event';

const films: StarWarsFilm[] = [
  {
    episode_id: 5,
    title: 'The Empire Strikes Back',
    release_date: '1980-05-17',
    director: 'Irvin Kershner',
  },
  {
    episode_id: 4,
    title: 'A New Hope',
    release_date: '1977-05-25',
    director: 'George Lucas',
  }
];

describe('FilmsTable', () => {
  it('should render', () => {
    render(<FilmsTable films={films} />);

    expect(screen.getByTestId('films-table')).toBeVisible();
  });

  it('should sort by default on Title', () => {
    const { container } = render(<FilmsTable films={films} />);

    const rows = container.querySelectorAll('[role="row"]');
    expect(rows.length).toEqual(films.length);

    // A New Hope gets passed in via props second,
    // it would only appear in the first row if it was auto-sorted
    expect(within(rows.item(0) as HTMLElement).getByText('A New Hope')).toBeTruthy();
    expect(within(rows.item(1) as HTMLElement).getByText('The Empire Strikes Back')).toBeTruthy();
  });
  
  it('should be sortable', () => {
    const { container } = render(<FilmsTable films={films} />);

    const initialRows = container.querySelectorAll('[role="row"]');
    expect(initialRows.length).toEqual(films.length);

    // flips existing Title sort to desc
    userEvent.click(screen.getByText('Title'));

    // requery the rows
    const rows = container.querySelectorAll('[role="row"]');

    expect(within(rows.item(0) as HTMLElement).getByText('The Empire Strikes Back')).toBeTruthy();
    expect(within(rows.item(1) as HTMLElement).getByText('A New Hope')).toBeTruthy();
  });
});