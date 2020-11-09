import { AllHeroes, allHeroesIn08Nov2020 } from './heroes'

const possibleHeroes = (value: string) => {
  const possibleHero: AllHeroes[] = value
    ? allHeroesIn08Nov2020.reduce(
        (accumulator: AllHeroes[], currentValue: AllHeroes) => {
          if (accumulator.length > 14) {
            return accumulator
          }
          if (
            currentValue.name
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          ) {
            return [...accumulator, currentValue]
          }
          return accumulator
        },
        []
      )
    : []

  return possibleHero
}

export default possibleHeroes
