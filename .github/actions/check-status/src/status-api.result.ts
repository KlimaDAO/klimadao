// API reference: https://docs.github.com/en/rest/reference/commits#get-the-combined-status-for-a-specific-reference

export const STATUS_PENDING = "pending";
export const STATUS_FAILURE = "failure";
export const STATUS_SUCCESS = "success";

export interface StatusApiResult {
  status: number;
  url: string;
  headers: any;
  data: Data;
}

export interface Data {
  state: string;
  statuses: Status[] | any[];
  sha: string;
  total_count: number;
  repository: Repository;
  commit_url: string;
  url: string;
}

export interface Status {
  url: string;
  avatar_url: string;
  id: number;
  node_id: string;
  state: typeof STATUS_PENDING | typeof STATUS_FAILURE | typeof STATUS_SUCCESS;
  description: string;
  target_url: string;
  context: string;
  created_at: Date;
  updated_at: Date;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
}
