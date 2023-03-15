import { CustomTable } from '../CustomTable';
import React, { useEffect, useMemo, useState } from 'react';
import { workflow_branch, workflow_status, workflow_title } from './columns';
import { WorkflowRun } from '../../utils/types';
import { Select, TableColumn } from '@backstage/core-components';
import { useWorkflowRuns } from '../../hooks/useWorkflowRuns';
import { useUserRepos } from '../../hooks/useUserRepos';
import { ActionDetailPanel } from './ActionDetailPanel';
import { makeStyles } from '@material-ui/core';
import { withQueryClient } from '../../hoc/withQueryClient';
import { UserContext, withUser } from '../../hoc/UserProvider';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
  },

  selectContainer: {
    zIndex: 100,
    position: 'absolute',
    right: 48,
    top: 4,
  },
}));

function GithubActions() {
  const columns: TableColumn<WorkflowRun>[] = useMemo(
    () => [workflow_title, workflow_branch, workflow_status],
    [],
  );

  const styles = useStyles();

  const { isSignedIn, isInitialized, signIn, user } =
    React.useContext(UserContext);

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  // get user repo where user is either owner/member.
  const repos = useUserRepos();
  const [selectedItem, setSelectedItem] = useState<string>('');

  const selectItems = useMemo(() => {
    return [
      ...repos.map(repo => ({
        label: repo.full_name,
        value: repo.full_name,
      })),
    ];
  }, [repos]);

  useEffect(() => {
    if (selectItems && selectItems.length >= 1) {
      setSelectedItem(selectItems[0].value);
    }
  }, [selectItems]);

  const { data, isLoading, isError, error } = useWorkflowRuns({
    repoPath: selectedItem,
    page: page + 1,
    per_page: pageSize,
  });

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <Select
          label=""
          placeholder="Select Repository"
          items={selectItems}
          onChange={newSelectedItem => {
            if (typeof newSelectedItem === 'string') {
              setSelectedItem(newSelectedItem);
            }
          }}
          selected={selectedItem}
        />
      </div>
      <CustomTable<WorkflowRun>
        title="Github Actions"
        subtitle={user?.login}
        columns={columns}
        user={user}
        data={data?.workflow_runs || []}
        signIn={signIn}
        isSignedIn={!!user}
        isInitialized={isInitialized}
        isLoading={!!selectedItem && isSignedIn && isLoading}
        isError={isError}
        error={error}
        paging
        page={page}
        pageSize={pageSize}
        totalCount={data?.total_count || 0}
        setPage={setPage}
        setPageSize={setPageSize}
        columnsButton
        detailPanel={({ rowData }) => <ActionDetailPanel rowData={rowData} />}
      />
    </div>
  );
}

export const GithubActionsCard = withQueryClient(withUser(GithubActions));
