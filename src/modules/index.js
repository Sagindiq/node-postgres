const express = require('express')
const postController = require('./posts/post.controller')
const userController = require('./users/user.controller')
const router = express.Router()
const jwtVerify = require('../middlewares/jwt.verify')

router
    // users
    .get('/users', userController.GET)
    .get('/users/:id', userController.GET_USER)
    .post('/users', userController.POST)
    .put('/users/:id', userController.PUT)
    .delete('/users/:id', userController.DELETE)
    
    // posts
    .get('/posts', jwtVerify, postController.GET)
    .get('/posts/:id', jwtVerify, postController.GET_POST)
    .post('/posts', jwtVerify, postController.POST)
    .put('/posts/:id', jwtVerify, postController.PUT)
    .delete('/posts/:id', jwtVerify, postController.DELETE)

module.exports = router