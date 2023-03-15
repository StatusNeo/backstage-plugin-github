import { useApi } from '@backstage/core-plugin-api';
import { useQuery } from '@tanstack/react-query';
import { WorkflowRunJobApiRequest } from '../utils/types';
import { githubApiRef } from '../api';

export function useWorkflowRunJobs(params: WorkflowRunJobApiRequest) {
  const githubClient = useApi(githubApiRef);

  return useQuery({
    queryKey: ['workflow-run-jobs', params],
    queryFn: parameters => {
      return githubClient.getWorkflowJobsByWorkflowId(
        parameters.queryKey[1] as WorkflowRunJobApiRequest,
      );
    },
    enabled: true,
    cacheTime: 20000,
    staleTime: 10000,
    refetchOnWindowFocus: true,
    refetchInterval: 120000, // stops when window is not focused
  });
}
