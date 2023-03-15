import { useApi } from '@backstage/core-plugin-api';
import { Repository, UserRepositoryApiRequest } from '../utils/types';
import { githubApiRef } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useUserRepos() {
  const githubClient = useApi(githubApiRef);
  const [repos, setRepos] = useState<Repository[]>([]);

  const { data: ownerRepos } = useQuery({
    queryKey: ['user-repo', { type: 'owner' }],
    queryFn: parameters => {
      return githubClient.getAuthenticatedUserReposByType(
        parameters.queryKey[1] as UserRepositoryApiRequest,
      );
    },
    enabled: true,
    cacheTime: 20000,
    staleTime: 10000,
    refetchOnWindowFocus: true,
    refetchInterval: 120000, // stops when window is not focused
  });

  const { data: memberOfRepos } = useQuery({
    queryKey: ['user-repo', { type: 'member' }],
    queryFn: parameters => {
      return githubClient.getAuthenticatedUserReposByType(
        parameters.queryKey[1] as UserRepositoryApiRequest,
      );
    },
    enabled: true,
    cacheTime: 20000,
    staleTime: 10000,
    refetchOnWindowFocus: true,
    refetchInterval: 120000, // stops when window is not focused
  });

  useEffect(() => {
    if (ownerRepos && memberOfRepos) {
      setRepos([...ownerRepos, ...memberOfRepos]);
    } else if (ownerRepos) {
      setRepos([...ownerRepos]);
    } else if(memberOfRepos){
      setRepos([...memberOfRepos]);
    }
  }, [ownerRepos, memberOfRepos]);

  return repos;
}
