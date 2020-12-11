import fs from 'fs'
import path from 'path'

fs.readdirSync('2020').forEach((n) => {
  console.log(
    `Day ${('0' + n).slice(-2)}`,
    require(`./2020/${('0' + n).slice(-2)}/index`).default
  )
})
