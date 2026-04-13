const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../database.json')

function readDB() {
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

function writeDB(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

module.exports = { readDB, writeDB }
