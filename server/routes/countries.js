const express = require('express');
const Country = require('../models/Country')

const router = express.Router();


// router.use((req, res, next) => {
//   console.log('DEBUG routes/countries');
//   next()
// })

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

//Delete country
router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Country.findByIdAndDelete(id)
    .then(countryDoc => {
      console.log("DEBUG countryDoc", countryDoc)
      res.json({
        //!!countryDoc coverts thurthy to ture / falsy to false
        success: !!countryDoc,
        countryDoc
      })
    })
    .catch(err => next(err))
});

module.exports = router;
