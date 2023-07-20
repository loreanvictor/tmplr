<div align="right">

[![version](https://img.shields.io/npm/v/tmplr?label=&color=black&style=flat-square)](https://www.npmjs.com/package/tmplr)

</div>

<!--
![Logo](./logo-dark.svg#gh-dark-mode-only)
![Logo](./logo-light.svg#gh-light-mode-only)

<br/>
-->

```
       ┓
 ╋┏┳┓┏┓┃┏┓  repo
 ┗┛┗┗┣┛┗┛   templating 🚀
     ┛
```

Downloads a public repository, and interactively fills it up with contextual info, by safely running the repo's _templating recipe_. Altneratively, can run local recipe files for modifying existing projects.

The main use of `tmplr` is to create new projects from templates. It can also be used to add new modules / packages to existing projects.

<div align="center">

![Demo](./demo.svg)

</div>
  
```bash
npx tmplr owner/repo                  # 👉 get repo from github
npx tmplr gitlab:user/repo            # 🥽 or gitlab
npx tmplr git@bitbucket.org:user/repo # 🪣 or bitbucket
npx tmplr https://git.sr.ht/user/repo # 🛖 or source hut
```

<br/>

Interactive recipes set `tmplr` apart from other scaffolding tools (such as [degit](https://github.com/Rich-Harris/degit), which `tmplr` actually uses under the hood, and [cookiecutter](https://github.com/cookiecutter/cookiecutter)). 
- ☕ They can do simple tasks like removing a license file or updating the README based on local git info.
- 🏗 They can do more complex tasks such as adding new packages based on chosen presets to a monorepo.
- 🔐 They can do all of that while remaining safe to run on your machine.
- 🌱 They are also pretty easy to write for such purposes, as opposed to bash / python / js scripts.

<br/>

# Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Running Recipes](#running-recipes)
  - [Working Directory](#working-directory)
  - [Execution Safety](#execution-safety)
- [Making a Template](#making-a-template)
  - [Template Recipes](#template-recipes)
  - [Contextual Values](#contextual-values)
  - [Recipe Syntax](#recipe-syntax)
    - [Commands](#commands)
    - [Expressions](#expressions)
    - [Pipes](#pipes)

<br/>

# Installation

You need [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
You don't need to install `tmplr` itself, as you can run it with [`npx`](https://www.npmjs.com/package/npx):

```bash
npx tmplr owner/repo
```

<br/>

You _can_ install `tmplr` globally for more convenience:

```bash
npm i -g tmplr
```
```bash
tmplr owner/repo    # 3 less characters per project 🍺
```

<br>

👉 To install/run the latest version, use the `@latest` tag:
```bash
npx tmplr@latest owner/repo
```
```bash
npm i -g tmplr@latest
```
Use `version` command to check for updates:
```bash
npx tmplr version
```

<br/>

# Usage

Get public repositories from [GitHub](https://github.com):

```bash
npx tmplr owner/repo
```

For example, if you want to create a reusable React component, you can use [this template](https://github.com/vitrin-app/react-component-template) like this:

```bash
npx tmplr vitrin-app/react-component-template
```

<br/>

Get public repositories from [GitLab](https://about.gitlab.com), [BitBucket](https://bitbucket.org) or [SourceHut](https://sourcehut.org):

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

Get a tag, branch, commit or subdirectory:

```bash
tmplr owner/repo#branch       # 👉 branch
tmplr owner/repo#tag          # 👉 release tag
tmplr owner/repo#c0m1th45h    # 👉 commit hash
tmplr owner/repo/subdirectory # 👉 sub directory
```

<br/>

> 📖 Read more about command line options [here](cli.md).

<br/>

## Running Recipes

Sometimes, you already have the repository locally and only need to run its recipe (for example its a [GitHub template repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), or you want to [add a package / submodule to a monorepo](https://github.com/loreanvictor/tmplr/blob/main/examples/monorepo.md)). To do this, go to the folder where the recipe is, and run `tmplr` without arguments:

```bash
npx tmplr
```

<br/>

> 💡 To check whether a recipe exists, look for a `.tmplr.yml` file.

<br/>

## Working Directory

By default, `tmplr` runs in the current directory. Change this working directory by specifying a `--dir` (or `-d`) option:

```bash
# 👉 will clone owner/some-repo into my-new-project
tmplr --dir my-new-project owner/some-repo
```
```bash
# 👉 will run the recipe some-project/.tmplr.yml
tmplr -d some-project
```

<br/>

## Execution Safety

Running scripts from unverified sources (such as an arbitrary public repository) on your machine is dangerous. `tmplr` limits its recipes so that they can't harm the host they are running on, while remaining powerful enough for any scaffolding task.

- The scope of recipes is limited to the working directory:
  - Recipes can read, write, and remove files in their scope.
  - Recipes can clone public repositories, from trusted sources (GitHub, GitLab, BitBucket & SourceHut), to their scope.
- Recipes can read some contextual values.
- Recipes can read environment variables.

<br/><br/>

# Making a Template

Every public repository is a template for `tmplr`. If you have such a template, you can enhance user experience by adding a recipe to interactively customise the result for end user's needs. To do this, add a [YAML file](https://en.wikipedia.org/wiki/YAML) named `.tmplr.yml`, located at the root of your repository. When running the following:

```bash
npx tmplr your/repo
```

`tmplr` will copy the contents of your repo and then execute the recpie. Alternatively, if someone already has your repo locally, they can run the recipe like this:

```bash
npx tmplr
```

To test how your repository would act as a template, use the `preview` command:

```bash
npx tmplr preview
```

> 📖 [Read this](cli.md#testing-recipes) to learn more about previewing templates.

<br/>

## Template Recipes

A recipe instructs `tmplr` on how to update project files with contextual values such as local git information or directory name. It can be a single command:

```yaml
# .tmplr.yml
remove: LICENSE
```

Or multiple steps:

```yaml
# .tmplr.yml
steps:
  - read: project_name
    from: git.remote_name
    fallback:
      from: filesystem.rootdir
  
  - read: clone_url
    from: git.remote_url
  
  - update: README.md
```

👆 When you _read_ a variable, it will be replaced in all the files copied / updated by the recipe. If `README.md` looks something like this:

````md
# {{ tmplr.project_name }}

This is my super awesome project. You can clone it using the following command:
```bash
git clone {{ tmplr.clone_url }}
```
````

<br>

And someone runs this recipe on their project, `https://github.com/john/my-project`, then `README.md` will become this:

````md
# my-project

This is my super awesome project. You can clone it using the following command:
```bash
git clone https://github.com/john/my-project
```
````

<br>

> 💡 **TEMPLATE VARIABLES**
>
> After you read a variable such as `project_name`, in any file you update or copy, `{{ tmplr.project_name }}` will be replaced with the value read. If a variable is not resolved, then `tmplr` will leave it untouched.

<br>

In the example above, [`steps`](#steps), [`read`](#read) and [`update`](#update) are different [commands](#commands) the recipe executed, [`from`](#from) is an [expression](#expressions), which reads from [_contextual values_](#contextual-values) such as [`git.remote_url`](#git-context) or [`filesystem.rootdir`](#filesystem-context).

👉 Available commands and expressions can be found [here](#recipe-syntax). \
👉 Available contextual values can be found [here](#contextual-values). \
👉 If you (like me) prefer learning by example, you can [check this example template repository](https://github.com/loreanvictor/tmplr-template-example), or checkout these examples from [`/examples`](./examples) folder:


- [Create GitHub template and run a recipe when someone uses your template](https://github.com/loreanvictor/tmplr/blob/main/examples/github-actions.md)
- [Conveniently add new packages to monorepos using local templates](https://github.com/loreanvictor/tmplr/blob/main/examples/monorepo.md)


<br/>

## Contextual Values

Recipes can access following contexts:

- [Git Context](#git-context)
- [Filesystem Context](#filesystem-context)
- [Environment Variables](#environment-variables)
- [Temporary Directories](#temporary-directories)
- [Recipe Arguments](#recipe-arguments)

<br/>

### Git Context

- `git.remote_url`: The origin URL of current git repository (this can be cloned, for example)
- `git.remote_name`: The name of the origin (e.g. repository name)
- `git.remote_provider`: The address of the git host (e.g. `https://github.com`)
- `git.remote_owner`: The name of the user on the remote who owns the repository
- `git.author_name`: The name of the person who made the first commit on the repo
- `git.author_email`: Email address of the first committer.

<br>

> ⚠️  **CAUTION** ⚠️ 
> 
> If the recipe is run outside of a repository (where there is no `.git`), then git contextual values won't be available. It is recommended to read them into a variable them using [`from` expression](#from) first, and providing a fallback for that expression to handle such cases.

<br/>

### Filesystem Context

- `filesystem.root`: Absolute address of the root directory (which the recipe is being executed in)
- `filesystem.rootdir`: The name of the root directory
- `filesystem.scope`: Absolute address of the scope of this recipe.
- `filesystem.scopedir`: The name of the scope directory.

The root directory, `filesystem.root`, is where the recipe file is located. This is also the addrerss which all
relative addresses in the recipe are interpreted relative to. The scope of the recipe, `filesystem.scope`, is where the recipe can access (read/write). The scope can differn from the root when a recipe is called by another recipe (via [run](#run) or [use](#use) commands). The called recipe has the same
scope to the caller recipe, though their roots might differ.

<br/>

### Environment Variables

Use `env.some_var` to access some environment variable. If it is not defined, an empty string will be returned.

<br/>

### Temporary Directories

Use `tmpdir.some_name` to automatically create temporary directories.

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

<br/>

### Recipe Arguments

Recipes can also [run](#run) other local recipes or [use](#use) publicly published recipes. The caller recipe can pass arguments
to the called recipe, which will be available on `args` context.

```yml
# called.yml
steps:
  - read: remote_url
    from: git.remote_url
    
  - update:
      path: '{{ args.readme }}'
```
```yml
# .tmplr.yml
steps:
  - run: ./called.yml
    with:
      - readme:
          path: ./README.md
```

<br/>

> 👉 Recipe arguments are evaluated lazily. If a prompt is passed as an argument, the user will be prompted the first time the argument is accessed, not when the recipe is called.

<br/>

## Recipe Syntax

Recipes are composed of [_commands_](#commands) and [_expressions_](#expressions). _Commands_ instruct actions (i.e. read a value, update a file, etc), and _expressions_ calculate string values, to be used by commands. A recipe descirbes a single command, which can itself be composed of multiple other
steps:

<br/>

```yaml
# .tmplr.yml
remove: LICENSE
```
☝️ Here the recipe is a single _remove_ command.

<br/>

```yaml
# .tmplr.yml
steps:
  - read: project_name
    from: git.remote_name
    fallback:
      prompt: What is the name of the project?
      default:
        from: filesystem.rootdir
  
  - update: README.md
```

☝️ Here the recipe is a single _steps_ command, which is composed of multiple steps (commands). Take a closer look at the initial _read_ command:

```yml
  - read: project_name
    from: git.remote_name
    fallback:
      prompt: What is the name of the project?
      default:
        from: filesystem.rootdir
```

This command [read](#read)s a variable, `project_name`, [_from_](#from) a contextual value. From this point on, you can use this variable in other expressions, pass it to other recipes you call, and when you [copy](#copy) or [update](#update) a file, `{{ tmplr.project_name }}` will be replaced with the variable's value. If the contextual value can't be resolved, it will fallback to a [_prompt_](#prompt), asking the user for the value, suggesting the name of the current directory as the default value.

Here you can see the corresponding syntax tree of this example recipe:
```
Steps Command
  ┃
  ┣━━ Read Command
  ┃     ┃	
  ┃     ┗━━ From Expression
  ┃          ┃	
  ┃          ┗━(fallback)━ Prompt Expression
  ┃               ┃	
  ┃               ┗━(default)━ From Expression
  ┃
  ┗━ Update Command
       ┃
       ┗━ Value Expression
```

The string passed to the [update](#update) command, `README.md`, is also an expression. We can similarly replace the _default_ of the prompt from a _From Expression_ to a simple string:

```yml
  - read: project_name
    from: git.remote_name
    fallback:
      prompt: What is the name of the project?
      default: My Awesome Project
```

<br/>

### Commands

- [**read**](#read): reads a value into a variable, so that the variable can be used to update subsequent files.
- [**update**](#update): updates contents of some files, using variables read.
- [**copy**](#copy): copies some files, also updating them using variables read.
- [**remove**](#remove): removes some files.
- [**steps**](#steps): runs a bunch of commands in a step by step manner.
- [**if**](#if): runs a command conditionally.
- [**degit**](#degit): copies content of given repository to given folder.
- [**exit**](#exit): ends the recipe early.
- [**run**](#run): runs another local recipe file, with given arguments.
- [**use**](#use): runs a remote recipe file, with given arugments.

<br/>

#### Read

> _Command_
> 
> ```yml
> read: <variable name>
> <expression>
> ```

Reads some value into a variable. The variable can then be used in subsequent expressions or passed as an argument to other called recipes. It will also be replaced in all files that are [updated](#update) or [copied](#copy).

```yml
steps:
  - read: project_name
    from: filesystem.rootdir
```

☝️ After executing this command, if you [update](#update) or [copy](#copy) any file that contains `{{ tmplr.project_name }}`, the value of the variable will be replaced.

<br/>

#### Update
> _Command_
> ```yml
> update:
>   <expression>
> include hidden?: <boolean>
> ```

Updates a file, using variables that are already [`read`](#read).

```yml
steps:
  - read: name
    prompt: What is your name?
  
  - update: README.md
```
```yml
steps:
  - read: docs_folder
    prompt: Where do you keep the docs?
    choices:
      - docs
      - documents
      - other:
          prompt: Specify the folder name ...
  - update:
      path: '{{ docs_folder }}/Home.md'
```

👉 Pass an [extended glob pattern](https://www.npmjs.com/package/minimatch) to update multiple files at once:
```yml
update: 'src/**/*.java'
```

When using a glob pattern, hidden files (starting with a dot, e.g. `.gitignore`) and files in hidden folders (e.g. `.github/workflows/publish.yml`) are ignored. Update hidden files by explicitly mentioning them:
```yml
- update: '**/.*.java'
- update: '**/.**/**/*.java'
```
Or by using the `include hidden` option:
```yml
update: '**/*'
include hidden: true
```

<br/>

#### Copy
> _Command_
> ```yml
> copy:
>   <expression>
> to:
>   <expression>
> include hidden?: <boolean>
>```

Copies a file, creating necessary folders, replacing existing files. Will also [update](#update) the copied file, replacing all [read](#read) variables with their values.

```yml
steps:
  - read: email
    from: git.author_email
  
  - copy: .template/CODE_OF_CONDUCT
    to: CODE_OF_CONDUCT
```
```yml
steps:
  - read: email
    from: git.author_email
  
  - degit: some/license_template
    to:
      path: '{{ tmpdir.license }}'
  
  - copy:
      path: '{{ tmpdir.license }}/LICENSE'
    to: LICENSE
```
👉 Pass an [extended glob pattern](https://www.npmjs.com/package/minimatch) to copy multiple files at once. When
copying multiple files, the `to` expression is treated as a folder address:
```yml
copy: ./template/code/**/*.java
to: src/main/java
```
☝️ The structure of the copied files will be preserved in the destination folder. In the above example,
`./template/code/com/example/Hello.java` will be copied to `src/main/java/com/example/Hello.java`.

<br>

When using a glob pattern, hidden files (starting with a dot, e.g. `.gitignore`) and files in hidden folders (e.g. `.github/workflows/publish.yml`) are ignored by default. Copy hidden files by explicitly mentioning them:
```yml
- copy: '**/.*.java'
  to: src/main/java

- copy: '**/.**/**/*.java'
  to: src/main/java
```
Or by using the `include hidden` option:
```yml
copy: '**/*.java'
to: src/main/java
include hidden: true
```

<br/>

#### Remove
> _Command_
> ```yml
> remove:
>   <expression>
> include hidden?: <boolean>
> ```
Removes a file or a folder.
```yml
steps:
  # do some other stuff
  
  - remove: .tmplr.yml
```
👉 Pass an [extended glob pattern](https://www.npmjs.com/package/minimatch) to remove multiple files at once:
```yml
remove: ./**/*.tmplr.*
```

When using a glob pattern, hidden files (starting with a dot, e.g. `.gitignore`) and files in hidden folders (e.g. `.github/workflows/publish.yml`) are ignored by default. Remove hidden files by explicitly mentioning them:

```yml
- remove: '**/.*'
- remove: '**/.**/**/*'
```

Or by using the `include hidden` option:

```yml
remove: '**/*'
include hidden: true
```

Note that when passing a glob pattern, folders are not removed. If you want to remove a folder, you need to pass the folder path explicitly:

```yml
remove: .github
```

<br/>

#### Steps
> _Command_
> ```yml
> steps:
>   - <command>
>   - <command>
>   - ...
> ```

Runs given commands step by step.
```yml
steps:
  - read: name
    from: git.author_name
    fallback:
      from: env.USER
  
  - update: package.json
  - copy: .template/README.md
    to: README.md
  - remove: .template
```
  
<br/>

#### If
> _Command_
> ```yml
> if: <variable / contextual value>
> <command>
> else?:
>   <command>
> ```
> ```yml
> if:
>   <expression>
> <command>
> else?:
>   <command>
> ```
Runs given command if given variable, contextual value, or expression resolves to a non-empty string. Runs the _else_ command if the
condition fails.
```yml
steps:
  - if: git.remote_url
    copy: README.git-template.md
    to: README.md
    else:
      copy: README.non-git-template.md
      to: README.md
```

<br/>
  
#### Degit

> _Command_
> ```yml
> degit:
>   <expression>
> to?:
>   <expression>
> ```
Copies contents of given repository into specified folder. If destination is not specified, will copy
into the same folder as the running recipe. Accepts the same sources as `tmplr` command.
```yml
steps:
  - degit: user/repo
    to:
      eval: '{{ tmpdir.repo }}'
```

<br/>

#### Run
> _Command_
> ```yml
> run:
>   <expression>
> with?:
>   <argname>:
>     <expression>
>   <argname>:
>     <expression>
>   ...
> read?:
>   <varname>: <outname>
>   <varname>: <outname>
>   ...
> ```
Parses and executes given local recipe. You can pass arguments to the recipe file (which can be accessed via the [`args` context](#recipe-arguments) lazily). The recipe WILL NOT have access to variables you have [read](#read) by default. You can read the variables [read](#read) by the recipe into variables in your own recipe.

```yml
steps:
  - read: name
    from: git.author_name

  - run: .templates/util/some-recipe.yml
    with:
      name: name             # will pass `name` variable
      remote_url:
        from: git.remote_url # this will be executed lazily
        fallback:
          prompt: What is the remote URL?
    read:
      lockfile: lockfile     # will read `lockfile` variable of the inner recipe into `lockfile` variable of outer recipe
      some_success: success  # will read `success` variable of the inner recipe into `some_success` variable of outer recipe
```

<br/>

> 💡 **RELATIVE PATHS**
> 
> Relative paths are resolved _relative to the recipe_. In the example above, the caller recipe referencing `README.md` will access `README.md` at the root of the project, while the called recipe accessing `README.md` would access `.templates/util/README.md`. It is recommended to use the [path](#path) expression to turn all path strings into absolute paths.

<br/>

#### Use
> _Command_
> ```yml
> use:
>   <expression>
> with?:
>   <argname>:
>     <expression>
>   <argname>:
>     <expression>
>   ...
> read?:
>   <varname>: <outname>
>   <varname>: <outname>
>   ...
> ```
Dwnloads, parses and executes given recipe from a public repository. First fetches the specified repository (using [degit](#degit))
into a temporary directory at the root of the project, and then locates `.tmplr.yml` in that directory and [runs](#run) it. The specified
repository MUST have a `.tmplr.yml` file at its root.

```yml
steps:
  - read: name
    from: git.author_name

  - use: some-user/some-repo
    with:
      name: name               # will pass `name` variable
      remote_url:
        from: git.remote_url   # this will be executed lazily
        fallback:
          prompt: What is the remote URL?
    read:
      lockfile: lockfile       # will read `lockfile` variable of the inner recipe into `lockfile` variable of outer recipe
      some_success: success    # will read `success` variable of the inner recipe into `some_success` variable of outer recipe
```

<br/>

Since the whole repo is fetched, the recipe can also utilize other templating files shipped alongside it. Since it will be put in a temporary
directory at the root of the project, it can relatively access files via `../` (for example, the main readme will be at `../README.md`).

```yml
# https://github.com/some-user/some-repo/.tmplr.yml
steps:
  - read: some_variable
    from: some.context

  - copy: ./README.md
    to: ../README.md
```

<br/>

### Expressions

- [**from**](#from): reads from a contextual value.
- [**prompt**](#prompt): asks the value from user.
- [**choices**](#choices): asks the value from user, but gives them some predetermined choices.
- [**eval**](#eval): evaluates an expression.
- [**path**](#path): evaluates to an absolute path value.

<br/>

#### From
> _Expression_
> ```yml
> from: <contextual-variable>
> fallback?:
>   <expression>
> ```
Resolves given contextual value. If it can't be resolved,
will evaluate the fallback expression, or an empty string if no fallback is specified.
```yml
steps:
  - read: username
    from: git.remote_owner
    fallback:
      from: env.USER
```

<br/>

#### Prompt
> _Expression_
> ```yml
> prompt: <message>
> default?:
>   <expression>
>```
Asks the user for a value. If a default value is provided, then that will be suggested to the user
as well.
```yml
steps:
  - read: username
    prompt: What is your username?
    default:
      from: git.author_name
      fallback:
        from: env.USER
```

<br/>

#### Choices
> _Expression_
> ```yml
> prompt: <message>
> choices:
>   - <label>:
>       <expression>
>   - <label>:
>       <expression>
>   ...
> ```
Asks the user to choose from a list of values. Evaluates the corresponding expression of each choice _after_ the user
has selected it (so you can chain prompts and other expressions safely).
```yml
steps:
  - read: username
    prompt: What is your username?
    choices:
      - Read it from git:
          from: git.author_name
      - Read it from env:
          from: env.USER
      - John Doe # 👉 here the value is the same as the label.
      - None:
          prompt: Ok but what is your username though?
```

<br/>

#### Eval
> _Expression_
> ```yml
> eval: <expr>
> steps?:
>   - <command>
>   - <command>
>   ...
> ```

Evaluates given expression, similar to evaluation of template variables in [updated](#update) or [copied](#copy)
files, except you don't need the `tmplr.` prefix, and can access [contextual values](#contextual-values) too.

```yml
steps:  
  read: git_url
  from: git.remote_url
  fallback:
    eval: 'https://github.com/{{ env.USER | snake_case }}/{{ filesystem.rootdir }}.git'
```

You can optionally pass a list of commands as the _steps_ property. These are usually (but not necessarily) some [read](#read)s
to fetch further values required for the evaluation. Note that these commands only get executed if the _Eval Expression_
itself is evaluated.

```yml
steps:
  - read: git_url
    from: git.remote_url
    fallback:
      steps:
        - read: git_provider
          prompt: Where is the project hosted?
          choices:
            - GitHub: 'https://github.com'
            - BitBucket: 'https://bitbucket.org'
            - Source Hut: 'https://git.sr.ht'
            - Other:
                prompt: Please specify ...
        - read: git_owner
          from: env.USER
          fallback:
            prompt: What is your username?
      eval: '{{ git_provider }}/{{ git_owner }}/{{ filesystem.rootdir }}.git'  
```

<br/>

#### Path
> _Expression_
> ```yml
> path: <expr>
> ```
Similar to [**eval**](#eval) but for strings representing file paths. If the expression evaluates to a relative path, will
turn it into an absolute path (relative paths are _relative to the recipe_). Use it to pass path
arguments to and reading path values from recipes you [use](#use) or [run](#run).
```yml
steps:
  # ...
  - degit: some/repo
    to:
      eval: '{{ tmpdir.some_repo }}'

  - use: some/recipe
    with:
      readme:
        path: '{{ tmpdir.some_repo }}/README.md'
```

<br>

### Pipes

- [**Letter Case Pipes**](#letter-case-pipes)
- [**String Pipes**](#string-pipes)
- [**Regexp Matching**](#regexp-matching)

<br>

Use pipes to modify variables, either in [copied](#copy) / [updated](#update) files, or in the recipe itself:

```yaml
# .tmplr.yml
steps:
  - read: name
    prompt: whats the name?
  
  - copy: .templates/template.md
    to:
      eval: '{{ name | path/case }}.md'

  - remove: .templates
```

````markdown
<!-- .templates/template.md -->

# {{ tmplr.name | Capital Case }}

This is a super awesome project that can be installed by running:
```bash
npm i {{ tmplr.name | kebab-case }}
```
````
☝️ Running this recipe with the name `cool project` will result in `cool/project.md` with the following contents:
````markdown
# Cool Project

This is a super awesome project that can be installed by running:
```bash
npm i cool-project
```
````

<br>

#### Letter Case Pipes

Use the following pipes to change the casing of a string (they are case-sensitive):

```
- camelCase           - Capital Case       - CONSTANT_CASE 
- dot.case            - Header-Case        - kebab-case
- PascalCase          - path/case          - param-case
- Sentence case       - UPPERCASE          - lowercase
```

<br>
  
#### String Pipes

👉 Use `skip` and `trim` pipes to remove the given number of characters from the beginning and
the end of the string, respectively:

```yml
steps:
  - read: component_name
    prompt: What is the name of the component?
    default:
      #
      # if the directory name is 'react-my-component', then
      # this will evaluate to 'MyComponent'.
      #
      eval: '{{ filesystem.rootdir | skip: 6 | PascalCase }}'
```

👉 Pass string values to `trim` and `skip` to remove the given string
from the start / end of the variable. Only works if the variable starts / ends with exactly the given string:

```yml
steps:
  - read: component_name
    prompt: What is the name of the component?
    default:
      #
      # if the directory name is 'react-my-component', then
      # this will evaluate to 'MyComponent'. However, if the
      # directory name does not start with 'react-', then it will
      # not modify it.
      #
      eval: '{{ filesystem.rootdir | skip: react- | PascalCase }}'
```

<br>

#### Regexp Matching

👉 Use `matches` pipe to check if a variable matches given string/pattern. This pipe returns the given string if it matches, and returns an empty string otherwise. Use this for [conditional commands](#if):

```yml
steps:
  # ...

  - if:
      eval: '{{ some_var | matches: some value }}'
    update: some_file.txt
    else:
      update: some_other_file.txt

  # ...
```
```yml
if:
  eval: '{{ database | matches: /Mongo/ }}'
copy: mongodb.config.js
to: ./src/config/db.config.js
else:
  copy: postgres.config.js
  to: ./src/config/db.config.js
```

<br>
