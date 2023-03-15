import { createApiRef } from '@backstage/core-plugin-api';
import { SearchApiResponse, UserProfile, UserRepositoryApiRequest, UserRepositoryApiResponse, WorkflowRunApiRequest, WorkflowRunApiResponse, WorkflowRunJobApiRequest, WorkflowRunJobApiResponse } from '../utils/types';

export interface GithubApi {
  getUserPullRequest: (params: any) => Promise<SearchApiResponse>;
  getAuthenticatedUser: ()=>Promise<UserProfile>
  getAuthenticatedUserToken: ()=>Promise<string>
  getWorkflowRuns: (params: WorkflowRunApiRequest)=>Promise<WorkflowRunApiResponse>
  getWorkflowJobsByWorkflowId: (params: WorkflowRunJobApiRequest)=>Promise<WorkflowRunJobApiResponse>
  getAuthenticatedUserReposByType: (params: UserRepositoryApiRequest) => Promise<UserRepositoryApiResponse>
}

export const githubApiRef = createApiRef<GithubApi>({
  id: 'plugin.github.service',
});
