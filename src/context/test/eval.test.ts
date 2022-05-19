import { evaluate } from '../eval'
import { cached } from '../provider/util/cached'
import { createStore } from '../store'
import { createProvider } from '../provider'


test('replaces vars in text with given store.', async () => {
  const names = createProvider({
    'jack': cached(async () => 'JACK!'),
    'jill': cached(async () => 'JILL!'),
  })

  const store = createStore({ names }, {})

  const res = await evaluate(store, 'Hellow {{ names.jack}}, how is {{ names.jill }} doing?')
  expect(res).toBe('Hellow JACK!, how is JILL! doing?')
})


test('does not touch non existing variables.', async () => {
  const names = createProvider({
    'jack': cached(async () => 'JACK!'),
  })

  const store = createStore({ names }, { 'jill': 'JILL!' })

  const res = await evaluate(store, 'Hellow {{names.jack}}, how is {{ names.jill   }} doing? Whats up with {{ jill }}?')
  expect(res).toBe('Hellow JACK!, how is {{ names.jill   }} doing? Whats up with JILL!?')
})


test('applies pipes properly.', async () => {
  const vars = createProvider({
    'name': cached(async () => 'john Doe'),
  })

  const store = createStore({ vars }, {})

  const res1 = await evaluate(store, 'Hello {{ vars.name | UPPERCASE }}!!')
  const res2 = await evaluate(store, 'Hello {{ vars.name | kebab-case | skip:2 }}!!')
  const res3 = await evaluate(store, 'Hello {{ vars.name | trim:2 | path/case }}!!')
  const res4 = await evaluate(store, 'Hello {{ vars.name | trim:1 | Capital Case }}!!')
  const res5 = await evaluate(store, 'Hello {{ vars.name | snake_case | dot.case }}!!')
  const res6 = await evaluate(store, 'Hello {{ vars.name | trim:1 | skip:1 }}!!')
  const res7 = await evaluate(store, 'Hello {{ vars.name | weird }}!!')

  expect(res1).toBe('Hello JOHN DOE!!')
  expect(res2).toBe('Hello hn-doe!!')
  expect(res3).toBe('Hello john/d!!')
  expect(res4).toBe('Hello John Do!!')
  expect(res5).toBe('Hello john.doe!!')
  expect(res6).toBe('Hello ohn Do!!')
  expect(res7).toBe('Hello {{ vars.name | weird }}!!')
})
