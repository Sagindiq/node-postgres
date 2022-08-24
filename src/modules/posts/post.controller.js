const model = require('./post.model')
const moment = require('moment')

moment.locale('uz-latn')

module.exports = {
    GET: async(req, res) => {
        try {
            const posts = await model.allPosts()

            posts.map(el => {
                el ? el.created_at = moment(el.created_at).format('LLLL') : null
            })

            return res.json(posts)
            
        } catch (err) {
            console.log(err);
        }
    },

    GET_POST: async(req, res) => {
        try {
            const { id } = req.params

            const post = await model.aPost(id)
            post.created_at = moment(post.created_at).format('LLLL')

            return res.json(post)
            
        } catch (err) {
            console.log(err);
        }
    },

    POST: async(req, res) => {
        try {
            const { title, body, user_id } = req.body

            const post = await model.addPost(title, body, user_id)
            
            return res.status(201).json({
                message: "post has been created",
                data: post
            })
            
        } catch (err) {
            console.log(err);
        }
    },

    PUT: async(req, res) => {
        try {
            const { id } = req.params
            const { title, body, user_id } = req.body
            
            const post = await model.updatePost(title, body, user_id, id)
            post.created_at = moment(post.created_at).format('LLLL')

            return res.json({
                message: "post has been updated",
                data: post
            })
            
        } catch (err) {
            console.log(err);
        }
    },

    DELETE: async(req, res) => {
        try {
            const { id } = req.params

            const post = await model.removePost(id)
            post.created_at = moment(post.created_at).format('LLLL')
            
            return res.json({
                message: "post has been deleted",
                data: post
            })
            
        } catch (err) {
            console.log(err);
        }
    }
}