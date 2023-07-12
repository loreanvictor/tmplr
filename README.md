<div align="right">

[![version](https://img.shields.io/npm/v/tmplr?label=&color=black&style=flat-square)](https://www.npmjs.com/package/tmplr)

</div>

![Logo](./logo-dark.svg#gh-dark-mode-only)
![Logo](./logo-light.svg#gh-light-mode-only)

<br/>

`tmplr` creates a project from a template (as opposed to creating one from scratch). It copies a given public repository, and securely runs the specified interactive recipe to further fill up the project with contextual info (project name, git URL, author contact, etc).

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

The main difference between `tmplr` and other scaffolding tools (such as [degit](https://github.com/Rich-Harris/degit), which `tmplr` actually uses under the hood, and [cookiecutter](https://github.com/cookiecutter/cookiecutter)) is its powerful, interactive recipes. They are able to conduct a wide range of tasks, from removing a license file, to help manage a monorepo or set up a CI/CD pipeline, while remaining safe to run on your machine.

<br/>

# Contents

- [How to Install](#how-to-install)
- [How to Use](#how-to-use)
  - [Running Recipes](#running-recipes)
  - [Working Directory](#working-directory)
  - [Execution Safety](#execution-safety)
- [How to Make a Template](#how-to-make-a-template)
  - [Template Recipes](#template-recipes)
  - [Contextual Values](#contextual-values)
    - [Git Context](#git-context)
    - [Filesystem Context](#filesystem-context)
    - [Environment Variables](#environment-variables)
    - [Temporary Directories](#temporary-directories)
    - [Recipe Arguments](#recipe-arguments)
  - [Recipe Syntax](#recipe-syntax)
    - [Commands](#commands)
    - [Expressions](#expressions)
    - [Pipes](#pipes)

<br/>

# How to Install

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

<br/>

# How to Use

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

# How to Make a Template

Every public repository is a template for `tmplr`. If you have such a template, you can enhance user experience by adding a recipe to interactively customise the result for end user's needs. To do this, add a [YAML file](https://en.wikipedia.org/wiki/YAML) named `.tmplr.yml`, located at the root of your repository. When running the following:

```bash
npx tmplr your/repo
```

`tmplr` will copy the contents of your repo and then execute the recpie. Alternatively, if someone already has your repo locally, they can run the recipe like this:

```bash
npx tmplr
```

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

Where `README.md` can be something like this:

````md
# {{ tmplr.project_name }}

This is my super awesome project. You can clone it using the following command:
```bash
git clone {{ tmplr.clone_url }}
```
````

<br>

Assuming someone runs this recipe on a repository like `https://github.com/john/my-project`, then `README.md` would be updated to the following:

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

👉 A comprehensive list of all available commands can be found [here](#recipe-syntax). \
👉 A list of available contextual values (e.g. `git.remote_url` or `filesystem.rootdir`) can be found [here](#contextual-values). \
👉 If you (like me) prefer learning by example, you can [check this example template repository](https://github.com/loreanvictor/tmplr-template-example), or checkout these examples from [`/examples`](./examples) folder:


- [Create GitHub template and run a recipe when someone uses your template](https://github.com/loreanvictor/tmplr/blob/main/examples/github-actions.md)
- [Conveniently add new packages to monorepos using local templates](https://github.com/loreanvictor/tmplr/blob/main/examples/monorepo.md)


<br/>

## Contextual Values

Recipes might have access to following contextual values, depending on the conditions (for example, if the repository is executed outside of a git repository, then `git.*` values are not available).

<br/>

### Git Context

- `git.remote_url`: The origin URL of current git repository (this can be cloned, for example)
- `git.remote_name`: The name of the origin (e.g. repository name)
- `git.remote_provider`: The address of the git host (e.g. `https://github.com`)
- `git.remote_owner`: The name of the user on the remote who owns the repository
- `git.author_name`: The name of the person who made the first commit on the repo
- `git.author_email`: Email address of the first committer.

<br/>

### Filesystem Context

- `filesystem.root`: Absolute address of the root directory (which the recipe is being executed in)
- `filesystem.rootdir`: The name of the root directory
- `filesystem.scope`: Absolute address of the scope of this recipe.
- `filesystem.scopedir`: The name of the scope directory.

The root directory, accessible via `filesystem.root`, is where the recipe file is located. This is also the addrerss which all
relative addresses in the recipe are interpreted relative to. The scope, accessible via `filesystem.scope`, dictates which files
the recipe has access to: The recipe can only access files in the scope (or in sub directories in the scope, recursively). The scope
is by default the same as the root, however when a recipe invokes a child recipe (via [run](#run) or [use](#use) commands), then
the scope differs from the root, as the invoked recipe might be in a subdirectory (which would cause its root to differ from the
parent recipe), while its scope remains the same as the parent recipe.

<br/>

### Environment Variables

You can use `env.some_var` to access some environment variable. If it is not defined, an empty string will be returned.

<br/>

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

> 👉 Recipe arguments are evaluated lazily. For example, if a prompt is passed as an argument, the user will be prompted the first time you
> access that argument.

<br/>

## Recipe Syntax

Template recipes are composed of _commands_ and _expressions_. _Commands_ instruct actions that are to be taken (i.e. read a value, update a file, etc), and _expressions_ calculate string values used by commands. A template recipe descirbes a single command, which can itself be composed of multiple other
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

☝️ Here the recipe is a single _steps_ command, which is composed of multiple steps (each another command). Take a closer look at the initial _read_ command:

```yml
  - read: project_name
    from: git.remote_name
    fallback:
      prompt: What is the name of the project?
      default:
        from: filesystem.rootdir
```

The [read](#read) command reads a value from an expression and stores it in a variable. From this point on, when [copy](#copy) or [update](#update) contents of a file, if the file contains `{{ tmplr.project_name }}`, the value resolved here will be replaced. Here we read a value using a _From Expression_, i.e. we read _from_ a contextual value (in this case, the remote name for the git repository). If the contextual value can't be resolved (for example, the command is executed outside of a git repo), then the fallback expression will be used, which is a _prompt_ asking the user for the value, and so on.

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

Note that the single string passed to the [update](#update) command is also an expression. Except in cases where the expression is attached to the command (like in case of the [read command](#read)), expressions can be simple string values or more complex objects. For example, we can replace the _default_ of the prompt from a _From Expression_ to a simple string:

```yml
  - read: project_name
    from: git.remote_name
    fallback:
      prompt: What is the name of the project?
      default: My Awesome Project
```

<br/>

### Commands

Commands instruct `tmplr` to read values, update contents of files, etc. Here you can see an overview of all available commands:

- [**read**](#read): reads a value into a variable, so that the variable can be used to update subsequent files.
- [**update**](#update): updates contents of a file, replacing variables with values read.
- [**copy**](#copy): copy contents of a file to a new file, while replacing variables with values read.
- [**remove**](#remove): removes a file.
- [**steps**](#steps): runs a bunch of commands in a step by step manner.
- [**if**](#if): runs a command conditionally.
- [**degit**](#degit): copies content of given repository to given folder, without bringing the git history.
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

Reads some value into a variable. The variable then can be used in updating / copying file contents.
```yml
steps:
  - read: project_name
    from: filesystem.rootdir
```
☝️ After executing this command, if you [update](#update) or [copy](#copy) any file that contains `{{ tmplr.project_name }}`, the value read by this command will be replaced.

<br/>

#### Update
> _Command_
> ```yml
> update:
>   <expression>
> include hidden?: <boolean>
> ```
Updates contents of a file, using values read with [`read`](#read).
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

👉 Update also supports [extended glob pattern](https://www.npmjs.com/package/minimatch), so you can update multiple files at once:
```yml
update: 'src/**/*.java'
```

When using a glob pattern, hidden files (starting with a dot, e.g. `.gitignore`) and files in hidden folders (e.g. `.github/workflows/publish.yml`) are ignored by default. You can update hidden files either by explicitly mentioning them:
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
Copies content of given file to a new file on given name/address. Will create required folders, also if a file with given destination address
exists, will replace it. Will replace all `tmplr` variables (i.e. `{{ tmplr.some_var }}` in the content of the new file based on values [read](#read).
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
👉 Copy also supports [extended glob pattern](https://www.npmjs.com/package/minimatch), so you can copy multiple files at once. When
copying multiple files, the `to` expression is treated as a folder address:
```yml
copy: ./template/code/**/*.java
to: src/main/java
```
☝️ The structure of the copied files will be preserved in the destination folder. In the above example, if there is a
`./template/code/com/example/Hello.java` file, it will be copied to `src/main/java/com/example/Hello.java`.

<br>

When using a glob pattern, hidden files (starting with a dot, e.g. `.gitignore`) and files in hidden folders (e.g. `.github/workflows/publish.yml`) are ignored by default. You can update hidden files either by explicitly mentioning them:
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
Removes given file. Can also remove a folder.
```yml
steps:
  # do some other stuff
  
  - remove: .tmplr.yml
```
👉 Remove also supports [extended glob pattern](https://www.npmjs.com/package/minimatch), so you can remove multiple files at once:
```yml
remove: ./**/*.tmplr.*
```

When using a glob pattern, hidden files (starting with a dot, e.g. `.gitignore`) and files in hidden folders (e.g. `.github/workflows/publish.yml`) are ignored by default. You can update hidden files either by explicitly mentioning them:

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
> if: <contextual-variable>
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
Runs given command if given contextual variable (or value) exists and has a non-empty value. Can be given an expression instead
of a contextual variable (e.g. [eval](#eval)), where it will check if the resolved value is a non-empty string. Will run the _else_ command if the
condition fails (and an _else_ command is provided).
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
Will fetch the contents of given repository and copy them into specified folder. If destination is not specified, will copy
into the same folder as the running recipe. Accepts the same sources as `tmplr` command itself (basically runs [degit](https://github.com/Rich-Harris/degit)).
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
Parses and executes given local recipe file. You can pass arguments to the recipe file (which can be accessed via the [`args` context](#recipe-arguments) lazily. The recipe WILL NOT have access to variables you have read, so you need to manually pass them as arguments. You can access all the variables
read by the recipe though, and read them into variables of your own execution context.

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

Note that all relative paths inside any recipe are resolved _relative to the recipe file itself_. So in case of above example, the caller recipe referencing `README.md` will access `README.md` at the root of the project, while the called recipe accessing `README.md` would access `.templates/util/README.md`. This means the string `README.md` or `./README.md` mean different things for different recipes. To avoid such
confusions, use the [path](#path) expression to turn all path strings into absolute paths.

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
Will download, parse and execute given recipe from a public repository. Will first fetch the specified repository (via [degit](#degit))
into a temporary directory at the root of the project, and then locate `.tmplr.yml` in that directory and [run](#run) it. The specified
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

Expressions calculate string values used by commands. Here is an overview of all available expressions:

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
Will resolve from the value of given contextual variable. If it is not present and fallback is specified, will evaluate
and return the fallback expression. Otherwise will return an empty string.
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
Will resolve the value by asking the user. If a default value is provided, then that will be suggested to the user
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
Will resolve the value by giving the user multiple choices. Will evaluate the corresponding expression of each choice _after_ the user
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

Will evaluate given string expression. This is almost similar to evaluation of template variables in [updated](#update) or [copied](#copy)
files. The main difference is that in eval expressions you don't need the `tmplr.` prefix to access [read](#read) variables, and you can also
access other contextual values. [Pipes](#pipes) work similar to other files.

```yml
steps:  
  read: git_url
  from: git.remote_url
  fallback:
    eval: 'https://github.com/{{ env.USER | snake_case }}/{{ filesystem.rootdir }}.git'
```

You can optionally pass a list of commands as the _steps_ property. These are usually (but not necessarily) some [read](#read)
commands to fetch further values required for the evaluation. Note that these commands only get executed if the _Eval Expression_
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
turn it into an absolute path assuming the recipe file itself as the root of the address. This will be useful for passing path
arguments to and reading path values from other recipes executed via [run](#run) or [use](#use) commands.
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

Templating variables referenced in files or in the recipe (i.e. `{{ some_var }}`, `{{ git.some_var }}` or `{{ tmplr.some_var }}`) can also
be further modified with _pipes_:
  
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

Most pipes do not accept arguments are just for changing the letter case of the string. Here is a list of supported letter cases:

```
- camelCase           - Capital Case       - CONSTANT_CASE 
- dot.case            - Header-Case        - kebab-case
- PascalCase          - path/case          - param-case
- Sentence case       - UPPERCASE          - lowercase
```

<br>
  
👉 Use `skip` and `trim` pipes to remove the given number of characters from the beginning and
the end of the string respectively:

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

Alternatively, you can pass string values to `trim` and `skip`, in which case they will remove the given string
from the start / end of the string only if the string starts / ends with the given string:

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

👉 Use `matches` pipe to check the value of some variable. This pipe returns the given string if it matches the reference string, and returns an empty string otherwise. This is useful for running conditional commands based on some variable:

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

<br>

You can also pass regular expressions to `matches` pipe to check if given string matches given pattern:

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
