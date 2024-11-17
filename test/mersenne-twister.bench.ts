import { bench, describe } from 'vitest'
import MersenneTwister from '../src/mersenne-twister'

describe('mersenneTwister Benchmarks', () => {
  const mt = new MersenneTwister(12345)

  bench('vanilla Math.random()', () => {
    Math.random()
  })

  bench('new instance creation', () => {
    /* eslint-disable-next-line no-new */
    new MersenneTwister(12345)
  })

  bench('random() generation', () => {
    mt.random()
  })

  bench('randomInt() generation', () => {
    mt.randomInt(-1000, 1000)
  })

  bench('randomFloat() generation', () => {
    mt.randomFloat(-1000.0, 1000.0)
  })
})
