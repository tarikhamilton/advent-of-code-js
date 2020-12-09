import fs from 'fs'
import path from 'path'

const puzzleInput = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .trim()
  .split('\n')

const grid = puzzleInput.map((line) =>
  [...Array(100).keys()].map((x) => line).join('')
)

const collisionsInLine = (slope, grid) =>
  grid.reduce(
    ([count, x, y], row, rowIndex) => {
      const currentRow = rowIndex + 1
      const currentGridPos = row[x - 1]
      const isTree = currentGridPos === '#'

      return currentRow === y
        ? [count + +isTree, x + slope[0], y + slope[1]]
        : [count, x, y]
    },
    [0, 1, 1]
  )

export default [
  collisionsInLine([3, 1], grid)[0],
  [
    collisionsInLine([1, 1], grid),
    collisionsInLine([3, 1], grid),
    collisionsInLine([5, 1], grid),
    collisionsInLine([7, 1], grid),
    collisionsInLine([1, 2], grid),
  ]
    .map((x) => x[0])
    .reduce((p, n) => p * n),
]
