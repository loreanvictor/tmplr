![Logo](./logo-dark.svg#gh-dark-mode-only)
![Logo](./logo-light.svg#gh-light-mode-only)


Use `tmplr` to get a repository as a starter template for your next project. `tmplr` copies the repo (without git history, thanks to [`degit`](https://github.com/Rich-Harris/degit)), then asks a few questions to fill up the template for your customized needs.

```bash
npx tmplr owner/repo                  # 👉 get repo from github
npx tmplr gitlab:user/repo            # 👉 or gitlab
npx tmplr git@bitbucket.org:user/repo # 👉 or bitbucket
npx tmplr https://git.sr.ht/user/repo # 👉 or source hut
```

<br/>

You can also just create a repository using a [github template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), and then use `tmplr` to fill in the blanks and get you started:

```bash
cd my-new-repo
npx tmplr
```

<br/>

## For Repository Owners

You can easily configure `tmplr` to make it easier to use your repo as a template. Just use `{{ tmplr.variable }}` in places where an end-user
variable should be used:

```json
// package.json
{
  "name": "{{ tmplr.project_name }}",
  "description": "{{ tmplr.project_description }}",
  "repository": {
    "type": "git",
    "url": "{{ tmplr.git_url }}"
  },
  ...
}
```
<br/>

Then add `.tmplr.yml` to the root of your repo, configuring how to fill up specified variables:

```yaml
# .tmplr.yml

steps:
  - read: project_name
    from: git.repository
    fallback:
      prompt: 'What is your project name?'
      default:
        from: path.folder_name

  - read: project_description
    prompt: 'Describe your project ...'
    default: 'The greatest project in the history'

  - read: git_url
    from: git.push_url
    fallback:
      steps:
        - read: git_provider
          prompt: 'Where do you host the repository?'
          choices:
            - 'github.com':     GitHub
            - 'gitlab.com':     GitLab
            - 'bitbucket.org':  BitBucket
            - 'git.sr.ht': Source Hut
        - read: git_owner
          prompt: 'What is your git username?'
        - read: git_repo
          prompt: 'What is the repository name?'
          default:
            from: project_name
      eval: 'https://{{ git_provider }}/{{ git_owner }}/{{ git_repo }}'

  - update: ./package.json
  - remove: ./LICENSE
  - copy: ./.template/README.md
    to ./README.md
```
