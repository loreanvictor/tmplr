# CLI Options

- [Copy a Repository](#copy-a-repository)
- [Run local recipe](#run-local-recipe)
- [Testing recipes](#testing-recipes)
- [Miscellaneous](#miscellaneous)

<br/>

## Copy a Repository

```bash
tmplr owner/repo
```

Copies content of given repository on GitHub to current directory, and runs its recipe, if exists (checks for `.tmplr.yml` file). This basically clones https://github.com/owner/repo.git. You can also specify repositories from [GitLab](https://about.gitlab.com), [BitBucket](https://bitbucket.org) or [SourceHut](https://sourcehut.org):

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

You can specify a tag, branch, commit or subdirectory:

```bash
tmplr owner/repo#branch       # 👉 branch
tmplr owner/repo#tag          # 👉 release tag
tmplr owner/repo#c0m1th45h    # 👉 commit hash
tmplr owner/repo/subdirectory # 👉 sub directory
```

<br>

### Working directory

Use `-d` or `--dir` option to specify a working directory. **`tmplr`** will copy the repository to the given directory (creating all necessary directories) and runs the recipe from there:

```bash
tmplr owner/repo -d my-project
```

<br>


## Run local recipe

```bash
tmplr
```

If you already have the recipe file in current directory, you can run it with `tmplr` command without any arguments. This will parse and execute `.tmplr.yml` file in current directory. You can specify a working directory with `-d` or `--dir` option:

```bash
tmplr -d my-project
```

Which will run `.tmplr.yml` file located inside `my-project` directory, in the same project.

<br>

## Testing recipes

```bash
tmplr preview
```

Will copy the contents of current directory into `.tmplr-preview/<dir>` and runs the recipe file (`<dir>` is the name of current directory). This is useful for testing recipes before publishing them. You can specify a working directory with `-d` or `--dir` option:

```bash
tmplr preview -d my-project
```

Which will copy the contents of `my-project` directory into `my-project/.tmplr-preview/my-project` and runs the recipe file.

You can cleanup testing artifacts using `tmplr clean` command:

```bash
tmplr clean
```
```bash
tmplr clean -d my-project
```

<br>

## Miscellaneous

### Version & Updates

```bash
tmplr version
```
```bash
tmplr -v
```

Displays current version of **`tmplr`**, and checks the latest version to see if an update is necessary. If you have **`tmplr`** installed locally, you can update it with:

```bash
npm i -g tmplr@latest
```

If you use it via `npx`, you can ensure the latest version is run via:

```bash
npx tmplr@latest
```

<br>

### Help

```bash
tmplr help
```
```bash
tmplr -h
```

Displays help message.

<br>
