# Running a Recipe in GitHub Actions

GitHub itself provides [template repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository), where you can mark your repository as a template, and others can use it as a starter for their projects. You can use `tmplr` and [GitHub Actions](https://docs.github.com/en/actions) to run a recipe when users use your template repository, further preparing the project for them (for example, inserting their name and email into README and LICENSE files, adding the name of the project here and there, etc.).

👉 **STEP 1**: add a [template recipe](https://github.com/loreanvictor/tmplr#template-recipes).

👉 **STEP 2**: Add a workflow like this to your template repository:

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

You can see this in action on [this example repository](https://github.com/loreanvictor/tmplr-template-example).

<br>

> **IMPORTANT**
>
> Since the execution context of GitHub Actions is NOT interactive, your recipe SHOULD NOT require user interaction. Make sure that all the data you need to run the recipe exists within [GitHub Actions Context](https://docs.github.com/en/actions/learn-github-actions/contexts).

<br><br>



