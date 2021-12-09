const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
    Record.find()
    .lean()
    .sort({ date: 'asc'})
    .then(records => res.render('index', { records }))
    .catch(err => console.log(error))
})

module.exports = router