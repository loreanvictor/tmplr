![Logo](./logo-dark.svg#gh-dark-mode-only)
![Logo](./logo-light.svg#gh-light-mode-only)

[![version](https://img.shields.io/npm/v/tmplr?logo=npm)](https://www.npmjs.com/package/tmplr)

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
  - [GitHub Templates](#github-templates)
- [How to Make a Template](#how-to-make-a-template)
  - [Template Recipes](#template-recipes)
  - [GitHub Workflows](#github-workflows)
  - [Contextual Values](#contextual-values)
  - [Recipe Syntax](#recipe-syntax)

<br/>

# How to Install

You need to have [Node.js and NPM installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
You don't need to install `tmplr` itself, since you can use it with [`npx`](https://www.npmjs.com/package/npx):

```bash
npx tmplr owner/repo
```

<br>

However, you _can_ install it globally for more convenience:

```bash
npm i -g tmplr
```
```bash
tmplr owner/repo    # 3 less characters per project 🍺
```

<br/>

# How to Use

If the repository is on github, simply pass `owner/repo` to `tmplr`. For example, if you want to [create a reusable React component using this template](https://github.com/vitrin-app/react-component-template), you can run the following:
```bash
npx tmplr vitrin-app/react-component-template
```

<br/>

Also works with public repositories on other sources:

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

## GitHub Templates

On GitHub, users [can create template repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository), allowing others to [use their templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template). While convenient, GitHub's templating still does not modify the content of the original template repository according to your specific
information: for example you would definitely need to update the README and replace the name of the project.

`tmplr` can enhance that process. If you want to create a project from a template repository which also specifies a _`tmplr` templating recipe_ (basically, a `.tmplr.yml` file at the root of the project), simply create the project on GitHub, clone it, cd to it and run the following:

```bash
npx tmplr
```

<br>

> When executed without a parameter, `tmplr` will try to locate `.tmplr.yml` recipe file in current folder and run the recipe.

<br><br>

# How to Make a Template

Any repository is by default a _template repository_ for `tmplr`, as it can copy its content without the history. However, `tmplr` also allows you to do advanced templating, such as removing files, replacing files or updating them with variables dependent on the user's environment (for example, the name of their repository), or variables whose values are directly asked from users.

To do this, you need to provide a templating recipe. A templating recipe must be a [YAML file](https://en.wikipedia.org/wiki/YAML) named `.tmplr.yml`, located at the root of your repository. When running the following:

```bash
npx tmplr your/repo
```

`tmplr` will copy the contents of your repo and then execute the recpie. Alternatively, if someone receives the content of your template repository via other means (for example, using GitHub templates), they can simply execute the recipe by running the following:

```bash
npx tmplr
```

<br>

## Template Recipes

A template recipe can be a single command or a list of commands, instructing `tmplr` to _read_ some values and then modify some files with those values. They can be a single command:

```yaml
# .tmplr.yml
remove: LICENSE
```

Or a series of steps:

```yaml
# .tmplr.yml
steps:
  - read: project_name
    from: git.remote_name
    fallback:
      from: path.rootdir
  
  - read: clone_url
    from: git.remote_url
  
  - update: README.md
```

Where `README.md` can be something like this:

````md
# {{ tmplr.project_name }}

This is my super awesome project. You can clone it using the following command:
```bash
git clone {{ tmplr.clone_url }}
```
````

<br>

After you read a variable such as `some_var`, in any file you update or copy, `{{ tmplr.some_var }}` will be replaced with the value read. If a variable is not resolved or read, then `tmplr` will leave it untouched. The comprehensive list of all available commands can be found in [this section](#recipe-syntax), and a list of available contextual values (e.g. `git.remote_url` or `path.rootdir`) can be found in [this section](#contextual-values). If you prefer learning by example, you can [check this example template repository](https://github.com/loreanvictor/tmplr-template-example).

<br>

## GitHub Workflows

If values you need for templating can all be found in [GitHub Action contexts](https://docs.github.com/en/actions/learn-github-actions/contexts), then you can also just [create a GitHub template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository), and then add a workflow to run `tmplr` to apply your templating recipe. You can find an example of this [in the example template](https://github.com/loreanvictor/tmplr-template-example).

```yaml
# .github/workflows/init.yml
name: Initialize Template

#
# Run this on creation of a branch or ref
#
on:
  push:
    branches: main

jobs:
  build:
    #
    # Change this to make sure your workflow doesn't initialize on your template!
    #
    if: github.repository != '<your-user-name>/<template-repo-name>'

    runs-on: ubuntu-latest
    steps:
      #
      # Checkout the code
      #
      - uses: actions/checkout@v2
      
      #
      # Check if there is a template recipe
      #
      - id: template_exists
        name: Check template
        uses: andstor/file-existence-action@v1
        with:
          files: .tmplr.yml
      
      #
      # Run tmplr with required environment variables,
      # and remove the template recipe afterwards.
      #
      # Use this to get all the values you want from GitHub Action contexts
      # and set them as environment variables for tmplr.
      #
      - name: Apply template
        if: steps.template_exists.outputs.files_exists == 'true'
        run: npx tmplr && rm -fr .tmplr.yml && rm -fr .github/workflows/init.yml
        env:
          owner_name: ${{ github.event.repository.owner.name }}
          owner_email: ${{ github.event.repository.owner.email }}
          repo_name: ${{ github.event.repository.name }}
          repo_url: ${{ github.event.repository.ssh_url }}

      #
      # Commit the code
      #
      - uses: EndBug/add-and-commit@v9
        with:
          message: Initialize from template
```

<br>

## Contextual Values

Recipes might have access to following contextual values, depending on the conditions (for example, if the repository is executed outside of a git repository, then `git.*` values are not available).

### Git Context

- `git.remote_url`: The origin URL of current git repository (this can be cloned, for example)
- `git.remote_name`: The name of the origin (e.g. repository name)
- `git.remote_provider`: The address of the git host (e.g. `https://github.com`)
- `git.remote_owner`: The name of the user on the remote who owns the repository
- `git.author_name`: The name of the person who made the first commit on the repo
- `git.author_email`: Email address of the first committer.

### Path Context

- `path.rootdir`: The name of the root directory
- `path.rootempty`: This is an empty string if root directory is not empty, and `yes` if it is. `.git` and `.tmplr.yml` are ignored.

### Env Context

You can use `env.some_var` to access some environment variable. If it is not defined, an empty string will be returned.

### Temporary Directories

You can access `tmpdir.some_name` to automatically create temporary directories.

```yml
steps:
  #
  # some initial steps 
  #
  
  - copy: some_file.go
    to:
      eval: '{{ tmpdir.go_file }}/some_file.go'
      
  #
  # some other steps
  #
  
  - copy:
      eval: '{{ tmpdir.go_file }}/some_file.go'
    to: some_other_file.go
```

Temporary directories will be deleted after the recipe has finished executing.

<br>

## Recipe Syntax

==TO BE COMPLETED==

<br><br><br>
