import { useApi } from '@backstage/core-plugin-api';
import { useQuery } from '@tanstack/react-query';
import { WorkflowRunApiRequest } from '../utils/types';
import { githubApiRef } from '../api';

export function useWorkflowRuns(params: WorkflowRunApiRequest) {
  const githubClient = useApi(githubApiRef);

  return useQuery({
    queryKey: ['workflow-runs', params],
    queryFn: parameters => {
      return githubClient.getWorkflowRuns(
        parameters.queryKey[1] as WorkflowRunApiRequest,
      );
    },
    enabled: !!params.repoPath,
    cacheTime: 20000,
    staleTime: 10000,
    refetchOnWindowFocus: true,
    refetchInterval: 120000, // stops when window is not focused
  });
}
