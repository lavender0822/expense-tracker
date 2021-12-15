const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
    const userId = req.user._id
    Record.find({ userId })
    .lean()
    .sort({ date: 'asc'})
    .then(records => res.render('index', { records }))
    .catch(err => console.log(error))
})

module.exports = router