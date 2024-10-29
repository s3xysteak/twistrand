import { expectTypeOf, it } from 'vitest'
import MersenneTwister from '../src/mersenne-twister'

it('mersenne-twister types', () => {
  expectTypeOf(MersenneTwister).constructorParameters.toEqualTypeOf<[seed?: number]>()

  const mt = new MersenneTwister()

  expectTypeOf(mt.random()).toEqualTypeOf<number>()
  expectTypeOf(mt.randomInt(1, 2)).toEqualTypeOf<number>()
  expectTypeOf(mt.randomFloat(1, 2)).toEqualTypeOf<number>()
})
