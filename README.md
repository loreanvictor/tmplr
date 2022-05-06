![Logo](./logo-dark.svg#gh-dark-mode-only)
![Logo](./logo-light.svg#gh-light-mode-only)


With `tmplr`, you can use git repositories as templates for quickly starting a new project. `tmplr` clones the given repo (using [`degit`](https://github.com/Rich-Harris/degit)), and then runs some secure init scripts based on specification by the repo to get you started.

```yml
# .tmplr.yml
steps:
  setup:
    - read: username
      source: git.username
      fallback:
        prompt: What is your github username?
    - read: repo
      source: git.repo
      fallback:
        prompt: What is the repository name?
    - update: ./package.json
    - remove: ./LICENSE
    - copy: ./.template/README.md
      to ./README.md
```
