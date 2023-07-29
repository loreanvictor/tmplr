import React from 'react'
import { Text, Box } from 'ink'

import { Logo, Section, Newline, Link, Command } from './components'


export function Help() {
  return <>
    <Logo/>
    <Text>Copies contents of a repository and runs its templating recipe.</Text>
    <Newline/>

    <Section title='👉 Basic Usage'>
      <Command cmd='tmplr'>Runs the local recipe</Command>
      <Command cmd='tmplr USER/REPO'>Copies repo from GitHub and runs its recipe</Command>
      <Command cmd='tmplr -d FOLDER'>Runs the recipe in given folder</Command>
      <Command cmd='tmplr -d FOLDER USER/REPO'>Copies repo to given folder and runs its recipe</Command>
    </Section>

    <Section title='👽 Advanced Usage'>
      <Command cmd='tmplr local:SRC -d DEST'>Copies contents of folder to given folder and runs its recipe</Command>
      <Command cmd='tmplr gitlab:USER/REPO#c0m1th45h'>Copies repo from GitLab at given commit and runs its recipe</Command>
      <Command cmd='tmplr bitbucket:USER/REPO#BRANCH'>Copies repo from BitBucket from given branch and runs its recipe</Command>
      <Command cmd='tmplr use USER/REPO'>Runs given re-usable recipe</Command>
    </Section>

    <Section title='✨ Recipe Development'>
      <Command cmd='tmplr preview'>Safely preview the local recipe</Command>
      <Command cmd='tmplr preview -d FOLDER'>Safely preview the recipe in given folder</Command>
      <Command cmd='tmplr preview:use'>Safely preview running local recipe as a reusable recipe</Command>
      <Command cmd='tmplr clean'>Clean all development artifacts</Command>
    </Section>

    <Section title='🚀 Misc'>
      <Command cmd='tmplr version'>Checks latest version against installed version</Command>
      <Command cmd='tmplr help'>Shows help</Command>
    </Section>

    <Box borderColor='gray' borderStyle='round' padding={1}>
      <Text>💡 Read the <Link url='https://github.com/loreanvictor/tmplr'>docs</Link> for more info.
        {'\n'}   Read <Link url='https://github.com/loreanvictor/tmplr/blob/main/cli.md'>this</Link> for
        to learn more about the CLI options.
      </Text>
    </Box>
  </>
}
