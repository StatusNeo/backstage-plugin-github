import { useApi } from '@backstage/core-plugin-api';
import { useQuery } from '@tanstack/react-query';
import { SearchApiFetchRequest } from '../utils/types';
import { githubApiRef } from './../api';

export function useUserPullRequests(
  enabled: boolean = false,
  params: SearchApiFetchRequest,
) {
  const githubClient = useApi(githubApiRef);

  return useQuery(
    ['user-pull-requests', params],
    parameters => {
      return githubClient.getUserPullRequest(parameters.queryKey[1]);
    },
    {
      enabled: enabled,
      cacheTime: 20000,
      staleTime: 10000,
      refetchOnWindowFocus: true,
      refetchInterval: 120000, // stops when window is not focused
    },
  );
}
