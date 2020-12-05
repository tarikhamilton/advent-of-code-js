import fs from 'fs'
import path from 'path'

const data = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf-8')
  .trim()
  .split('\n')
  .map((n) => +n)

const answer1 = () => {
  const possibleCombos = data.reduce((acc, n) => {
    if (acc[n] === undefined) acc[n] = 2020 - n

    return acc
  }, {})

  const match = Object.entries(possibleCombos).reduce(
    (match, [n1, n2]) => (data.includes(n2) ? [n1, n2] : match),
    null
  )

  return match.reduce((answer, n) => n * answer, 1)
}

const answer2 = () =>
  data.reduce(
    (acc, n) => {
      if (acc[n] === undefined) {
        acc[n] = {}

        data.forEach((x) => {
          if (acc[n][x] === undefined && n + x <= 2020 && ![n].includes(x)) {
            acc[n][x] = {}

            data.forEach(
              (y) =>
                n + x + y === 2020 &&
                acc['answers'].push([n, x, y].reduce((p, n) => p * n))
            )

            if (!Object.keys(acc[n][x]).length) delete acc[n][x]
          }
        })
      }

      if (!Object.keys(acc[n]).length) delete acc[n]

      return acc
    },
    { answers: [] }
  ).answers[0]

console.log('Day 1, Answer 1:', answer1())
console.log('Day 1, Answer 2:', answer2())
