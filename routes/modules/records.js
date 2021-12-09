const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/new',  (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    const {  name, date, category, amount } = req.body
    return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

module.exports = router