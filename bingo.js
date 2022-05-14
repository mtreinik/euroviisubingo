function getTitle(count) {
  if (count === 0) {
    return ''
  }
  if (count === 1) {
    return translations["1-bingo-chart"]
  }
  return count + ' ' + translations["bingo-charts"]
}

function updateUi() {
  const bingoTableCount = document.getElementById("bingo").childElementCount
  document.getElementById("counter").innerText = getTitle(bingoTableCount)
  document.getElementById("print-and-clear").style.display =
    bingoTableCount > 0 ? 'inline' : 'none'
}

// removes returned item from items to prevent multiple instances in same card
function getRandomItem(items) {
  const index = Math.floor(Math.random() * items.length)
  if (items.length > 0) {
    const item = items[index]
    items = items.splice(index, 1)
    return item
  }
  return ''
}

function getBingoTable(items) {
  const div = document.createElement("div")
  div.className = 'bingo-table'
  const table = document.createElement("table")
  div.append(table)

  for (let y = 0; y < 5; y++) {
    const tr = document.createElement("tr")
    for (let x = 0; x < 5; x++) {
      const td = document.createElement("td")
      td.append(document.createTextNode(getRandomItem(items)))
      tr.append(td)
    }
    table.append(tr)
  }
  const about = document.createElement("div")
  about.append(document.createTextNode(translations["about-text"]))
  about.className = 'about'
  div.append(about)
  return div
}

function createBingo() {
  console.log('createBingo')
  const numberOfTables = document.getElementById("numberOfTables").value
  for (let i = 0; i < numberOfTables; i++) {
    const table = getBingoTable(items.slice())
    document.getElementById("bingo").appendChild(table)
  }
  updateUi()
}

function clearBingo() {
  document.getElementById("bingo").innerHTML = ''
  updateUi()
}

window.addEventListener('load', () => { document.getElementById("items").value = items.map(item => '"' + item + '"').join(",\n")})


