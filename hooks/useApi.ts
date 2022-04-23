import useFetch, { CachePolicies, IncomingOptions } from 'use-http';

export default function useApi(options?: IncomingOptions) {
  return useFetch('https://paisa-challange.herokuapp.com/api/v1/paisapp', {
    cachePolicy: CachePolicies.NO_CACHE,
    ...options,
  });
}

export type ApiResponse<T = undefined> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};
