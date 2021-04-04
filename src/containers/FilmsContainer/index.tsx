import React from 'react';
import { useQuery } from 'react-query';
import { Skeleton } from '@material-ui/lab';
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

  if (isLoading) {
    // No real good way to infer the height of the table since the row count
    // is unknown in a real scenario.  Width 100% I think works well since it
    // allows calling code to determine size and spacing.
    return <Skeleton variant="rect" width="100%" height={200} animation="wave" />;
  }

  // if it's not loading we should have data
  if (!data) {
    return (
      <div style={{ textAlign: 'center' }}>
        <span>Error: {error?.message || 'Unable to fetch Star Wars films'}</span>
      </div>
    );
  }
  
  return (
    <FilmsTable films={data} />
  );
};
