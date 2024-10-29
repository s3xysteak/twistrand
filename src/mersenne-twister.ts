export default class MersenneTwister {
  private static readonly N = 624
  private static readonly M = 397
  private static readonly MATRIX_A = 0x9908B0DF
  private static readonly UPPER_MASK = 0x80000000
  private static readonly LOWER_MASK = 0x7FFFFFFF

  private readonly mt: Uint32Array
  private mti: number
  private readonly mag01: Uint32Array

  constructor(seed: number = Date.now()) {
    this.mt = new Uint32Array(MersenneTwister.N)
    this.mag01 = new Uint32Array([0, MersenneTwister.MATRIX_A])
    this.mti = MersenneTwister.N + 1
    this.init(seed)
  }

  private init(seed: number): void {
    this.mt[0] = seed >>> 0

    let i = 1
    const n = MersenneTwister.N - 1

    for (; i < 4 && i < n; i++) {
      const s = this.mt[i - 1]
      this.mt[i] = ((((s >>> 30) ^ s) * 1812433253) + i) >>> 0
    }

    for (; i < n; i += 4) {
      let s = this.mt[i - 1]
      this.mt[i] = ((((s >>> 30) ^ s) * 1812433253) + i) >>> 0

      if (i + 1 < n) {
        s = this.mt[i]
        this.mt[i + 1] = ((((s >>> 30) ^ s) * 1812433253) + (i + 1)) >>> 0
      }
      if (i + 2 < n) {
        s = this.mt[i + 1]
        this.mt[i + 2] = ((((s >>> 30) ^ s) * 1812433253) + (i + 2)) >>> 0
      }
      if (i + 3 < n) {
        s = this.mt[i + 2]
        this.mt[i + 3] = ((((s >>> 30) ^ s) * 1812433253) + (i + 3)) >>> 0
      }
    }
  }

  private twist(): void {
    const N = MersenneTwister.N
    const M = MersenneTwister.M
    const UPPER_MASK = MersenneTwister.UPPER_MASK
    const LOWER_MASK = MersenneTwister.LOWER_MASK
    const mt = this.mt
    const mag01 = this.mag01

    let i = 0
    const n = N - M

    for (; i < n - 4; i += 4) {
      let y = (mt[i] & UPPER_MASK) | (mt[i + 1] & LOWER_MASK)
      mt[i] = mt[i + M] ^ (y >>> 1) ^ mag01[y & 0x1]

      y = (mt[i + 1] & UPPER_MASK) | (mt[i + 2] & LOWER_MASK)
      mt[i + 1] = mt[i + M + 1] ^ (y >>> 1) ^ mag01[y & 0x1]

      y = (mt[i + 2] & UPPER_MASK) | (mt[i + 3] & LOWER_MASK)
      mt[i + 2] = mt[i + M + 2] ^ (y >>> 1) ^ mag01[y & 0x1]

      y = (mt[i + 3] & UPPER_MASK) | (mt[i + 4] & LOWER_MASK)
      mt[i + 3] = mt[i + M + 3] ^ (y >>> 1) ^ mag01[y & 0x1]
    }

    for (; i < n; i++) {
      const y = (mt[i] & UPPER_MASK) | (mt[i + 1] & LOWER_MASK)
      mt[i] = mt[i + M] ^ (y >>> 1) ^ mag01[y & 0x1]
    }

    for (; i < N - 1; i++) {
      const y = (mt[i] & UPPER_MASK) | (mt[i + 1] & LOWER_MASK)
      mt[i] = mt[i + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1]
    }

    const y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK)
    mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1]

    this.mti = 0
  }

  public random(): number {
    if (this.mti >= MersenneTwister.N) {
      this.twist()
    }

    let y = this.mt[this.mti++]

    y ^= y >>> 11
    y ^= (y << 7) & 0x9D2C5680
    y ^= (y << 15) & 0xEFC60000
    y ^= y >>> 18

    return (y >>> 0) * 2.3283064365386963e-10
  }

  public randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min
  }

  public randomFloat(min: number, max: number): number {
    return this.random() * (max - min) + min
  }
}
