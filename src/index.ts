import MersenneTwister from './mersenne-twister'

export default (seed?: number) => new MersenneTwister(seed)
