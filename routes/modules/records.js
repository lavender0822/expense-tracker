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

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, date, category, amount } = req.body
    return Record.findById(id)
    .then(record => {
        record.name  = name
        record.date = date
        record.category = category
        record.amount = amount
        return record.save()
    } )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router