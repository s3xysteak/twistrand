import { describe, expect, it } from 'vitest'
import MersenneTwister from '../src/mersenne-twister'

function r(times: number, fn: (index: number) => void) {
  for (let i = 0; i < times; i++) {
    fn(i)
  }
}

describe.concurrent('mersenne-twister', () => {
  it('should generate numbers in [0, 1) range', () => {
    const mt = new MersenneTwister(12345)

    r(1000, () => {
      const value = mt.random()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
      expect(typeof value).toBe('number')
    })
  })

  it('should generate consistent sequence with same seed', () => {
    const mt1 = new MersenneTwister(12345)
    const mt2 = new MersenneTwister(12345)

    r(1000, () => {
      expect(mt1.random()).toBe(mt2.random())
    })
  })

  it('should generate different sequences with different seeds', () => {
    const mt1 = new MersenneTwister(12345)
    const mt2 = new MersenneTwister(54321)

    const set = new Set<boolean>()
    r(1000, () => {
      set.add(mt1.random() !== mt2.random())
    })
    expect(set.size).toBe(1)
    expect(set.has(true)).toBe(true)
  })

  it('should generate integers within specified range', () => {
    const mt = new MersenneTwister(12345)
    const min = -10
    const max = 10

    r(1000, () => {
      const value = mt.randomInt(min, max)
      expect(value).toBeGreaterThanOrEqual(min)
      expect(value).toBeLessThanOrEqual(max)
      expect(Number.isInteger(value)).toBe(true)
    })
  })

  it('should generate floats within specified range', () => {
    const mt = new MersenneTwister(12345)
    const min = -10.5
    const max = 10.5

    r(1000, () => {
      const value = mt.randomFloat(min, max)
      expect(value).toBeGreaterThanOrEqual(min)
      expect(value).toBeLessThan(max)
    })
  })

  it('chi-square test for random distribution', () => {
    const samples = 1_000_000
    const numBuckets = 1001
    /**
     * https://www.medcalc.org/manual/chi-square-table.php
     * p=0.001
     */
    const criticalValue = 1143.917

    const mt = new MersenneTwister()

    const counts = Array.from({ length: numBuckets }).fill(0) as number[]

    r(samples, () => {
      const randomNumber = Math.floor(mt.random() * numBuckets)
      counts[randomNumber]++
    })

    const fe = samples / numBuckets
    const chiSquare = counts.reduce((sum, fo) => {
      return sum + (fo - fe) ** 2 / fe
    }, 0)

    expect(chiSquare).toBeLessThanOrEqual(criticalValue)
  })
})
