import { getInput } from '../helpers'

const input = getInput(__dirname)

export const toBit = (n) =>
  ('000000000000000000000000000000000000' + n.toString(2)).slice(-36)

// Guilty of borrowing this. I just don't know shit about bits. I don't get this code, tbh.
//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-2.php
export const toDecimal = (x: string) =>
  parseInt((x + '').replace(/[^01]/gi, ''), 2)

export const updateBit = (mask: string) => (x: '0' | '1', i: number) => {
  switch (mask[i]) {
    case 'X':
      return x
    case '0':
      return '0'
    case '1':
      return '1'
  }
}

export const maskValue = (mask: string) => (val: string) =>
  val.split('').map(updateBit(mask)).join('')

export const splitAddresses = (addresses) =>
  addresses
    .split(/mask = [.\s]*/gm)
    .filter(Boolean)
    .map((x) => x.trim())

export const processAddress = (address) =>
  address
    .split('\n')
    .map((line, i) =>
      i === 0
        ? line
        : line.split('=').map((x) => +x.trim().replace(/[a-z\[\]]/g, ''))
    )

const partOne = () =>
  splitAddresses(input)
    .map(processAddress)
    .reduce((products, address) => {
      const [mask, ...instructions] = address

      const getNewValue = maskValue(mask)
      const newValues = instructions.map((value) => {
        const [key, int] = value

        return [key, toDecimal(getNewValue(toBit(int)))]
      })

      const uniqueValues = newValues.reduce((acc, [key, int]) => {
        acc[key] = int
        return acc
      }, {})

      const product = Object.values(uniqueValues).reduce(
        (a: number, x: number) => (x > 0 ? x + a : a),
        0
      )

      return products.concat(product)
    }, [])
    .reduce((sum, x) => x + sum)

const partTwo = () => null

export default [partOne(), partTwo()]
