const express = require('express')
const postController = require('./posts/post.controller')
const userController = require('./users/user.controller')
const router = express.Router()

router
    // users
    .get('/users', userController.GET)
    .get('/users/:id', userController.GET_USER)
    .post('/users', userController.POST)
    .put('/users/:id', userController.PUT)
    .delete('/users/:id', userController.DELETE)
    
    // posts
    .get('/posts', postController.GET)
    .get('/posts/:id', postController.GET_POST)
    .post('/posts', postController.POST)
    .put('/posts/:id', postController.PUT)
    .delete('/posts/:id', postController.DELETE)

module.exports = router