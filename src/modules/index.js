const express = require('express')
const userController = require('./users/user.controller')
const router = express.Router()

router
    .get('/users', userController.GET)
    .get('/users/:id', userController.GET_USER)
    .post('/users', userController.POST)
    .put('/users/:id', userController.PUT)
    .delete('/users/:id', userController.DELETE)

module.exports = router