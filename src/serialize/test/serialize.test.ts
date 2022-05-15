import { parse as parseYaml } from 'yaml'
import { parse } from '../../parse'
import serialize from '../index'


test('serializes to yaml', async () => {
  const yml = `
steps:
  - read: somevar
    from: some.const
    fallback:
      prompt: 'What is var?'
      default: 'stuff'
  - read: othervar
    eval: '{{ somevar }} and {{ thatotherthing }}'
    steps:
      - read: thatotherthing
        from: some.otherconst
        fallback:
          prompt: 'What is thatotherthing?'
          choices:
            - something: a
            - some other thing:
                eval: '{{ somevar }} oder {{ thatotherthing }}'
  - update: ./package.json
  - copy: ./.tmplr/template.js
    to: ./src/template.js
  - remove: ./LICENSE
  - degit: some/repo
    to:
      prompt: Where should we clone the repo?
`

  const parsed = parse(yml)
  const serialized = serialize(parsed.command)

  expect(parseYaml(serialized)).toEqual(parseYaml(yml))
})
