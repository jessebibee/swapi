import { StarWarsFilm } from '../types';

interface SwapiResult {
  count: number;
  prev: SwapiResult | null;
  next: SwapiResult | null;
  results: StarWarsFilm[];
}

export const getStartWarsFilms = async (): Promise<StarWarsFilm[]> => {
  const response = await fetch('https://swapi.dev/api/films/');

  if (!response.ok) {
    // TODO - improve this with a better error
    throw new Error(response.statusText);
  }

  const { results } = await (response.json() as Promise<SwapiResult>);

  return results;
};