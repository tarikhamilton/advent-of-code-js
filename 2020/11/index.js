import fs from 'fs'
import path from 'path'

const input = fs
  .readFileSync(path.resolve(__dirname, 'input'), 'utf-8')
  .trim()
  .split('\n')

const lookup = input.map((row) => row.split(''))

const getVal = (lookup, x, y) => lookup[y] && lookup[y][x]

const getAdjacentValues = (data, x, y) => {
  const relativeOffsets = {
    N: [0, -1],
    NE: [1, -1],
    E: [1, 0],
    SE: [1, 1],
    S: [0, 1],
    SW: [-1, 1],
    W: [-1, 0],
    NW: [-1, -1],
  }

  return Object.keys(relativeOffsets).map((direction) => {
    const [x2, y2] = relativeOffsets[direction]

    const value = getVal(data, x + x2, y + y2)

    return [direction, value, x, y]
  })
}

const analyzeAdjacent = (values) => ({
  occupiedQty: values.reduce(
    (t, [d, v]) => t + +(v !== undefined && v === '#'),
    0
  ),
  emptyQty: values.reduce(
    (t, [d, v]) => t + +(v !== undefined && v === 'L'),
    0
  ),
})

const print = (state) =>
  console.log(state.map((rows) => rows.map((row) => row.join(' '))))

const partOne = () => {
  let stableAt = null
  let occupiedAtStable = null

  const nextState = (lookup) =>
    lookup.reduce((newSeating, seatRow, y, newLookup) => {
      seatRow.forEach((seat, x) => {
        const { occupiedQty, emptyQty } = analyzeAdjacent(
          getAdjacentValues(newLookup, x, y)
        )

        if (!newSeating[y]) newSeating[y] = []

        if (seat === '.') newSeating[y][x] = '.'
        else if (seat === 'L' && occupiedQty === 0) newSeating[y][x] = '#'
        else if (seat === '#' && occupiedQty >= 4) newSeating[y][x] = 'L'
        else newSeating[y][x] = seat
      })

      return newSeating
    }, [])

  let state = lookup.map((a) => a.slice(0))
  let i = 0

  nextState(state)

  while (!stableAt) {
    let next = nextState(state.map((a) => a.slice(0)))

    if (state.flat().join('') === next.flat().join('')) {
      occupiedAtStable = state
        .map((rows) => rows.flat())
        .flat()
        .filter((v) => v === '#').length
      stableAt = i
      break
    } else {
      i++
    }

    state = next
  }

  return occupiedAtStable
}

const partTwo = () => {}

export default [partOne(), partTwo()]
