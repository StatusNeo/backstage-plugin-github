import { TableColumn } from '@backstage/core-components';
import React, { useEffect, useMemo, useState } from 'react';
import { useUserPullRequests } from '../../hooks/useUserPullRequests';
import { authorColumn, repositoryColumn, titleColumn } from './columns';
import { PullRequest } from '../../utils/types';
import { CustomTable } from '../CustomTable';
import { withQueryClient } from '../../hoc/withQueryClient';
import { UserContext, withUser } from '../../hoc/UserProvider';


const UserPullRequests = () => {
  const columns:TableColumn<PullRequest>[] = useMemo(()=>[titleColumn, repositoryColumn, authorColumn], [])
  const [searchText, setSearchText] = useState<string>("")

  const { isSignedIn, isInitialized, signIn, user } = React.useContext(UserContext);

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, isLoading, isError, error, refetch } = useUserPullRequests(
    isSignedIn && !!user,
    {
      q: `type:pr+involves:${user?.login}+${searchText} in:title,body,comments`,
      page: page+1,
      per_page: pageSize,
    },
  );

    useEffect(()=>{
    refetch()
  }, [user, refetch])

  return (
    <CustomTable<PullRequest>
      title='Pull Requests'
      subtitle={user?.login}
      columns={columns}
      user={user}
      data={data?.items}
      signIn={signIn}
      isSignedIn={isSignedIn}
      isInitialized={isInitialized}
      isLoading={isSignedIn && isLoading}
      isError={isError}
      error={error}
      paging
      page={page}
      pageSize={pageSize}
      totalCount={data?.total_count}
      setPage={setPage}
      setPageSize={setPageSize}
      isSearchAvailable
      setSearchText={setSearchText}
      searchPlaceholder='search'
      searchTooltip='search in title, body and comments'
      columnsButton
    />
  );
};



export const UserPullRequestsCard = withQueryClient(withUser(UserPullRequests));