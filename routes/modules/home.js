const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/filter', async (req, res) => {
  const userId = req.user._id
  const category = req.query.category
  const filteredCategory = (req.query.category === 'all') ? '' : await Category.findOne({ name: req.query.category }).lean()
  const filter = (filteredCategory === '') ? { userId } : { userId, category: filteredCategory._id }
  Record.find(filter)
    .populate('category')
    .lean()
    .then(records => res.render('index', { records, category }))
    .catch(error => console.error(error))
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .populate('category')
    .sort({ _id: 'desc' })
    .then(records => { res.render('index', { records }) })
    .catch(error => console.log(error))
})


module.exports = router