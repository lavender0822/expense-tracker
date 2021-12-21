const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')

const SEED_USER = [{
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
},
{
  name: 'user',
  email: 'root2@example.com',
  password: '12345678'
}
]

const SEED_RECORD = [

  {
    name: '早餐',
    category_cn: '餐飲食品',
    date: '2021/04/23',
    amount: 100,
  },

  {
    name: '看電影',
    category_cn: '休閒娛樂',
    date: '2021/04/23',
    amount: 250,
  },

  {
    name: '午餐',
    category_cn: '餐飲食品',
    date: '2021/04/23',
    amount: 500,
  },

  {
    name: '捷運',
    category_cn: '交通出行',
    date: '2021/04/23',
    amount: 30,
  },

  {
    name: '買衣服',
    category_cn: '其他',
    date: '2021/04/23',
    amount: 1000,
  },

  {
    name: '晚餐',
    category_cn: '餐飲食品',
    date: '2021/04/23',
    amount: 800,
  },

]

db.once('open', () => {
  Promise.all(
    SEED_USER.map(users => {
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
          const records = SEED_RECORD.map(record => {
            return Category.findOne({ name_cn: record.category_cn })
              .then(category => {
                record.userId = userId
                record.category = category._id
              })
          })
          return Promise.all(records)
        })
        .then(() => Record.create(SEED_RECORD))
    })
  )
    .then(() => {
      console.log('SEED_USER & SEED_RECORD done!')
      process.exit()
    })
    .catch(err => console.log(err))
})