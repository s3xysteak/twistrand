import { expect, it } from 'vitest'
import rand from '../src'

it('index', () => {
  const mt = rand(12345)

  r(1000, () => {
    const value = mt.random()
    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThan(1)
    expect(typeof value).toBe('number')
  })
})

function r(times: number, fn: (index: number) => void) {
  for (let i = 0; i < times; i++) {
    fn(i)
  }
}
