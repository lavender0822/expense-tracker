const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const userSeeder = require('./seeds.json').userSeeds
const recordSeeder = require('./seeds.json').recordSeeds

db.once('open', () => {
  Promise.all(
    userSeeder.map(users => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(users.password, salt))
        .then(hash => User.create({
          name: users.name,
          email: users.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const records = recordSeeder.map(record => {
            return Category.findOne({ name_cn: record.category })
              .then(category => {
                record.userId = userId
                record.category = category._id
              })
          })
          return Promise.all(records)
        })
        .then(() => Record.create(recordSeeder))
    })
  )
    .then(() => {
      console.log('userSeeder & recordSeeder done!')
      process.exit()
    })
    .catch(err => console.log(err))
})