import fs from 'fs'
import path from 'path'

const data = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf-8')
  .split('\n')
  .map((n) => +n)

function answer() {
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

console.log('Day 1:', answer())
