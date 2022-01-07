if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const categorySeeder = require('./seeds.json').categorySeeds


db.once('open', () => {
  Category.create(categorySeeder)

    .then(() => {
      console.log('insert product done....!');
      return db.close();
    })
    .then(() => console.log('database connection closed'))
    .catch((error) => console.log(error));
});