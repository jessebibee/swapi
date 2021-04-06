import React, { useState } from 'react';
import { sortBy, orderBy } from 'lodash-es';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StarWarsFilm } from '../../types';

type Order = 'asc' | 'desc';

interface SortState {
  property: keyof StarWarsFilm;
  order: Order;
}

const sortFilms = (films: StarWarsFilm[], { order, property }: SortState) => {
  return order === 'asc' ?
    sortBy(films, f => f[property]) :
    orderBy(films, f => f[property], 'desc');
};

interface Column extends Pick<React.ComponentProps<typeof TableCell>, 'align' | 'component' | 'scope'> {
  property: keyof StarWarsFilm;
  headerLabel: string;
  renderCell?: (value: StarWarsFilm) => string;
}

const columns: Column[] = [
  { property: 'episode_id', headerLabel: 'Episode ID' },
  { property: 'title', headerLabel: 'Title', component: 'th', scope: 'row' },
  {
    property: 'release_date',
    headerLabel: 'Release Date',
    align: 'right',
    renderCell: ({ release_date }) => new Date(release_date).toLocaleDateString(),
  },
  { property: 'director', headerLabel: 'Director', align: 'right' },
];

interface FilmsTableProps {
  films: StarWarsFilm[];
}

export const FilmsTable: React.FC<FilmsTableProps> = ({ films }) => {
  // only allow sorting on a single column at a time
  const [sort, setSort] = useState<SortState>({ property: 'title', order: 'asc' });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StarWarsFilm) => {
    const order = property === sort.property ? 
      // flip it if it's the active sort column
      sort.order === 'asc' ? 'desc' : 'asc' :
      // always start with asc
      'asc';

    setSort({ property, order, });
  };
  
  return (
    <TableContainer component={Paper} data-testid="films-table">
      <Table aria-label="Star Wars films">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.property}
                align={column.align}
                sortDirection={sort.property === column.property ? sort.order : 'asc'}
              >
                <TableSortLabel
                  active={sort.property === column.property}
                  direction={sort.property === column.property ? sort.order : 'asc'}
                  onClick={(event: React.MouseEvent<unknown>) => handleRequestSort(event, column.property)}
                >
                  {column.headerLabel}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortFilms(films, sort).map(film => (
            <TableRow key={film.episode_id} role="row">
              {columns.map(column => (
                <TableCell
                  key={column.property}
                  component={column.component}
                  scope={column.scope}
                  align={column.align}
                >
                  {column.renderCell ?
                    column.renderCell(film) :
                    film[column.property]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}