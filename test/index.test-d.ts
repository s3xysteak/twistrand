import { expectTypeOf, it } from 'vitest'
import rand from '../src'

it('index types', () => {
  expectTypeOf(rand).parameters.toEqualTypeOf<[seed?: number]>()
})
