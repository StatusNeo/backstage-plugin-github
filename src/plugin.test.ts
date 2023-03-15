import { backstageGithubPlugin } from './plugin';

describe('backstage-plugin-github', () => {
  it('should export plugin', () => {
    expect(backstageGithubPlugin).toBeDefined();
  });
});
