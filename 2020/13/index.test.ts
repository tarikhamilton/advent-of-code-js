import {
  getBusTimes,
  getEarliestStopForTime,
  busTravelTime,
  isBusAtTimestamp,
  minimumStopsByTime,
} from './index'

test('bus departures', () => {
  expect(isBusAtTimestamp(59, 944)).toBe(true)
  expect(isBusAtTimestamp(13, 936)).toBe(true)
  expect(isBusAtTimestamp(31, 930)).toBe(true)
})

test('bus travel time', () => {
  expect(busTravelTime(59, 939, 944)).toBe(295)
})

test('minimum stops by time', () => {
  expect(minimumStopsByTime(59, 944)).toBe(16)
  expect(minimumStopsByTime(59, 969)).toBe(16)
})

test('minutes till bus', () => {
  expect(getBusTimes(59, 944)).toStrictEqual([
    0,
    59,
    118,
    177,
    236,
    295,
    354,
    413,
    472,
    531,
    590,
    649,
    708,
    767,
    826,
    885,
  ])
})

test('get me the earliest bus departure for time', () => {
  expect(getEarliestStopForTime(59, 939)).toBe(944)
})

test('indext of greatest int', () => {})
