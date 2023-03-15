export type PullRequest = {
  id: string;
  html_url: string;
  title: string;
  state: 'open' | 'closed';
  body: string;
  repository_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  user: User;
};

export type User = {
  login: string;
  id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
};

export type SearchApiResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: PullRequest[];
};

export type SearchApiFetchRequest = {
  q: string;
  per_page?: number;
  page?: number;
};

export type UserProfile = User & {
  name: string;
  email: string;
  html_url?: string;
};

export type Repository = {
  id: string;
  name: string;
  full_name: string;
  owner: User;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type Status = 'completed' | 'action_required' | 'cancelled' | 'failure' | 'neutral' | 'skipped' | 'stale' | 'success' | 'timed_out' | 'in_progress' | 'queued' | 'requested' | 'waiting' | 'pending'

export type WorkflowRun = {
  id: string;
  name: string;
  display_title: string;
  event: string;
  status: Status;
  conclusion: string;
  workflow_id: string;
  repository: Repository;
  head_branch: string;
  html_url: string;
  created_at: string;
  updated_at: string;
};

export type WorkflowRunJob = {
  id: string;
  run_id: string;
  workflow_name: string;
  head_branch: string;
  html_url: string;
  status: Status
  conclusion: string;
  started_at: string;
  completed_at: string;
  name: string;
  steps: JobStep[];
};

export type JobStep = {
  name: string;
  status: Status;
  conclusion: string;
  number: number;
  started_at: string;
  completed_at: string;
};


export type WorkflowRunApiRequest = {
  repoPath: string;
  page: number;
  per_page: number;
}

export type WorkflowRunApiResponse = {
  total_count: number,
  workflow_runs: WorkflowRun[]
}

export type WorkflowRunJobApiRequest = {
  repoPath: string;
  run_id: string;
}

export type WorkflowRunJobApiResponse = {
  total_count: number;
  jobs: WorkflowRunJob[]
}

export type UserRepositoryApiRequest = {
  type: 'owner' | 'member' | 'public' | 'private';
}

export type UserRepositoryApiResponse = Repository[]