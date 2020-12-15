import {
  maskValue,
  processAddress,
  splitAddresses,
  toBit,
  toDecimal,
  updateBit,
} from './index'

const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X'

test('to 36-bit', () => {
  expect(toBit(11)).toBe('000000000000000000000000000000001011')
  expect(toBit(101)).toBe('000000000000000000000000000001100101')
  expect(toBit(0)).toBe('000000000000000000000000000000000000')
})

test('to decimal', () => {
  expect(toDecimal('000000000000000000000000000000001011')).toBe(11)
  expect(toDecimal('000000000000000000000000000001100101')).toBe(101)
  expect(toDecimal('000000000000000000000000000000000000')).toBe(0)
})

test('update bit', () => {
  expect(updateBit(mask)('0', 1)).toBe('0')
  expect(updateBit(mask)('1', 2)).toBe('1')
  expect(updateBit(mask)('0', 35)).toBe('0')
  expect(updateBit(mask)('0', 34)).toBe('0')
})

test('mask value', () => {
  expect(maskValue(mask)('000000000000000000000000000000001011')).toBe(
    '000000000000000000000000000001001001'
  )
})

test('split by addresses', () => {
  const addresses = `mask = 100X01110X000110XX11X100X0111000XX01
    mem[14433] = 189475544
    mem[64841] = 3883
    mem[4069] = 144204
    mem[5170] = 5792
    mem[25427] = 1964230
    mask = 0110100100000000X00X000000010X0X1011
    mem[35438] = 52679760
    mem[34307] = 9317256
    mem[6470] = 209486
    mem[26430] = 534922265
    mask = 00X1X0X10000X11001100011X01X1X0X110X
    mem[41736] = 426776809
    mem[25126] = 35833440
    mem[11780] = 753`

  expect(splitAddresses(addresses)).toStrictEqual([
    `100X01110X000110XX11X100X0111000XX01
    mem[14433] = 189475544
    mem[64841] = 3883
    mem[4069] = 144204
    mem[5170] = 5792
    mem[25427] = 1964230`,
    `0110100100000000X00X000000010X0X1011
    mem[35438] = 52679760
    mem[34307] = 9317256
    mem[6470] = 209486
    mem[26430] = 534922265`,
    `00X1X0X10000X11001100011X01X1X0X110X
    mem[41736] = 426776809
    mem[25126] = 35833440
    mem[11780] = 753`,
  ])
})

test('split address', () => {
  const address = `00X1X0X10000X11001100011X01X1X0X110X
  mem[41736] = 426776809
  mem[25126] = 35833440
  mem[11780] = 753`

  expect(processAddress(address)).toStrictEqual([
    '00X1X0X10000X11001100011X01X1X0X110X',
    [41736, 426776809],
    [25126, 35833440],
    [11780, 753],
  ])
})
