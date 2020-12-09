import fs from 'fs'
import path from 'path'

const puzzleInput = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .trim()
  .split('\n')

let inferredMap = puzzleInput.map((line) =>
  [...Array(100).keys()].map((x) => line).join('')
)

const collisionsInLine = (slope, direction = 1, grid) =>
  grid.reduce(
    ([count, x, y], row, rowIndex) => {
      const currentGridPos = row[rowIndex * slope[0]]
      const isTree = currentGridPos === '#'

      return rowIndex + 1 === y
        ? [count + +isTree, x + slope[0], y + slope[1]]
        : [count, x, y]
    },
    [0, 1, 1]
  )

console.log('Day 3: ', {
  collisions: collisionsInLine([3, 1], -1, inferredMap),
})
