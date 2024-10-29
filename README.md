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
