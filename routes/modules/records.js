const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

module.exports = router