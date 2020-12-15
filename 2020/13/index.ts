import fs from 'fs'
import path from 'path'

const input = fs
  .readFileSync(path.resolve(__dirname, 'input'), 'utf-8')
  .trim()
  .split('\n')

export const isBusAtTimestamp = (busId: number, t: number) => !(t % busId)

export const minimumStopsByTime = (busId: number, t: number) =>
  +(t / busId).toFixed()

export const getBusTimes = (busId: number, t: number) =>
  [...Array(minimumStopsByTime(busId, t)).keys()].reduce<number[]>(
    (times, v) => times.concat(v * busId),
    []
  )

export const getEarliestStopForTime = (busId: number, t: number) =>
  Math.floor(t / busId) * busId + busId

export const busTravelTime = (busId: number, time: number, departure: number) =>
  (departure - time) * busId

//   export const busDepartureTime

export const busesOnly = (bus: string | number) => bus !== 'x'

const partOne = () => {
  const time = +input[0]

  const busIds = input[1].split(',').filter(busesOnly)

  const busTimes = busIds
    .map((id) => +id)
    .map((id) => [id, getEarliestStopForTime(id, time)])

  const timeOnly = busTimes.map((bt) => bt[1])

  const shortestTime: number = Math.min(...timeOnly)

  const indexOfGreatest = timeOnly.indexOf(shortestTime)

  const [busId, busDepartTime] = busTimes[indexOfGreatest]

  return busTravelTime(busId, time, busDepartTime)
}

const partTwo = () => null

export default [partOne(), partTwo()]
