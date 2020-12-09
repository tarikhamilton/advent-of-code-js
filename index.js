;[...Array(4).keys()].forEach((n) => {
  console.log(`Day ${n + 1}`, require(`./days/0${n + 1}/index`).default)
})
