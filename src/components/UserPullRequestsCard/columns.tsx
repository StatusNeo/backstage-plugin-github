import { Avatar, TableColumn } from '@backstage/core-components';
import { Box, Typography, Tooltip } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import React from 'react';
import { PullRequest } from '../../utils/types';
import { StatusClosed, StatusOpen } from './Icons';

export const titleColumn: TableColumn<PullRequest> = {
  id: 'pull_request_title',
  title: 'Title',
  field: 'title',
  align: 'left',
  sorting: false,
  render: (row: PullRequest) => (
    <Typography
      variant="body2"
      noWrap
      align="left"
      style={{
        width: 'inherit',
      }}
      title={row.title}
      key={`${row.id}_pull-req-title`}
    >
      <RequestStatus req={row as PullRequest} />
      <Box ml={1} component="span">
        <Link href={row.html_url} target="_blank">
          {row.title}
        </Link>
      </Box>
    </Typography>
  ),
};

export const authorColumn: TableColumn<PullRequest> = {
  id: 'pull_request_author',
  title: 'Author',
  align: 'center',
  sorting: false,
  render: (row: PullRequest) => (
    <Tooltip title={row.user?.login}>
      <Link href={row.user?.html_url} target="_blank">
        <Avatar
          customStyles={{
            height: 32,
            width: 32,
            margin: 'auto',
            border: '2px solid #e2e2e2'
          }}
          picture={row.user?.avatar_url || row.user?.gravatar_id}
          displayName={row.user?.login || ''}
        />
      </Link>
    </Tooltip>
  ),
};

export const repositoryColumn: TableColumn<PullRequest> = {
  id: 'pull_request_repo',
  title: 'Repository',
  align: 'left',
  sorting: false,
  render: (row: PullRequest) => (
    <Typography
    variant="body2"
    noWrap
    align="left"
    style={{
      width: 'inherit',
    }}
    component={Link}
    href={`https://www.github.com${row.repository_url.split('/repos')[1]}`}
    target="_blank"
    key={`${row.id}_pull-req-repo`}
  >
      {row.repository_url.split('/').reverse()[0]}
    </Typography>
  ),
};

function RequestStatus({ req }: { req: PullRequest }) {
  switch (req.state) {
    case 'open':
      return (
        <Tooltip title="Open">
          <span>
            <StatusOpen />
          </span>
        </Tooltip>
      );
    case 'closed':
      return (
        <Tooltip title="Closed">
          <span>
            <StatusClosed />
          </span>
        </Tooltip>
      );
    default:
      return null;
  }
}
