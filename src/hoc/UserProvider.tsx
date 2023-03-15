import React from 'react';
import { useAsync } from 'react-use';
import { useAuthUser } from '../hooks/useAuthUser';
import { useSignIn } from '../hooks/useSignIn';

type UserContextType = ReturnType<typeof useSignIn> & ReturnType<typeof useAuthUser>;

export const UserContext = React.createContext<UserContextType>({
  isSignedIn: false,
  isInitialized: false,
  signIn: async () => {},
  user: null
});

export function withUser(Component: React.FunctionComponent) {
  return function (props: any) {

    const { isSignedIn, isInitialized, signIn } = useSignIn();
    useAsync(async () => signIn(true), [signIn]);
    const { user } = useAuthUser(isSignedIn);

    return (
      <UserContext.Provider
        value={{
          isSignedIn,
          isInitialized,
          signIn,
          user
        }}
      >
        <Component {...props} />
      </UserContext.Provider>
    );
  };
}
