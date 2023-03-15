import React from 'react';
import { TableColumn  } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import { WorkflowRun } from '../../utils/types';

export const workflow_title: TableColumn<WorkflowRun> = {
  id: 'workflow_run_title',
  title: 'Title',
  field: 'display_title',
  align: 'left',
  sorting: false,
  hiddenByColumnsButton: false,
  render: (row: WorkflowRun) => (
    <Typography
      variant="body2"
      noWrap
      align="left"
      style={{
        width: 'inherit',
      }}
      title={row.display_title}
    >
        {row.display_title}
    </Typography>
  )
};

export const workflow_status: TableColumn<WorkflowRun> = {
  id: 'workflow_status',
  title: 'Status',
  field: 'status',
  align: 'left',
  sorting: false,
  hiddenByColumnsButton: false,
};

export const workflow_branch: TableColumn<WorkflowRun> = {
  id: 'workflow_branch',
  title: 'Branch',
  field: 'head_branch',
  align: 'left',
  sorting: false,
  hiddenByColumnsButton: false,
};
