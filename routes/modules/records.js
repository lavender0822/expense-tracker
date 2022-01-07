const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((error) => console.error(error))
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Category.findOne({ name_cn: category })
    .then(category => {
      Record.create({
        name,
        date,
        category,
        amount,
        userId,
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categoryList = []
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.name_cn))
    })
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
})

router.put('/:id/', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Category.findOne({ name_cn: category })
    .then(category => {
      Record.findOne({ _id, userId })
        .then(record => {
          record.name = name
          record.date = date
          record.amount = amount
          record.category = category
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router