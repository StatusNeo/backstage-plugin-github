## GitHub Homepage Cards for Backstage Enterprise

<img src="https://raw.githubusercontent.com/StatusNeo/backstage-plugin-github/main/src/assets/statusneo.png"/> <br/>

To know more about the plugin, read this [blog](https://statusneo.com/23468-2).

### Setup

Before you can start using the GitHub cards, you must set up a GitHub provider.

You can follow this [documentation](https://backstage.io/docs/auth/github/provider/) which will guide you through the process of setting up the GitHub provider for your Backstage instance.

Now in the below steps, I will assume you are already done with the provider.

### Integration Steps

1. First Install the GitHub cards plugin by running this command from the root of the package.

```shell
yarn add –cwd packages/app @statusneo/backstage-plugin-github
```
2. add this to the app/src/apis.ts

```javascript
  import { githubApiRef, GithubClient as StatusNeoGithubClient } from '@statusneo/backstage-plugin-github';
  
  // ...
  createApiFactory({
    api: githubApiRef,
    deps: { authApi: githubAuthApiRef, fetchApi: fetchApiRef, configApi: configApiRef },
    factory(deps) {
      return new StatusNeoGithubClient(deps);
    },
  }),
  // ...
```

3. Import `GithubPullRequestsCard`, and `GithubActionsCard` from the installed package.

4. You can then use these components at the backstage frontend wherever you need.

```javascript
import { GithubPullRequestsCard, GithubActionsCard } from '@statusneo/backstage-plugin-github';

// ...
              <Grid item xs={12} md={6}>
                <GithubActionsCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <GithubPullRequestsCard />
              </Grid>
// ...
```

5. If you are using a GitHub enterprise edition, you can pass your instance url through app-config.yml

```yaml

gh-plugin:
  url: ${GITHUB_ENTERPRISE_URL}

```

Now you are ready to use this Backstage GitHub plugin to make your software management and development cycle a little more hassle-free.
