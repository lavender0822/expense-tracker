const Category = require('../category')
const db = require('../../config/mongoose')
const SEED_CATEGORY = [
  {
    name: 'home',
    name_cn: '家居物業',
    categoryIcon: 'fas fa-house'
  },
  {
    name: 'transportation',
    name_cn: '交通出行',
    categoryIcon: 'fas fa-shuttle-van'
  },
  {
    name: 'entertainment',
    name_cn: '休閒娛樂',
    categoryIcon: 'fas fa-grin-beam'
  },
  {
    name: 'food',
    name_cn: '餐飲食品',
    categoryIcon: 'fas fa-utensils'
  },
  {
    name: 'else',
    name_cn: '其他',
    categoryIcon: 'fas fa-pen'
  },
]


db.once('open', () => {
  Category.create(SEED_CATEGORY)

    .then(() => {
      console.log('insert product done....!');
      return db.close();
    })
    .then(() => console.log('database connection closed'))
    .catch((error) => console.log(error));
});