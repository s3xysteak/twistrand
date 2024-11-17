# 🌱 twistrand

> `twist` from Mersenne **Twist**er, `rand` means random.

<img src="https://img.shields.io/badge/coverage-100%25-gold" alt="Test coverage" title="test coverage" >

A PRNG (Pseudo Random Number Generator) library based on Mersenne Twister, written by typescript, supported both esm/cjs.

## 🔧 Install

```sh
pnpm i twistrand
```

## 📝 Usage

### Basic

```js
import rand from 'twistrand'

const mtDefault = rand(/* Use `Date.now()` in default */)

const mt1 = rand(12345)
const mt2 = rand(12345)

mt1.random() === mt2.random() // true
mt1.randomInt(0, 100) === mt2.randomInt(0, 100) // true
mt1.randomFloat(0.0, 100.0) === mt2.randomFloat(0.0, 100.0) // true

const mt = rand(12345)
const v1 = mt.random()
const v2 = mt.random()

v1 !== v2 // true
```

### Output

```js
const mt = rand()
```

- `x = mt.random()`: `x ∈ [0, 1)`
- `x = mt.randomFloat(0, 100)`: `x ∈ [0, 100)`
- `x = mt.randomInt(0, 100)`: `x ∈ [0, 100]` `x ∈ Z`

> More usage please refer to [test](/test/).

## 🛠️ test

### bench
| Name                        | Hz               | Min    | Max    | Mean   | P75    | P99    | P995   | P999   | RME     | Samples   |
|-----------------------------|------------------|--------|--------|--------|--------|--------|--------|--------|---------|-----------|
| vanilla Math.random()       | 24,067,422.00    | 0.0000 | 0.3725 | 0.0000 | 0.0001 | 0.0001 | 0.0002 | 0.0003 | ±0.62%  | 12,033,711|
| new instance creation       | 196,243.61       | 0.0040 | 0.2943 | 0.0051 | 0.0045 | 0.0228 | 0.0571 | 0.0821 | ±0.78%  | 98,122    |
| random() generation         | 25,231,394.95    | 0.0000 | 0.3242 | 0.0000 | 0.0001 | 0.0001 | 0.0001 | 0.0011 | ±0.46%  | 12,615,700|
| randomInt() generation      | 24,670,312.00    | 0.0000 | 0.2475 | 0.0000 | 0.0001 | 0.0001 | 0.0001 | 0.0011 | ±0.47%  | 12,335,156|
| randomFloat() generation    | 25,245,832.00    | 0.0000 | 1.3302 | 0.0000 | 0.0001 | 0.0001 | 0.0001 | 0.0011 | ±0.71%  | 12,622,916|

### % Coverage report from v8
| File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|----------------------|---------|----------|---------|---------|-------------------|
| All files            |     100 |      100 |     100 |     100 |                   |
| index.ts             |     100 |      100 |     100 |     100 |                   |
| mersenne-twister.ts  |     100 |      100 |     100 |     100 |                   |
