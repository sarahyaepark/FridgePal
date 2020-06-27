const router = require('express').Router()
// const graphqlHttp = require('express-graphql')
// const {buildSchema} = require('graphql')
module.exports = router

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

