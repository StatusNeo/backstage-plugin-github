import {
  Table,
  TableColumn
} from '@backstage/core-components';
import { BackstageTheme } from '@backstage/theme';
import { MTablePagination, MTableHeader } from '@material-table/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { UserProfile } from '../../utils/types';
import { SignInContent } from '../SignInContent';

export type CustomTableProps<T extends object> = {
  title: string | JSX.Element;
  subtitle: string;
  columns: TableColumn<T>[];
  data: T[];
  isLoading: boolean;
  signIn: (instantPopup: boolean) => void;
  isSignedIn: boolean;
  isInitialized: boolean;
  isError: boolean;
  error?: any;
  user: UserProfile | null; // github user profile
  detailPanel?: ({ rowData }: { rowData: T }) => React.ReactNode;
  columnsButton?: boolean;
} & PaginationProps &
  SearchProps;

type PaginationProps =
  | {
      paging?: never;
      totalCount?: never;
      page?: never;
      setPage?: never;
      pageSize?: never;
      setPageSize?: never;
    }
  | {
      paging: boolean;
      totalCount: number;
      page: number;
      setPage: (newPage: number) => void;
      pageSize: number;
      setPageSize: (newPageSize: number) => void;
    };

type SearchProps =
  | {
      isSearchAvailable?: never;
      setSearchText?: never;
      searchPlaceholder?: never;
      searchTooltip?: never;
    }
  | {
      isSearchAvailable: boolean;
      setSearchText: (searchText: string) => void;
      searchPlaceholder?: string;
      searchTooltip?: string;
    };

CustomTable.defaultProps = {
  title: '',
  subtitle: '',
  columns: [],
  data: [],
  isLoading: false,
  paging: false,
  isSearchAvailable: false,
  totalCount: 0,
  searchPlaceholder: 'search',
  searchTooltip: 'search',
  pageSize: 0,
  page: 1,
  select: false,
  columnsButton: false
};

const StyledMTableHeader = withStyles(
  theme => ({
    header: {
      padding: theme.spacing(1, 2, 1, 2.5),
      borderTop: `1px solid ${theme.palette.grey.A100}`,
      borderBottom: `1px solid ${theme.palette.grey.A100}`,
      // withStyles hasn't a generic overload for theme
      color: (theme as BackstageTheme).palette.textSubtle,
      fontWeight: 'bold',
      position: 'static',
      wordBreak: 'normal',
    },
  }),
  { name: 'BackstageTableHeader' },
)(MTableHeader);

export function CustomTable<T extends object = {}>(props: CustomTableProps<T>) {
  return (
    <Table<T>
      title={props.title}
      subtitle={props.subtitle}
      columns={props.columns}
      isLoading={props.isLoading}
      options={{
        search: props.isSearchAvailable,
        paging: props.paging,
        padding: 'dense',
        toolbar: true,
        filtering: false,
        showFirstLastPageButtons: true,
        paginationType: 'stepped',
        loadingType: 'linear',
        emptyRowsWhenPaging: true,
        tableLayout: 'auto',
        debounceInterval: 350,
        sorting: false,
        columnsButton: props.columnsButton,
      }}
      localization={{
        toolbar: {
          searchPlaceholder: props.searchPlaceholder,
          searchTooltip: props.searchTooltip,
        },
      }}
      data={props.data}
      onSearchChange={(searchText: string) => {
        if (props.isSearchAvailable) {
          props.setSearchText(searchText);
        }
      }}
      emptyContent={
        <>
          {!props.isSignedIn && (
            <SignInContent handleAuthClick={() => props.signIn(false)} />
          )}
        </>
      }
      components={{
        Pagination: paginationProps => {
          const { classes, ...remainingProps } = paginationProps;
          return (
            <MTablePagination
              {...remainingProps}
              page={props.page}
              count={props.totalCount}
              // @ts-ignore
              onPageChange={(e: any, newPage: number) => {
                if (props.paging) {
                  props.setPage(newPage);
                }
              }}
            />
          );
        },
        Header: headerProps => <StyledMTableHeader {...headerProps} />,
      }}
      detailPanel={props.detailPanel}
    />
  );
}
