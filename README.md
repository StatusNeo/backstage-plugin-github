# GitHub Homepage Cards for Backstage Enterprise

This plugin is contributed by Statusneo. <br/>
<img src="https://raw.githubusercontent.com/StatusNeo/backstage-plugin-github/main/src/assets/statusneo.png"/> <br/>
To read more about this plugin please read this [blog](https://statusneo.com/23468-2).

# Setup
Before you can start using the GitHub cards, you must set up a GitHub provider.
You can follow this page which will guide you through the process of setting up the GitHub provider for your backstage instance.
[Setup GitHub Provider](https://backstage.io/docs/auth/github/provider/)

Now in the below steps, I will assume you are already done with the provider.
## Integration Steps
1. First Install the Github cards plugin by running this command from the root of the package.
```shell
yarn add –cwd packages/app @statusneo/backstage-github-plugin
```

2. Import GithubPullRequestsCard, and GithubActionsCard from the installed package
3. You can then use these components at the backstage frontend wherever you need.

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

Now you are ready to use this backstage GitHub plugin to make your software management and development cycle a little more hassle-free.