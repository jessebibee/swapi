import React from 'react';
import { StarWarsFilm } from '../../types';

interface FilmsTableProps {
  films: StarWarsFilm[];
}

export const FilmsTable: React.FC<FilmsTableProps> = ({ films }) => (
  <div>{films.map(f => f.title).join(', ')}</div>
);