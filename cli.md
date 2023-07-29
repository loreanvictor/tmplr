# CLI Options

- [Copy a Repository](#copy-a-repository)
- [Run Local Recipe](#run-local-recipe)
- [Run a Reusable Recipe](#run-a-reusable-recipe)
- [Testing Recipes](#testing-recipes)
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


## Run Local Recipe

```bash
tmplr
```

If you already have the recipe file in current directory, you can run it with `tmplr` command without any arguments. This will parse and execute `.tmplr.yml` file in current directory. You can specify a working directory with `-d` or `--dir` option:

```bash
tmplr -d my-project
```

Which will run `.tmplr.yml` file located inside `my-project` directory, in the same project.

<br>

## Run a Reusable Recipe

```bash
tmplr use owner/repo
```

Copies content of given repository to a temporary directory, runs its recipe, and then removes the directory. Reusable recipes
can be used to alter an existing project in specific ways. For example, you can use [this recipe](https://github.com/loreanvictor/license-recipe) to add a license file to your project:

```bash
tmplr use loreanvictor/license-recipe
```

> 💡 `use` command accepts all the [same arguments as for copying a repo](#copy-a-repository):
>
> ```bash
> tmplr use owner/repo#branch
> tmplr use gitlab:owner/repo
> tmplr use owner/repo -d my-project
> tmplr use local:some/recipe
> ...
> ```

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

<br>

If you are working on a reusable recipe, you can preview the result of running it (without any arguments)
using `preview:use` command:

```bash
tmplr preview:use
```

This will treat contents of working directory as a reusable recipe, running it inside `.tmplr-preview` directory. To be more specific: this command will copy the contents of working directory into a temporary subdirectory of `.tmplr-preview`, run `.tmplr.yml`, and then remove the temporary subdirectory, emulating what happens when someone uses your recipe either via [`use` command in a recipe](https://github.com/loreanvictor/tmplr#use) or [via the CLI](#running-reusable-recipe).

<br>

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
