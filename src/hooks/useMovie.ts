import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

export const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,

  });

  return {
    movie: data,
    isLoading: !error && !data || isLoading,
    isError: error,
  };

}