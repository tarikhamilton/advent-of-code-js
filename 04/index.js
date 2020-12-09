import fs from 'fs'
import path from 'path'

const passports = fs
  .readFileSync(path.resolve(__dirname, 'input'), 'utf-8')
  .trim()
  .split('\n\n')
  .map((passport) =>
    passport
      .split(' ')
      .reduce((acc, field) => acc.concat(field.split('\n')), [])
  )
  .map((passport) =>
    passport.reduce((acc, p) => {
      const [field, value] = p.split(':')

      return { ...acc, [field]: value }
    }, {})
  )

const hasRequiredFields = (passport) => {
  const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']
  const missing = fields.filter(
    (field) => !Object.keys(passport).includes(field)
  )

  return !missing.length || (missing.length === 1 && missing[0] === 'cid')
}

const hasValidValues = (fields) => {
  const rules = {
    byr: (v) => +v >= 1920 && +v <= 2002,
    iyr: (v) => +v >= 2010 && +v <= 2020,
    eyr: (v) => +v >= 2020 && +v <= 2030,
    hgt: (v) => {
      const n = +v.slice(0, -2)

      switch (v.slice(-2)) {
        case 'cm':
          return n >= 150 && n <= 193
        case 'in':
          return n >= 59 && n <= 76
      }
    },
    hcl: (v) => v.match(/^#[a-f0-9]{6}$/),
    ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
    pid: (v) => v.match(/^\d{9}$/),
  }

  return (
    Object.keys(fields).filter(
      (field) => rules[field] && rules[field](fields[field])
    ).length === Object.keys(rules).length
  )
}

export default [
  passports.filter(hasRequiredFields).length,
  passports.filter(hasRequiredFields).filter(hasValidValues).length,
]
