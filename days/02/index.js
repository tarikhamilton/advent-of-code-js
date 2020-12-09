import fs from 'fs'
import path from 'path'

const data = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf-8')
  .trim()
  .split('\n')
  .map((line) => line.split(' '))

const isValid = ([minmax, char, password]) => {
  const pattern = new RegExp(`${char.slice(0, 1)}`, 'g')
  const count = password.match(pattern) ? password.match(pattern).length : 0
  const [min, max] = minmax.split('-')

  return +max >= count && count >= +min
}

const isActuallyValid = ([minmax, char, password]) => {
  return (
    minmax.split('-').filter((pos) => password[+pos - 1] === char.slice(0, 1))
      .length === 1
  )
}

const count = (data, fn) => data.reduce((t, val) => +fn(val) + t, 0)

const validPasswords = count(data, isValid)
const actuallyValidPasswords = count(data, isActuallyValid)

export default [validPasswords, actuallyValidPasswords]
