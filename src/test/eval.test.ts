import { evaluate } from '../eval'
import { cached } from '../util/cached'
import { createStore, createProvider } from '../store'


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
