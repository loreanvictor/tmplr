import React from 'react'
import { Text, Transform, Box } from 'ink'
import link from 'terminal-link'

import { Highlight, Tertiary, Accent, Hint  } from '../theme'


const Newline = () => <Text> </Text>


interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => (
  <>
    <Text italic>{title}:</Text>
    {children}
    <Newline/>
  </>
)


interface LineProps {
  label: string
  children: React.ReactNode
}

const Line = ({ label, children }: LineProps) => (
  <Text>
    <Tertiary>{label} </Tertiary>
    <Hint>{'......................................'.substring(label.length)} </Hint>
    {children}
  </Text>
)


interface LinkProps {
  children: React.ReactNode
  url: string
}

const Link = ({ children, url }: LinkProps) => (
  <Transform transform={text => link(text, url)}>
    <Accent>{children}</Accent>
  </Transform>
)


export function Help() {
  return <>
    <Newline/>
    <Highlight># tmplr: repo templating</Highlight>
    <Text>Copies contents of a repository and runs its templating recipe.</Text>
    <Newline/>

    <Section title='👉 Basic Usage'>
      <Line label='tmplr'>Runs the local recipe</Line>
      <Line label='tmplr USER/REPO'>Copies repo from GitHub and runs its recipe</Line>
      <Line label='tmplr -d FOLDER'>Runs the recipe in given folder</Line>
      <Line label='tmplr -d FOLDER USER/REPO'>Copies repo to given folder and runs its recipe</Line>
    </Section>

    <Section title='✨ Recipe Development'>
      <Line label='tmplr preview'>Safely preview the local recipe</Line>
      <Line label='tmplr preview -d FOLDER'>Safely preview the recipe in given folder</Line>
      <Line label='tmplr clean'>Clean all development artifacts</Line>
    </Section>

    <Section title='🚀 Misc'>
      <Line label='tmplr version'>Checks latest version against installed version</Line>
      <Line label='tmplr help'>Shows help</Line>
    </Section>

    <Box borderColor='gray' borderStyle='round' padding={1}>
      <Text>💡 Read the <Link url='https://github.com/loreanvictor/tmplr'>docs</Link> for more info.
        {'\n'}   Read <Link url='https://github.com/loreanvictor/tmplr/blob/main/cli.md'>this</Link> for
        to learn more about the CLI options.
      </Text>
    </Box>
  </>
}
