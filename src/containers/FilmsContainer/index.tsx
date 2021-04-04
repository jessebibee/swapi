import React from 'react';
import { useQuery } from 'react-query';
import { getStartWarsFilms } from '../../api';
import { FilmsTable } from '../../components/FilmsTable';
import { StarWarsFilm } from '../../types';

export const FilmsContainer: React.FC = () => {
  const { isLoading, data, error } = useQuery<StarWarsFilm[], Error>(
    'films',
    getStartWarsFilms,
    {
      // safe to have a pretty long cache policy!
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );

  console.log({ isLoading, data, error });

  if (isLoading) {
    return <span>Loading...</span>
  }

  // if it's not loading we should have data
  if (!data) {
    return <span>Error: {error?.message || 'Unable to fetch Star Wars films'}</span>
  }
  
  return (
    <FilmsTable films={data} />
  );
};
