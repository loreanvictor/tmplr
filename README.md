![Logo](./logo-dark.svg#gh-dark-mode-only)
![Logo](./logo-light.svg#gh-light-mode-only)


Use `tmplr` to get a repository as a starter template for your next project. `tmplr` copies the repo (without git history, thanks to [`degit`](https://github.com/Rich-Harris/degit)), then asks a few questions and prepares local files (like `package.json`, `README`, etc.) for you.

<div align="center">

![Demo](./demo.gif)

</div>
  
```bash
npx tmplr owner/repo                  # 👉 get repo from github
npx tmplr gitlab:user/repo            # 🥽 or gitlab
npx tmplr git@bitbucket.org:user/repo # 🪣 or bitbucket
npx tmplr https://git.sr.ht/user/repo # 🛖 or source hut
```

<br/>

You can also just create a repository using a [github template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), and then use `tmplr` to fill in the blanks and get you started:

```bash
cd my-new-repo
npx tmplr
```

<br/>

# Table of Contents

- [How to Install](#how-to-install)
- [How to Use](#how-to-use)
- [How to Make a Template](#how-to-make-a-template)

<br/>

# How to Install

You don't need to install `tmplr`, since you can use it with [`npx`](https://www.npmjs.com/package/npx):

```bash
npx tmplr owner/repo
```

<br>

You can also install it globally for more convenience:

```bash
npm i -g tmplr
```
```bash
tmplr owner/repo
```

<br/>

# How to Use

If the repository is on github, simply pass `owner/repo` to `tmplr`. For example, if you want to [create a reusable React component using this template](https://github.com/vitrin-app/react-component-template), you can run the following:
```bash
npx tmplr vitrin-app/react-component-template
```

<br/>

It can also work with public repositories on other sources:

```bash
# 🥽 download from GitLab
tmplr gitlab:owner/repo
tmplr git@gitlab.com:owner/repo
tmplr https://gitlab.com/owner/repo

# 🪣 download from BitBucket
tmplr bitbucket:owner/repo
tmplr git@bitbucket.org:owner/repo
tmplr https://bitbucket.org/owner/repo

# 🛖 download from Sourcehut
tmplr git.sr.ht/owner/repo
tpmlr git@git.sr.ht:owner/repo
tpmlr https://git.sr.ht/owner/repo
```

<br/>

You can also specify a tag, branch, commit or subdirectory:

```bash
tmplr owner/repo#branch       # 👉 branch
tmplr owner/repo#tag          # 👉 release tag
tmplr owner/repo#c0m1th45h    # 👉 commit hash
tmplr owner/repo/subdirectory # 👉 sub directory
```

<br/>

# How to Make a Template

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
    from: git.remote_url
    fallback:
      steps:
        - read: git_provider
          prompt: 'Where do you host the repository?'
          choices:
            - GitHub:     'github.com'
            - Gitlab:     'gitlab.com'
            - BitBucket:  'bitbucket.org'
            - Source Hut:  'git.sr.ht'
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
