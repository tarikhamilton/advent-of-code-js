import fs from 'fs'
import path from 'path'

export const getInput = (dirname: string) =>
  fs.readFileSync(path.resolve(dirname, 'input'), 'utf-8').trim()
