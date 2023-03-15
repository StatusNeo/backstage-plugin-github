import { GithubApi } from './GithubApi';
import { OAuthApi, FetchApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import {
  SearchApiFetchRequest,
  SearchApiResponse,
  UserProfile,
  UserRepositoryApiRequest,
  UserRepositoryApiResponse,
  WorkflowRunApiRequest,
  WorkflowRunApiResponse,
  WorkflowRunJobApiRequest,
  WorkflowRunJobApiResponse,
} from '../utils/types';

/** @public */
export class GithubClient implements GithubApi {
  private readonly authApi: OAuthApi;
  private readonly fetchApi: FetchApi;

  constructor(options: { authApi: OAuthApi; fetchApi: FetchApi }) {
    this.authApi = options.authApi;
    this.fetchApi = options.fetchApi;
  }

  private async get<T>(
    path: string,
    params: { [key in string]: any } = {},
  ): Promise<T> {
    const query = new URLSearchParams(params);
    const url = new URL(
      `${path}?${query.toString().replaceAll('%2B', '+')}`,
      'https://api.github.com/',
    );

    const token = await this.authApi.getAccessToken();

    const response = await this.fetchApi.fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return response.json() as Promise<T>;
  }

  public getUserPullRequest(
    params: SearchApiFetchRequest,
  ): Promise<SearchApiResponse> {
    return this.get<SearchApiResponse>(`search/issues`, params);
  }

  public getAuthenticatedUser(): Promise<UserProfile> {
    return this.get<UserProfile>('user', {});
  }

  public getAuthenticatedUserToken(): Promise<string> {
    return this.authApi.getAccessToken();
  }

  public getWorkflowRuns(
    params: WorkflowRunApiRequest,
  ): Promise<WorkflowRunApiResponse> {
    const { repoPath, ...queryParams } = params;
    return this.get<WorkflowRunApiResponse>(
      `repos/${repoPath}/actions/runs`,
      queryParams,
    );
  }

  public getWorkflowJobsByWorkflowId(
    params: WorkflowRunJobApiRequest,
  ): Promise<WorkflowRunJobApiResponse> {
    const { repoPath, run_id } = params;
    return this.get<WorkflowRunJobApiResponse>(
      `repos/${repoPath}/actions/runs/${run_id}/jobs`,
      {},
    );
  }

  public getAuthenticatedUserReposByType (params: UserRepositoryApiRequest): Promise<UserRepositoryApiResponse> {
    return this.get<UserRepositoryApiResponse>(
      `/user/repos`,
      params,
    );  
  }

}
