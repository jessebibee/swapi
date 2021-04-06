import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StarWarsFilm } from '../../types';

interface FilmsTableProps {
  films: StarWarsFilm[];
}

export const FilmsTable: React.FC<FilmsTableProps> = ({ films }) => (
  <TableContainer component={Paper} data-testid="films-table">
    <Table aria-label="Star Wars films">
      <TableHead>
        <TableRow>
          <TableCell>Episode ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell align="right">Release Date</TableCell>
          <TableCell align="right">Director</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {films.map(film => (
          <TableRow key={film.episode_id}>
            <TableCell>{film.episode_id}</TableCell>
            <TableCell component="th" scope="row">{film.title}</TableCell>
            <TableCell align="right">{film.release_date}</TableCell>
            <TableCell align="right">{film.director}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);