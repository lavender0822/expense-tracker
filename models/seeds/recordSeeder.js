const mongoose = require('mongoose')
const Record = require('../record')
const recordData = require('./record.json').results

mongoose.connect('mongodb://localhost/expense-tracker', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', err => console.log('mongodb connection error'))
db.once('open', () => {
    console.log('mongodb connection')
    recordData.forEach(record => Record.create(record))
    console.log('done')
})