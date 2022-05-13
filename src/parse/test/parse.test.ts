import { Choices, Copy, Eval, From, Prompt, Read, Remove, Steps, Update, Value } from '../../context/command'
import { parse } from '../index'


test('parses yml.', async () => {
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
`

  const parsed = parse(yml)
  expect(parsed.command).toBeInstanceOf(Steps)

  const steps = parsed.command as Steps
  expect(steps.steps.length).toBe(5)
  expect(steps.steps[0]).toBeInstanceOf(Read)
  expect(steps.steps[1]).toBeInstanceOf(Read)
  expect(steps.steps[2]).toBeInstanceOf(Update)
  expect(steps.steps[3]).toBeInstanceOf(Copy)
  expect(steps.steps[4]).toBeInstanceOf(Remove)

  const r1 = steps.steps[0] as Read
  expect(r1.variable).toBe('somevar')
  expect(r1.expr).toBeInstanceOf(From)
  const r1f = r1.expr as From
  expect(r1f.address).toBe('some.const')
  expect(r1f.fallback).toBeInstanceOf(Prompt)
  const r1fp = r1f.fallback as Prompt
  expect(r1fp.msg).toBe('What is var?')
  expect(r1fp._default).toBeInstanceOf(Value)
  const r1fpv = r1fp._default as Value
  expect(r1fpv.value).toBe('stuff')

  const r2 = steps.steps[1] as Read
  expect(r2.variable).toBe('othervar')
  expect(r2.expr).toBeInstanceOf(Eval)
  const r2e = r2.expr as Eval
  expect(r2e.expr).toBe('{{ somevar }} and {{ thatotherthing }}')
  expect(r2e.steps).not.toBeUndefined()
  expect(r2e.steps!.steps.length).toBe(1)
  expect(r2e.steps!.steps[0]).toBeInstanceOf(Read)
  const r2e2r = r2e.steps!.steps[0] as Read
  expect(r2e2r.variable).toBe('thatotherthing')
  expect(r2e2r.expr).toBeInstanceOf(From)
  const r2e2rf = r2e2r.expr as From
  expect(r2e2rf.address).toBe('some.otherconst')
  expect(r2e2rf.fallback).toBeInstanceOf(Choices)
  const r2e2rfp = r2e2rf.fallback as Choices
  expect(r2e2rfp.msg).toBe('What is thatotherthing?')
  expect(r2e2rfp.choices.length).toBe(2)
  expect(r2e2rfp.choices[0]!.label).toBe('something')
  expect(r2e2rfp.choices[0]!.value).toBeInstanceOf(Value)
  const r2e2rfpv = r2e2rfp.choices[0]!.value as Value
  expect(r2e2rfpv.value).toBe('a')
  expect(r2e2rfp.choices[1]!.label).toBe('some other thing')
  expect(r2e2rfp.choices[1]!.value).toBeInstanceOf(Eval)
  const r2e2rfpv2 = r2e2rfp.choices[1]!.value as Eval
  expect(r2e2rfpv2.expr).toBe('{{ somevar }} oder {{ thatotherthing }}')
  expect(r2e2rfpv2.steps).toBeUndefined()

  expect(steps.steps[2]).toBeInstanceOf(Update)
  const u = steps.steps[2] as Update
  expect(u.target).toBe('./package.json')

  expect(steps.steps[3]).toBeInstanceOf(Copy)
  const c = steps.steps[3] as Copy
  expect(c.src).toBe('./.tmplr/template.js')
  expect(c.dest).toBe('./src/template.js')

  expect(steps.steps[4]).toBeInstanceOf(Remove)
  const r = steps.steps[4] as Remove
  expect(r.target).toBe('./LICENSE')
})
