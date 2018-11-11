const router = require('express').Router()
const {Genre} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.findAll({
    })
    res.json(genres)
  } catch (err) {
    next(err)
  }
})
